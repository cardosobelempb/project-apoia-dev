// components/CustomToast.tsx
"use client";

import { toast, Toaster } from "sonner";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  LucideIcon,
} from "lucide-react";
import React from "react";

// Tipagem das opções do toast do Sonner
type ToastOptions = Parameters<typeof toast>[1];

// Tipos suportados
type ToastType = "success" | "error" | "info" | "warning";

// Props da função showToast
interface ShowToastProps {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  icon?: React.ReactNode;
  options?: ToastOptions;
}

// Função reutilizável
export const showToast = ({
  title,
  description,
  type = "info",
  duration = 4000,
  icon,
  options = {},
}: ShowToastProps) => {
  const defaultIcons: Record<ToastType, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const backgroundColors: Record<ToastType, string> = {
    success: "oklch(87.1% 0.15 154.449)", // green-600
    error: "oklch(80.8% 0.114 19.571)", // red-600
    warning: "oklch(90.5% 0.182 98.111)", // yellow-400
    info: "oklch(80.9% 0.105 251.813)", // blue-600
  };

  const textColors: Record<ToastType, string> = {
    success: "oklch(72.3% 0.219 149.579)", // green-600
    error: "oklch(63.7% 0.237 25.331)", // red-600
    warning: "oklch(79.5% 0.184 86.047)", // yellow-400
    info: "#oklch(62.3% 0.214 259.815)", // blue-600
  };

  const Icon =
    icon ??
    React.createElement(defaultIcons[type], { className: "text-white" });

  toast(title, {
    description,
    icon: Icon,
    duration,
    style: {
      background: backgroundColors[type],
      color: textColors[type],
      border: "none",
    },
    ...options,
  });
};

// Componente global do toast
const ToastRoot = () => {
  return (
    <Toaster
      position="top-right"
      theme="light"
      toastOptions={{
        className: "rounded-md shadow-md",
        descriptionClassName: "text-white",
      }}
    />
  );
};

export default ToastRoot;
