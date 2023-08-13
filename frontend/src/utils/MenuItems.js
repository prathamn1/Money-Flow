import { transactions, dashboard, expenses, trend } from "./Icons";
export const MenuItems = [
  {
    id: 1,
    title: "DASHBOARD",
    icon: dashboard,
    link: "/dashboard",
  },
  // {
  //     id: 2,
  //     title : 'VIEW TRANSACTIONS',
  //     icon : transactions,
  //     link : '/dashboard'
  // },
  {
    id: 3,
    title: "INCOMES",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "EXPENSES",
    icon: expenses,
    link: "/dashboard",
  },
];
