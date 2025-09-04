"use client"

import type React from "react"
import { useState, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, X, Loader2 } from "lucide-react"

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  helperText?: string
  errorMessage?: string
  invalid?: boolean
  variant?: "filled" | "outlined" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  clearable?: boolean
  passwordToggle?: boolean
  onClear?: () => void
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      errorMessage,
      invalid = false,
      disabled = false,
      variant = "outlined",
      size = "md",
      loading = false,
      clearable = false,
      passwordToggle = false,
      value,
      onClear,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const isPassword = type === "password" || passwordToggle
    const inputType = isPassword && showPassword ? "text" : type
    const hasError = invalid || !!errorMessage
    const hasValue = value !== undefined && value !== ""

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    }

    const variantClasses = {
      filled: "bg-muted border-transparent focus:border-primary",
      outlined: "bg-input border-border focus:border-primary",
      ghost: "bg-transparent border-transparent focus:border-primary focus:bg-input",
    }

    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            className={cn(
              "block font-medium text-foreground",
              labelSizeClasses[size],
              disabled && "text-muted-foreground",
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "flex w-full rounded-md border transition-colors duration-200",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size],
              variantClasses[variant],
              hasError && "border-destructive focus:border-destructive focus-visible:ring-destructive",
              isFocused && !hasError && "ring-2 ring-ring ring-offset-2",
              (clearable || passwordToggle || loading) && "pr-10",
              className,
            )}
            ref={ref}
            disabled={disabled || loading}
            value={value}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}

            {!loading && clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {!loading && !clearable && passwordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Helper text or error message */}
        {(helperText || errorMessage) && (
          <p
            id={hasError ? `${props.id}-error` : `${props.id}-helper`}
            className={cn("text-xs", hasError ? "text-destructive" : "text-muted-foreground")}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  },
)

InputField.displayName = "InputField"

export { InputField }
