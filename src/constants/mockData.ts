import type { Card, Transaction } from "../types";
import { COLORS } from "./colors";

export const MOCK_CARDS: Card[] = [
  {
    id: "lkmfkl-mlfkm-dlkfm",
    description: "Private Card",
    cardId: "**** **** **** 1234",
    backgroundColor: COLORS.PRIVATE_CARD,
  },
  {
    id: "elek-n3lk-4m3lk4",
    description: "Business Card",
    cardId: "**** **** **** 5678",
    backgroundColor: COLORS.BUSINESS_CARD,
  },
];
export const MOCK_TRANSACTIONS: Record<string, Omit<Transaction, "cardId">[]> = {
  "lkmfkl-mlfkm-dlkfm": [
    { id: "lkmlk-5kkm5-55gg", amount: 123.88, description: "Food" },
    { id: "43mm3-lkm4-55gg", amount: 33.48, description: "Snack" },
    { id: "eefe-5kkm5-ffeefe", amount: 288.38, description: "Tickets" },
    { id: "aabb-ccdd-eeff", amount: 45.0, description: "Groceries" },
    { id: "1122-3344-5566", amount: 78.9, description: "Utilities" },
    { id: "7788-99aa-bbcc", amount: 150.75, description: "Dining Out" },
    { id: "ddee-ff00-1122", amount: 200.0, description: "Electronics" },
    { id: "3344-5566-7788", amount: 89.99, description: "Books" },
    { id: "99aa-bbcc-ddee", amount: 45.67, description: "Clothing" },
    { id: "ff00-1122-3344", amount: 300.5, description: "Travel" },
  ],
  "elek-n3lk-4m3lk4": [
    { id: "lkmlk-5kkm5-55gg", amount: 21.88, description: "T-Shirt" },
    { id: "43mm3-lkm4-55gg", amount: 533.48, description: "Smart Phone" },
    { id: "eefe-5kkm5-ffeefe", amount: 2.58, description: "Chocolate Bar" },
    { id: "aabb-ccdd-eeff", amount: 1200.0, description: "Office Chair" },
    { id: "1122-3344-5566", amount: 75.25, description: "Software License" },
    { id: "7788-99aa-bbcc", amount: 340.6, description: "Team Lunch" },
    { id: "ddee-ff00-1122", amount: 499.99, description: "Monitor" },
    { id: "3344-5566-7788", amount: 89.0, description: "Bookshelf" },
    { id: "99aa-bbcc-ddee", amount: 150.45, description: "Headphones" },
    { id: "ff00-1122-3344", amount: 899.99, description: "Laptop" },
  ],
};
