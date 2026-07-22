import * as React from "react"
import { Loader2, PackageOpen } from "lucide-react"

import { cn } from "@/shared/lib/utils"

interface LoadDataResponse {
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  isNoVerified?: boolean
  errorTitle?: string
  errorSubtitle?: string
  emptyTitle?: string
  emptySubtitle?: string
  noVerifiedTitle?: string
  noVerifiedSubtitle?: string
}

interface LoadDataPlaceholder {
  title?: string
  subtitle?: string
}

interface LoadDataProps {
  readonly response?: LoadDataResponse
  readonly customLoader?: boolean
  readonly icon?: React.ReactNode
  readonly minHeight?: string
  readonly className?: string
  readonly children: React.ReactNode
}

function LoadData({
  response,
  customLoader = false,
  icon,
  minHeight = "30vh",
  className,
  children,
}: LoadDataProps) {
  // Function utilitas (hanya digunakan di dalam parent function ini)
  function getPlaceholder(): LoadDataPlaceholder | undefined {
    if (response?.isEmpty) {
      return { title: response.emptyTitle, subtitle: response.emptySubtitle }
    }

    if (response?.isError) {
      return { title: response.errorTitle, subtitle: response.errorSubtitle }
    }

    if (response?.isNoVerified) {
      return { title: response.noVerifiedTitle, subtitle: response.noVerifiedSubtitle }
    }

    return undefined
  }

  const isLoading = Boolean(response?.isLoading)
  const hasPlaceholderState =
    Boolean(response?.isEmpty) ||
    Boolean(response?.isError) ||
    Boolean(response?.isNoVerified)
  const placeholder = getPlaceholder()

  if (isLoading && !customLoader) {
    return (
      <div
        style={{ minHeight }}
        className={cn("flex items-center justify-center", className)}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isLoading && hasPlaceholderState) {
    return (
      <div
        style={{ minHeight }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 py-12 text-center",
          className
        )}
      >
        {icon ?? <PackageOpen className="h-10 w-10 text-muted-foreground" />}

        {placeholder?.title && (
          <p className="text-sm font-semibold">{placeholder.title}</p>
        )}

        {placeholder?.subtitle && (
          <p className="text-sm text-muted-foreground">{placeholder.subtitle}</p>
        )}
      </div>
    )
  }

  return <>{children}</>
}

export { LoadData }
