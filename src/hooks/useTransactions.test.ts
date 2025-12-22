import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTransactions } from './useTransactions';
import { apiClient } from '../services/api/apiClient';
import type { Transaction } from '../types';

// Mock the API client
vi.mock('../services/api/apiClient');

describe('useTransactions Hook', () => {
  const mockTransactions: Transaction[] = [
    {
      id: 'tx-1',
      amount: 100.50,
      description: 'Grocery Store',
    },
    {
      id: 'tx-2',
      amount: 50.25,
      description: 'Coffee Shop',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty transactions when cardId is null', () => {
    const { result } = renderHook(() => useTransactions(null));

    expect(result.current.transactions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(apiClient.getTransactions).not.toHaveBeenCalled();
  });

  it('should fetch transactions when cardId is provided', async () => {
    (apiClient.getTransactions as any).mockResolvedValue(mockTransactions);

    const { result } = renderHook(() => useTransactions('card-1'));

    // Initial loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.transactions).toEqual([]);

    // Wait for data
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual(mockTransactions);
    expect(result.current.error).toBeNull();
    expect(apiClient.getTransactions).toHaveBeenCalledWith('card-1');
  });

  it('should refetch when cardId changes', async () => {
    (apiClient.getTransactions as any).mockResolvedValue(mockTransactions);

    const { result, rerender } = renderHook(
      ({ cardId }) => useTransactions(cardId),
      { initialProps: { cardId: 'card-1' } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(apiClient.getTransactions).toHaveBeenCalledWith('card-1');

    // Change cardId
    rerender({ cardId: 'card-2' });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(apiClient.getTransactions).toHaveBeenCalledWith('card-2');
    expect(apiClient.getTransactions).toHaveBeenCalledTimes(2);
  });

  it('should handle errors when fetching fails', async () => {
    const errorMessage = 'Failed to fetch transactions';
    (apiClient.getTransactions as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTransactions('card-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should reset transactions when cardId becomes null', async () => {
    (apiClient.getTransactions as any).mockResolvedValue(mockTransactions);

    const { result, rerender } = renderHook(
      ({ cardId }) => useTransactions(cardId),
      { initialProps: { cardId: 'card-1' as string | null } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual(mockTransactions);

    // Set cardId to null
    rerender({ cardId: null });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});