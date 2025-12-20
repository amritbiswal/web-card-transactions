import type { CSSProperties } from 'react';
import { COLORS } from '../../constants';

export const transactionListContainerStyles: CSSProperties = {
  minHeight: '200px',
};

export const emptyStateStyles: CSSProperties = {
  textAlign: 'center',
  padding: '40px',
  color: COLORS.TEXT_SECONDARY,
};

export const loadingStateStyles: CSSProperties = {
  textAlign: 'center',
  padding: '40px',
  color: COLORS.TEXT_SECONDARY,
};