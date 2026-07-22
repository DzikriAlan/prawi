import * as React from "react"

import { cn } from "@/shared/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  children: React.ReactNode
}

const Modal = ({ open, onOpenChange, className, children }: ModalProps) => (
  <Dialog
    open={open}
    onOpenChange={onOpenChange}
  >
    <DialogContent
      className={cn(
        "flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0",
        className
      )}
    >
      {children}
    </DialogContent>
  </Dialog>
)

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogHeader
    className={cn("shrink-0 border-b px-6 py-4", className)}
    {...props}
  />
)
ModalHeader.displayName = "ModalHeader"

const ModalContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
    {...props}
  />
)
ModalContent.displayName = "ModalContent"

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogFooter
    className={cn("shrink-0 border-t px-6 py-4", className)}
    {...props}
  />
)
ModalFooter.displayName = "ModalFooter"

export {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  DialogTitle as ModalTitle,
  DialogDescription as ModalDescription,
}
