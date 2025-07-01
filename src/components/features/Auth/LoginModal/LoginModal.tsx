// src/components/Auth/LoginModal/LoginModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "@/stores/useAuthStore";
import { authService } from "@/services/auth.service";
import type { AuthUser } from "@/services/types/user.types";
import styles from "./LoginModal.module.scss";

// Validation schema
const loginSchema = yup.object({
  phone: yup
    .string()
    .required("Telefon nömrəsi tələb olunur")
    .matches(
      /^\+994[0-9]{9}$/,
      "Telefon nömrəsi +994xxxxxxxxx formatında olmalıdır"
    ),
});

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface LoginFormData {
  phone: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      // Call auth service
      const response = await authService.login({
        phone: data.phone,
        // In real implementation, this might be a verification code
        // For now, using phone as placeholder
        password: "temp_verification_code",
      });

      if (response.success) {
        // Update auth store
        login(response.data.user);

        // Success callback
        onSuccess?.();

        // Close modal
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error);
      // Here you would typically show an error message
      // You could use a toast notification or error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h2 id="login-modal-title" className={styles.modalTitle}>
              Daxil ol
            </h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Modalı bağla"
              disabled={isLoading}
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className={styles.modalBody}>
            <p className={styles.modalDescription}>
              Profildən elanlarınızı izləyin, yeniləyin və redaktə edin
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.loginForm}
            >
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Telefon nömrəsi
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  className={`${styles.formControl} ${
                    errors.phone ? styles.formControlError : ""
                  }`}
                  placeholder="+994501234567"
                  disabled={isLoading}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isLoading ? styles.submitButtonLoading : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Daxil olunur..." : "Daxil ol"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
