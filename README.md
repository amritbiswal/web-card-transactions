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

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AmountFilter/   # Transaction amount filter input
│   ├── Card/           # Individual card display
│   ├── CardList/       # Card list container
│   ├── Transaction/    # Individual transaction item
│   └── TransactionList/# Transaction list container
├── constants/          # App-wide constants (colors, mock data)
├── data/              # JSON data files (cards, transactions)
├── features/          # Feature modules
│   └── CardTransactions/ # Main card transactions feature
├── hooks/             # Custom React hooks
│   ├── useCards.ts    # Fetch and manage cards
│   └── useTransactions.ts # Fetch transactions by card
├── services/          # API and data services
│   └── api/          # API client with simulated delays
├── types/            # TypeScript type definitions
└── utils/            # Utility functions (formatters, parsers)
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
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

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

Run tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

## Code Quality

Run ESLint:
```bash
npm run lint
```

## Key Components

### Card Component
Located in [`src/components/Card/Card.tsx`](src/components/Card/Card.tsx)
- Displays card information with description and masked number
- Supports keyboard navigation (Enter/Space)
- Visual feedback for selected state

### Transaction Component
Located in [`src/components/Transaction/Transaction.tsx`](src/components/Transaction/Transaction.tsx)
- Shows transaction description and formatted amount
- Inherits background color from selected card

### AmountFilter Component
Located in [`src/components/AmountFilter/AmountFilter.tsx`](src/components/AmountFilter/AmountFilter.tsx)
- Input field for filtering transactions by minimum amount
- Real-time filtering with validation

## Custom Hooks

### [`useCards`](src/hooks/useCards.ts)
Fetches and manages the list of available cards with loading and error states.

### [`useTransactions`](src/hooks/useTransactions.ts)
Fetches transactions for a specific card ID with loading and error states.

### [`useCardTransactions`](src/features/CardTransactions/useCardTransactions.ts)
Main feature hook that combines card selection, transaction fetching, and filtering logic.

## Utilities

### Formatters ([`src/utils/formatters.ts`](src/utils/formatters.ts))
- **[`formatCurrency`](src/utils/formatters.ts)**: Formats numbers as currency (e.g., "123.88€")
- **[`formatCardNumber`](src/utils/formatters.ts)**: Formats card numbers with spaces
- **[`parseAmount`](src/utils/formatters.ts)**: Safely parses string to number

## API Service

The [`apiClient`](src/services/api/apiClient.ts) simulates API calls with a 500ms delay:
- `getCards()`: Returns all available cards
- `getTransactions(cardId)`: Returns transactions for a specific card

## Data Structure

### Card Type ([`src/types/card.types.ts`](src/types/card.types.ts))
```typescript
interface Card {
  id: string;
  cardId: string;
  backgroundColor: string;
  description: string;
}
```

### Transaction Type ([`src/types/transaction.types.ts`](src/types/transaction.types.ts))
```typescript
interface Transaction {
  id: string;
  description: string;
  amount: number;
}
```

## Styling

- CSS-in-JS approach using inline styles with TypeScript types
- Centralized color constants in [`src/constants/colors.ts`](src/constants/colors.ts)
- Responsive design with `clamp()` for fluid typography
- Custom scrollbar styling in [`src/components/TransactionList/TransactionList.css`](src/components/TransactionList/TransactionList.css)

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