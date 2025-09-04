"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react"

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  className?: string
  emptyMessage?: string
}

type SortOrder = "asc" | "desc" | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortOrder) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1
      return sortOrder === "asc" ? comparison : -comparison
    })
  }, [data, sortColumn, sortOrder])

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc")
      if (sortOrder === "desc") {
        setSortColumn(null)
      }
    } else {
      setSortColumn(columnKey)
      setSortOrder("asc")
    }
  }

  const handleRowSelect = (index: number) => {
    if (!selectable) return

    const newSelectedRows = new Set(selectedRows)
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index)
    } else {
      newSelectedRows.add(index)
    }

    setSelectedRows(newSelectedRows)

    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map((i) => sortedData[i])
      onRowSelect(selectedData)
    }
  }

  const handleSelectAll = () => {
    if (!selectable) return

    const allSelected = selectedRows.size === sortedData.length
    const newSelectedRows = allSelected ? new Set<number>() : new Set(sortedData.map((_, i) => i))

    setSelectedRows(newSelectedRows)

    if (onRowSelect) {
      const selectedData = allSelected ? [] : sortedData
      onRowSelect(selectedData)
    }
  }

  const isAllSelected = selectedRows.size === sortedData.length && sortedData.length > 0
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-md border">
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (sortedData.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-md border">
          <div className="flex items-center justify-center h-32">
            <span className="text-muted-foreground">{emptyMessage}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {selectable && (
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate
                      }}
                      onChange={handleSelectAll}
                      className="rounded border-border"
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                      column.sortable && "cursor-pointer hover:text-foreground transition-colors",
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={cn(
                              "h-3 w-3 -mb-1",
                              sortColumn === column.key && sortOrder === "asc"
                                ? "text-foreground"
                                : "text-muted-foreground/50",
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "h-3 w-3",
                              sortColumn === column.key && sortOrder === "desc"
                                ? "text-foreground"
                                : "text-muted-foreground/50",
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    selectedRows.has(index) && "bg-accent/10",
                    selectable && "cursor-pointer",
                  )}
                  onClick={() => selectable && handleRowSelect(index)}
                >
                  {selectable && (
                    <td className="px-4 py-3 align-middle">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={() => handleRowSelect(index)}
                        className="rounded border-border"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-middle">
                      {column.render
                        ? column.render(row[column.dataIndex], row, index)
                        : String(row[column.dataIndex] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
