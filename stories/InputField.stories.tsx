import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { InputField } from "../components/input-field"

const meta = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible input component with validation states, variants, sizes, and optional features like password toggle and clear button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
      description: "Visual style variant of the input",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "tel", "url", "search"],
      description: "HTML input type",
    },
    invalid: {
      control: "boolean",
      description: "Whether the input is in an invalid state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    loading: {
      control: "boolean",
      description: "Whether the input is in a loading state",
    },
    clearable: {
      control: "boolean",
      description: "Whether to show a clear button",
    },
    passwordToggle: {
      control: "boolean",
      description: "Whether to show password visibility toggle (only for password type)",
    },
  },
  args: {
    onChange: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Default Input",
    placeholder: "Enter text...",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Outlined (Default)" placeholder="Outlined variant" variant="outlined" />
      <InputField label="Filled" placeholder="Filled variant" variant="filled" />
      <InputField label="Ghost" placeholder="Ghost variant" variant="ghost" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Small" placeholder="Small input" size="sm" />
      <InputField label="Medium" placeholder="Medium input" size="md" />
      <InputField label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Normal State" placeholder="Normal input" helperText="This is helper text" />
      <InputField label="Error State" placeholder="Invalid input" invalid errorMessage="This field is required" />
      <InputField label="Disabled State" placeholder="Disabled input" disabled value="Cannot edit this" />
      <InputField label="Loading State" placeholder="Loading..." loading disabled />
    </div>
  ),
}

export const WithFeatures: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Clearable Input" placeholder="Type something..." clearable defaultValue="Clear me!" />
      <InputField label="Password Input" type="password" placeholder="Enter password" passwordToggle />
      <InputField
        label="Email Input"
        type="email"
        placeholder="user@example.com"
        helperText="We'll never share your email"
      />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="First Name" placeholder="John" required />
      <InputField label="Last Name" placeholder="Doe" required />
      <InputField
        label="Email"
        type="email"
        placeholder="john@example.com"
        required
        helperText="We'll send confirmation to this email"
      />
      <InputField label="Phone" type="tel" placeholder="+1 (555) 123-4567" clearable />
      <InputField label="Password" type="password" placeholder="Create a strong password" passwordToggle required />
    </div>
  ),
}
