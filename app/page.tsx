"use client";

import { useState } from "react";
import { InputField } from "@/components/input-field";
import { DataTable, type Column } from "@/components/data-table";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
    joinDate: "2024-01-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-02-28",
  },
];

export default function ComponentDemo() {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailTouched, setEmailTouched] = useState(false); // 👈 new state
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const columns: Column<User>[] = [
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
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
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
  ];

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleTableLoadingDemo = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 2000);
  };

  // Email validation regex
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-center space-y-4 flex-1">
            <h1 className="text-4xl font-bold text-balance">
              React Component Library
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Professional InputField and DataTable components with TypeScript
              support
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* InputField Examples */}
        <Card>
          <CardHeader>
            <CardTitle>InputField Component</CardTitle>
            <CardDescription>
              Flexible input component with validation states, variants, and
              accessibility features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Input */}
              <div className="space-y-4">
                <h3 className="font-semibold">Basic Variants</h3>
                <InputField
                  label="Outlined (Default)"
                  placeholder="Enter text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  clearable
                  onClear={() => setInputValue("")}
                />
                <InputField
                  label="Filled Variant"
                  placeholder="Enter text..."
                  variant="filled"
                />
                <InputField
                  label="Ghost Variant"
                  placeholder="Enter text..."
                  variant="ghost"
                />
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h3 className="font-semibold">Sizes</h3>
                <InputField label="Small" placeholder="Small input" size="sm" />
                <InputField
                  label="Medium (Default)"
                  placeholder="Medium input"
                  size="md"
                />
                <InputField label="Large" placeholder="Large input" size="lg" />
              </div>

              {/* States */}
              <div className="space-y-4">
                <h3 className="font-semibold">States</h3>
                <InputField
                  label="With Helper Text"
                  placeholder="Enter your name"
                  helperText="This field is required"
                />
                <InputField
                  label="Disabled"
                  placeholder="Disabled input"
                  disabled
                  value="Cannot edit this"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
              {/* Special Features */}
              <div className="space-y-4">
                <h3 className="font-semibold">Special Features</h3>
                <InputField
                  label="Password with Toggle"
                  type="password"
                  placeholder="Enter password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  passwordToggle
                />
                <InputField
                  label="Loading State"
                  placeholder="Processing..."
                  loading={loading}
                  disabled={loading}
                />
                <Button onClick={handleLoadingDemo} variant="outline" size="sm">
                  Demo Loading State
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Form Example</h3>
                <InputField label="First Name" placeholder="John" size="md" />
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  helperText="We'll never share your email"
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  clearable
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DataTable Examples */}
        <Card>
          <CardHeader>
            <CardTitle>DataTable Component</CardTitle>
            <CardDescription>
              Feature-rich data table with sorting, selection, and loading
              states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Button
                onClick={handleTableLoadingDemo}
                variant="outline"
                size="sm"
              >
                Demo Loading State
              </Button>
              {selectedUsers.length > 0 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  {selectedUsers.length} user(s) selected
                </div>
              )}
            </div>

            <DataTable
              data={sampleData}
              columns={columns}
              loading={tableLoading}
              selectable
              onRowSelect={setSelectedUsers}
              emptyMessage="No users found"
            />

            {selectedUsers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
