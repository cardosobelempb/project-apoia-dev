"use client";

import {
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  LucideIcon,
} from "lucide-react";
import React from "react";
import {
  ToastContainer,
  toast,
  ToastOptions as ReactToastOptions,
} from "react-toastify";
// import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

// Tipos
type ToastOptions = ReactToastOptions;
type ToastType = "success" | "error" | "info" | "warning";

interface ShowToastProps {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  icon?: LucideIcon;
  options?: ToastOptions;
  i18n?: boolean; // se as strings forem chaves de tradução
}

// Cores e ícones
const contextClass: Record<ToastType | "default", string> = {
  success: "oklch(87.1% 0.15 154.449)",
  error: "oklch(80.8% 0.114 19.571)",
  warning: "oklch(90.5% 0.182 98.111)",
  info: "oklch(80.9% 0.105 251.813)",
  default: "oklch(80.9% 0.105 251.813)",
};

const textColors: Record<ToastType, string> = {
  success: "oklch(72.3% 0.219 149.579)",
  error: "oklch(63.7% 0.237 25.331)",
  warning: "oklch(79.5% 0.184 86.047)",
  info: "oklch(62.3% 0.214 259.815)",
};

// Componente de conteúdo com suporte a i18n
const ToastContent = ({
  title,
  description,
  i18n = false,
}: {
  title?: string;
  description?: string;
  i18n?: boolean;
}) => {
  // const { t } = useTranslation();

  return (
    <div>
      {/* {title && <strong>{i18n ? t(title) : title}</strong>} */}
      {title && <strong>{title}</strong>}
      {/* {description && <div>{i18n ? t(description) : description}</div>} */}
      {description && <div>{description}</div>}
    </div>
  );
};

// Função reutilizável
export const showToast = ({
  title,
  description,
  type = "info",
  duration = 4000,
  icon,
  options = {},
  i18n = false,
}: ShowToastProps) => {
  const defaultIcons: Record<ToastType, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const IconComponent = icon ?? defaultIcons[type];

  toast(<ToastContent title={title} description={description} i18n={i18n} />, {
    icon: <IconComponent className="text-white" />,
    autoClose: duration,
    style: {
      background: contextClass[type],
      color: textColors[type],
      border: "none",
    },
    ...options,
  });
};

// Toast root
const ToastRoot = () => {
  return (
    <ToastContainer
      position="top-right"
      theme="light"
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
    />
  );
};

export default ToastRoot;
