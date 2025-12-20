# Card Transactions App

A React + TypeScript application for managing and viewing credit card transactions with filtering capabilities.

## Features

- 📇 **Card Selection**: View and switch between multiple cards (Private & Business)
- 💰 **Transaction Display**: Browse all transactions for the selected card
- 🔍 **Amount Filtering**: Filter transactions by minimum amount
- 🎨 **Color-Coded UI**: Visual distinction between card types with custom backgrounds
- ♿ **Accessibility**: Full keyboard navigation and ARIA labels
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **React Router DOM 7.11** - Routing (ready for expansion)
- **Vitest** - Unit testing framework
- **ESLint** - Code linting with TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/amritbiswal/web-card-transactions.git
cd web-card-transactions
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Architecture](#project-architecture)
- [Detailed File Guide](#detailed-file-guide)
- [How It Works](#how-it-works)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This application allows users to:
1. **Select a card** from their available cards (Private or Business)
2. **View transactions** associated with that card
3. **Filter transactions** by minimum amount in real-time

### Live Demo Flow
```
User opens app → Sees list of cards → Clicks a card → Views its transactions → (Optional) Filters by amount
```

---

## ✨ Features

### 🎴 Card Management
- **Multiple Cards**: Display all available cards with distinct colors
- **Visual Selection**: Active card highlighted with border
- **Keyboard Accessible**: Navigate cards using Tab and select with Enter/Space

### 💰 Transaction Viewing
- **Real-time Loading**: Fetches transactions when card is selected
- **Clean Display**: Shows description and formatted amount for each transaction
- **Color Coordination**: Transactions inherit the selected card's background color

### 🔍 Smart Filtering
- **Amount Filter**: Input minimum amount to filter transactions
- **Instant Results**: Updates transaction list as you type
- **Validation**: Only accepts valid numbers

### ♿ Accessibility
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard support
- **Semantic HTML**: Proper heading hierarchy

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Fluid Typography**: Text scales smoothly
- **Touch Friendly**: Large clickable areas

---

## 🏗️ Project Architecture

### Folder Structure Explained

```
src/
├── components/           # Reusable UI building blocks
│   ├── AmountFilter/    # Input for filtering by minimum amount
│   ├── Card/            # Single card display component
│   ├── CardList/        # Container that displays all cards
│   ├── Transaction/     # Single transaction display component
│   └── TransactionList/ # Container that displays all transactions
│
├── constants/           # App-wide constant values
│   ├── colors.ts       # Color palette definitions
│   └── mockData.ts     # Sample data for development
│
├── data/               # JSON data files (simulating database)
│   ├── cards.json      # All available cards
│   └── transactions.json # All transactions mapped to cards
│
├── features/           # Feature modules (larger functionality)
│   └── CardTransactions/ # Main feature combining cards + transactions
│       ├── CardTransactions.tsx  # UI component
│       └── useCardTransactions.ts # Business logic hook
│
├── hooks/              # Custom React hooks for data fetching
│   ├── useCards.ts     # Fetches all cards
│   └── useTransactions.ts # Fetches transactions for a card
│
├── services/           # External integrations
│   └── api/
│       └── apiClient.ts # Simulated API with delay (like real API)
│
├── types/              # TypeScript type definitions
│   ├── card.types.ts   # Card interface
│   └── transaction.types.ts # Transaction interface
│
├── utils/              # Helper functions
│   └── formatters.ts   # Format currency, card numbers, etc.
│
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Design Patterns Used

1. **Component Composition**: Small, reusable components
2. **Custom Hooks**: Separate business logic from UI
3. **Service Layer**: API calls abstracted in `apiClient`
4. **Type Safety**: Full TypeScript coverage
5. **Single Responsibility**: Each file has one clear purpose

---

## 📚 Detailed File Guide

### Entry Points

#### `main.tsx` - Application Bootstrap
- Renders the root React component
- Mounts app to DOM element with id "root"
- Entry point for the entire application

#### `App.tsx` - Root Component
- Renders the main CardTransactions feature
- Provides app-wide layout
- Future: Could add routing, global state, etc.

---

### Core Feature

#### `features/CardTransactions/CardTransactions.tsx`
**Purpose**: Main UI component that combines all pieces

**What it does**:
1. Uses `useCardTransactions` hook for data and logic
2. Renders CardList (shows all cards)
3. Renders AmountFilter (input for filtering)
4. Renders TransactionList (shows filtered transactions)

**When to modify**: Add new UI elements or change layout

#### `features/CardTransactions/useCardTransactions.ts`
**Purpose**: Business logic for the entire feature

**What it does**:
1. Fetches all cards using `useCards`
2. Manages selected card state
3. Fetches transactions for selected card
4. Manages filter amount state
5. Filters transactions based on amount

**When to modify**: Add new filtering logic or data management

---

### Components (UI Building Blocks)

#### `components/Card/Card.tsx`
**Purpose**: Display a single card with click/keyboard interaction

**Props**:
- `card`: Card data (id, description, color, number)
- `isSelected`: Boolean to show if this card is active
- `onClick`: Function to call when card is clicked

**When to modify**: Change card appearance or add hover effects

#### `components/CardList/CardList.tsx`
**Purpose**: Display all cards in a scrollable list

**Props**:
- `cards`: Array of all cards
- `selectedCardId`: ID of currently selected card
- `onCardSelect`: Function to call when a card is clicked

**When to modify**: Change card list layout or add animations

#### `components/Transaction/Transaction.tsx`
**Purpose**: Display a single transaction

**Props**:
- `transaction`: Transaction data (description, amount)
- `backgroundColor`: Color inherited from card

**When to modify**: Change transaction appearance or add icons

#### `components/TransactionList/TransactionList.tsx`
**Purpose**: Display all transactions in a scrollable list

**Props**:
- `transactions`: Array of transactions to show
- `backgroundColor`: Color inherited from selected card
- `isLoading`: Show loading state
- `error`: Show error message

**When to modify**: Change transaction list layout or add sorting

#### `components/AmountFilter/AmountFilter.tsx`
**Purpose**: Input field for filtering by minimum amount

**Props**:
- `value`: Current filter value
- `onChange`: Function to call when value changes

**When to modify**: Add validation or change input styling

---

### Data Fetching Hooks

#### `hooks/useCards.ts`
**Purpose**: Fetch all available cards

**Returns**:
- `cards`: Array of Card objects
- `isLoading`: Boolean (true while fetching)
- `error`: Error message if fetch fails

**How it works**: Calls `apiClient.getCards()` on component mount

#### `hooks/useTransactions.ts`
**Purpose**: Fetch transactions for a specific card

**Parameters**:
- `cardId`: ID of the card to fetch transactions for

**Returns**:
- `transactions`: Array of Transaction objects
- `isLoading`: Boolean (true while fetching)
- `error`: Error message if fetch fails

**How it works**: Calls `apiClient.getTransactions(cardId)` when cardId changes

---

### Services

#### `services/api/apiClient.ts`
**Purpose**: Simulate API calls with delays (like real backend)

**Functions**:
- `getCards()`: Returns all cards after 500ms delay
- `getTransactions(cardId)`: Returns transactions for card after 500ms delay

**When to modify**: Replace with real API calls to backend

---

### Types

#### `types/card.types.ts`
**Purpose**: Define the Card data structure

```typescript
Card {
  id: string          // Unique identifier
  cardId: string      // Card number (e.g., "1234567812345678")
  backgroundColor: string // Hex color (e.g., "#3DD598")
  description: string // Card name (e.g., "My Private card")
}
```

#### `types/transaction.types.ts`
**Purpose**: Define the Transaction data structure

```typescript
Transaction {
  id: string          // Unique identifier
  description: string // What was purchased (e.g., "Amazon purchase")
  amount: number      // Amount in euros (e.g., 123.88)
}
```

---

### Utilities

#### `utils/formatters.ts`
**Purpose**: Format data for display

**Functions**:
- `formatCurrency(123.88)` → `"123.88€"` (adds € symbol)
- `formatCardNumber("1234567812345678")` → `"1234 5678 1234 5678"` (adds spaces)
- `parseAmount("123.88")` → `123.88` (safely converts string to number)

---

### Data Files

#### `data/cards.json`
**Purpose**: Mock data for cards (simulates database)

**Structure**:
```json
{
  "cards": [
    {
      "id": "1",
      "cardId": "1234567812345678",
      "backgroundColor": "#3DD598",
      "description": "My Private card"
    }
  ]
}
```

#### `data/transactions.json`
**Purpose**: Mock data for transactions (simulates database)

**Structure**:
```json
{
  "transactions": [
    {
      "cardId": "1",
      "transactions": [
        {
          "id": "1",
          "description": "Amazon purchase",
          "amount": 123.88
        }
      ]
    }
  ]
}
```

---

### Constants

#### `constants/colors.ts`
**Purpose**: Define color palette for the app

**When to modify**: Add new colors or change theme

#### `constants/mockData.ts`
**Purpose**: Provide sample data for testing

**When to modify**: Add more test cases

---

## 🔄 How It Works

### Application Flow

```
1. App starts (main.tsx)
   ↓
2. CardTransactions component mounts
   ↓
3. useCardTransactions hook runs:
   - Calls useCards → Fetches all cards
   - Sets first card as selected
   - Calls useTransactions(selectedCardId) → Fetches transactions
   ↓
4. UI renders:
   - CardList shows all cards
   - First card is highlighted
   - TransactionList shows transactions for first card
   ↓
5. User clicks different card:
   - handleCardSelect updates selectedCardId
   - useTransactions automatically fetches new transactions
   - UI updates with new transactions
   ↓
6. User enters filter amount:
   - handleFilterChange updates filterAmount
   - filteredTransactions is recalculated
   - TransactionList shows only transactions >= filterAmount
```

### Data Flow Diagram

```
apiClient (service)
    ↓
useCards (hook) ──→ cards data
    ↓
useCardTransactions (feature hook) ──→ business logic
    ↓                                    ↓
CardTransactions (component) ──→ UI rendering
    ↓
CardList, TransactionList, AmountFilter (components)
```

---

### Adding a New Feature

**Example: Add transaction date**

1. **Update Type**
```typescript
// filepath: src/types/transaction.types.ts
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; // Add this
}
```

2. **Update Mock Data**
```json
// filepath: src/data/transactions.json
{
  "id": "1",
  "description": "Amazon purchase",
  "amount": 123.88,
  "date": "2025-12-20" // Add this
}
```

3. **Update Component**
```typescript
// filepath: src/components/Transaction/Transaction.tsx
// Display the date in the UI
<span>{transaction.date}</span>
```

### Adding a New Component

1. Create folder: `src/components/MyComponent/`
2. Create files:
   - `MyComponent.tsx` (component)
   - `MyComponent.test.tsx` (tests)
   - `MyComponent.css` (if needed)
3. Export from component file
4. Import where needed

---
## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test Card.test.tsx

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

Example test structure:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 📝 Common Tasks

### Change Card Colors

Edit `src/data/cards.json`:
```json
{
  "backgroundColor": "#FF5733" // Change this hex color
}
```

### Add More Cards

Add to `src/data/cards.json`:
```json
{
  "cards": [
    // ...existing cards
    {
      "id": "3",
      "cardId": "9999888877776666",
      "backgroundColor": "#FF5733",
      "description": "My Travel card"
    }
  ]
}
```

### Add More Transactions

Add to `src/data/transactions.json`:
```json
{
  "transactions": [
    {
      "cardId": "1", // Must match existing card id
      "transactions": [
        {
          "id": "10",
          "description": "New purchase",
          "amount": 50.00
        }
      ]
    }
  ]
}
```

### Change API Delay

Edit `src/services/api/apiClient.ts`:
```typescript
const delay = (ms: number = 500) => // Change 500 to desired ms
```

### Connect to Real Backend

Replace `src/services/api/apiClient.ts`:
```typescript
export const apiClient = {
  async getCards(): Promise<Card[]> {
    const response = await fetch('https://your-api.com/cards');
    return response.json();
  },
  async getTransactions(cardId: string): Promise<Transaction[]> {
    const response = await fetch(`https://your-api.com/transactions/${cardId}`);
    return response.json();
  }
};
```

---

## 🐛 Troubleshooting

### Issue: Port 5173 already in use

**Solution**: Kill the process or use different port
```bash
# Find process using port
netstat -ano | findstr :5173

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Issue: Module not found errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Types not recognized

**Solution**: Restart TypeScript server in VS Code
- Press `Ctrl + Shift + P`
- Type "TypeScript: Restart TS Server"
- Press Enter

### Issue: Tests failing

**Solution**: Clear cache and run again
```bash
npm run test -- --clearCache
npm test
```

### Issue: Build fails

**Solution**: Check for TypeScript errors
```bash
npx tsc --noEmit
```

---

## 🎓 Learning Resources

### React Concepts Used
- **Hooks**: useState, useEffect
- **Props**: Passing data between components
- **Conditional Rendering**: Show/hide based on state
- **Lists**: Rendering arrays with .map()

### TypeScript Concepts Used
- **Interfaces**: Define object shapes
- **Type Annotations**: Specify variable types
- **Generics**: Reusable type-safe code

### Vite Features Used
- **Hot Module Replacement**: Updates without full reload
- **Fast Builds**: Optimized bundling
- **Environment Variables**: Config management

---

## 📦 Dependencies Explained

### Production Dependencies
- **react**: UI library
- **react-dom**: React renderer for web
- **react-router-dom**: Routing (currently unused, ready for expansion)

### Development Dependencies
- **@vitejs/plugin-react-swc**: Fast React refresh with SWC compiler
- **typescript**: Type checking
- **vite**: Build tool and dev server
- **vitest**: Testing framework
- **eslint**: Code quality checker

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy to Netlify
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

---

## 🤝 Contributing

This is a learning project. To suggest improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---
## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2022 support required

## Future Enhancements

- Real API integration
- Transaction creation/editing
- Date range filtering
- Export transactions to CSV
- Dark mode support
- Transaction categories

## License

Assignment project - not open source.

## Author

Amrit