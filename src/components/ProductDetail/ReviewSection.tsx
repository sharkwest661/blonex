import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./ReviewSection.module.scss";

interface ReviewData {
  id: string;
  author: string;
  date: string;
  content: string;
}

interface ReviewFormData {
  content: string;
}

const schema = yup.object({
  content: yup
    .string()
    .required("Şərh mətni tələb olunur")
    .min(10, "Şərh ən azı 10 hərf olmalıdır")
    .max(3000, "Şərh maksimum 3000 hərf ola bilər"),
});

const ReviewSection: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ReviewFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      content:
        "Çox babat telefondu. arada bir dinamiki xarab olur dişimlə sıxıram telefonu düzəlir. ",
    },
  });

  const content = watch("content");

  // Mock reviews data
  const reviews: ReviewData[] = [
    {
      id: "1",
      author: "N*** Ə***",
      date: "28.04.2021, 14:00",
      content:
        "Çox babat telefondu. arada bir dinamiki xarab olur dişimlə sıxıram telefonu düzəlir. Suya düşəndə düyünün içində quruduram 2 dəfə elə düzəltmişəm. Daş döyən telefondu.",
    },
    {
      id: "2",
      author: "N*** Ə***",
      date: "28.04.2021, 14:00",
      content:
        "Çox babat telefondu. arada bir dinamiki xarab olur dişimlə sıxıram telefonu düzəlir. Suya düşəndə düyünün içində quruduram 2 dəfə elə düzəltmişəm. Daş döyən telefondu.",
    },
  ];

  // Update character count when content changes
  useEffect(() => {
    setCharacterCount(content?.length || 0);
  }, [content]);

  const onSubmit = async (data: ReviewFormData) => {
    try {
      // Handle review submission
      console.log("Review submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and hide it
      reset();
      setIsFormVisible(false);
      setCharacterCount(0);

      // Show success message or refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleAddReviewClick = () => {
    setIsFormVisible(true);
    // Focus textarea after it becomes visible
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  const handleCancelReview = () => {
    setIsFormVisible(false);
    reset();
    setCharacterCount(0);
  };

  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewInner}>
        {/* Review Form */}
        {isFormVisible ? (
          <div className={styles.reviewForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formGroup}>
                <label htmlFor="review" className={styles.formLabel}>
                  Şərh yaz
                </label>
                <div className={styles.textareaGroup}>
                  <textarea
                    {...register("content")}
                    ref={textareaRef}
                    id="review"
                    className={`${styles.formTextarea} ${
                      errors.content ? styles.error : ""
                    }`}
                    rows={5}
                    maxLength={3000}
                    placeholder="Məhsul haqqında şərhinizi yazın..."
                  />
                  <small className={styles.textareaCounter}>
                    <span
                      className={characterCount > 3000 ? styles.errorCount : ""}
                    >
                      {characterCount}
                    </span>{" "}
                    hərf
                  </small>
                </div>
                {errors.content && (
                  <span className={styles.errorMessage}>
                    {errors.content.message}
                  </span>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleCancelReview}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting || !!errors.content}
                >
                  <Send size={16} />
                  {isSubmitting ? "Göndərilir..." : "Paylaş"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            className={styles.addReviewBtn}
            onClick={handleAddReviewClick}
          >
            <MessageSquare size={16} />
            Şərh yaz
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className={styles.reviewsList}>
        <button
          className={styles.reviewToggler}
          onClick={() => setIsReviewsExpanded(!isReviewsExpanded)}
          aria-expanded={isReviewsExpanded}
          aria-controls="reviews"
        >
          <span>Şərhlər ({reviews.length})</span>
          {isReviewsExpanded ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {isReviewsExpanded && (
          <div id="reviews" className={styles.reviewsContent}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>{review.author}</span>
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                  <div className={styles.reviewBody}>{review.content}</div>
                </div>
              ))
            ) : (
              <div className={styles.noReviews}>
                <p>Hələ heç bir şərh yazılmayıb. İlk şərhi siz yazın!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
