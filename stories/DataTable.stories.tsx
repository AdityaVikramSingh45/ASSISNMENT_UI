import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { DataTable, type Column } from "../components/data-table"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  joinDate: string
}

const sampleUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", joinDate: "2024-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "inactive", joinDate: "2024-01-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "active", joinDate: "2024-03-05" },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-02-28",
  },
]

const userColumns: Column<User>[] = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    sortable: true,
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    sortable: true,
    render: (value) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "Admin"
            ? "bg-primary/10 text-primary"
            : value === "Editor"
              ? "bg-accent/10 text-accent"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    sortable: true,
    render: (value) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "joinDate",
    title: "Join Date",
    dataIndex: "joinDate",
    sortable: true,
  },
]

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A feature-rich data table component with sorting, selection, loading states, and custom cell rendering.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Whether the table is in a loading state",
    },
    selectable: {
      control: "boolean",
      description: "Whether rows can be selected",
    },
    emptyMessage: {
      control: "text",
      description: "Message to show when no data is available",
    },
  },
  args: {
    onRowSelect: fn(),
  },
} satisfies Meta<typeof DataTable<User>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
}

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
}

export const Loading: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: "No users found. Try adjusting your search criteria.",
  },
}

export const SimpleColumns: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: "name", title: "Name", dataIndex: "name", sortable: true },
      { key: "email", title: "Email", dataIndex: "email", sortable: true },
      { key: "role", title: "Role", dataIndex: "role" },
    ],
  },
}

interface Product {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}

const productData: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1299.99, category: "Electronics", inStock: true },
  { id: 2, name: "Wireless Mouse", price: 29.99, category: "Accessories", inStock: false },
  { id: 3, name: "Mechanical Keyboard", price: 149.99, category: "Accessories", inStock: true },
  { id: 4, name: "Monitor 4K", price: 399.99, category: "Electronics", inStock: true },
]

const productColumns: Column<Product>[] = [
  {
    key: "name",
    title: "Product Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "price",
    title: "Price",
    dataIndex: "price",
    sortable: true,
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    key: "category",
    title: "Category",
    dataIndex: "category",
    sortable: true,
  },
  {
    key: "inStock",
    title: "Stock Status",
    dataIndex: "inStock",
    render: (value) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value
            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        }`}
      >
        {value ? "In Stock" : "Out of Stock"}
      </span>
    ),
  },
]

export const ProductTable: Story = {
  args: {
    data: productData,
    columns: productColumns,
    selectable: true,
  },
}
