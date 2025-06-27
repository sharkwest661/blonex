"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X, CheckCircle } from "lucide-react";
import styles from "./ComplaintModal.module.scss";

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ComplaintFormData {
  reason: string;
  description: string;
}

const schema = yup.object({
  reason: yup.string().required("Şikayətin səbəbini seçin"),
  description: yup
    .string()
    .required("Açıqlama tələb olunur")
    .min(10, "Açıqlama ən azı 10 hərf olmalıdır")
    .max(3000, "Açıqlama maksimum 3000 hərf ola bilər"),
});

const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ComplaintFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "",
      description:
        "Çox babat telefondu. arada bir dinamiki xarab olur dişimlə sıxıram telefonu düzəlir. Suya düşəndə düyünün içində quruduram 2 dəfə elə düzəltmişəm. Daş döyən telefondu.",
    },
  });

  const description = watch("description");

  const complaintReasons = [
    { value: "fake", label: "Saxta məhsul" },
    { value: "misleading", label: "Yanıltıcı məlumat" },
    { value: "inappropriate", label: "Uyğunsuz məzmun" },
    { value: "spam", label: "Spam/Təkrar elan" },
    { value: "price", label: "Qiymət problemi" },
    { value: "contact", label: "Əlaqə problemi" },
    { value: "other", label: "Digər" },
  ];

  // Update character count when description changes
  useEffect(() => {
    setCharacterCount(description?.length || 0);
  }, [description]);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form when modal closes
      if (!showSuccess) {
        reset();
        setCharacterCount(0);
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, showSuccess, reset]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const onSubmit = async (data: ComplaintFormData) => {
    try {
      // Handle complaint submission
      console.log("Complaint submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success modal
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
    // Reset form after modal closes
    setTimeout(() => {
      reset();
      setCharacterCount(0);
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {showSuccess ? (
          // Success Modal
          <div className={styles.modalContent}>
            <div className={styles.modalBody}>
              <div className={styles.successContent}>
                <CheckCircle size={48} className={styles.successIcon} />
                <h1 id="modal-title" className={styles.successTitle}>
                  Şikayətiniz göndərildi
                </h1>
                <p className={styles.successMessage}>
                  Bizə kömək etdiyiniz üçün sizə təşəkkür edirik! Şikayətinizə
                  ən qısa zamanda baxılacaq.
                </p>
                <button className={styles.successBtn} onClick={handleClose}>
                  Bağla
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Complaint Form Modal
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span id="modal-title" className={styles.modalTitle}>
                Şikayət
              </span>
              <button
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Bağla"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Reason Select */}
                <div className={styles.formGroup}>
                  <label htmlFor="reason" className={styles.formLabel}>
                    Şikayətin səbəbi
                  </label>
                  <select
                    {...register("reason")}
                    id="reason"
                    className={`${styles.formSelect} ${
                      errors.reason ? styles.error : ""
                    }`}
                  >
                    <option value="">Seçin</option>
                    {complaintReasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                  {errors.reason && (
                    <span className={styles.errorMessage}>
                      {errors.reason.message}
                    </span>
                  )}
                </div>

                {/* Description Textarea */}
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.formLabel}>
                    Açıqlama mətni
                  </label>
                  <div className={styles.textareaGroup}>
                    <textarea
                      {...register("description")}
                      id="description"
                      className={`${styles.formTextarea} ${
                        errors.description ? styles.error : ""
                      }`}
                      rows={5}
                      maxLength={3000}
                      placeholder="Şikayətinizin təfərrüatlarını yazın..."
                    />
                    <small className={styles.textareaCounter}>
                      <span
                        className={
                          characterCount > 3000 ? styles.errorCount : ""
                        }
                      >
                        {characterCount}
                      </span>{" "}
                      hərf
                    </small>
                  </div>
                  {errors.description && (
                    <span className={styles.errorMessage}>
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Göndərilir..." : "Təsdiqlə"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintModal;
