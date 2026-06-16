"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        <div className="space-y-2 text-sm">{children}</div>

        {footer && (
          <div className="mt-6 flex justify-end gap-2">{footer}</div>
        )}
      </div>
    </div>
  );
}
