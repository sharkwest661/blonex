// src/hooks/useTypingAnimation.ts
import { useState, useEffect, useRef } from "react";

interface UseTypingAnimationOptions {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  isPaused?: boolean;
}

export function useTypingAnimation({
  phrases,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  isPaused = false,
}: UseTypingAnimationOptions) {
  const [currentText, setCurrentText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (phrases.length === 0 || isPaused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    const currentPhrase = phrases[currentPhraseIndex];

    const animate = () => {
      if (isDeleting) {
        // Deleting characters
        setCurrentText((prev) => prev.slice(0, -1));
      } else {
        // Typing characters
        setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1));
      }
    };

    // Determine the delay for the next animation step
    let delay = isDeleting ? deleteSpeed : typeSpeed;

    // Check if we've finished typing the current phrase
    if (!isDeleting && currentText === currentPhrase) {
      delay = pauseTime; // Pause at the end of phrase
      setIsDeleting(true);
    }
    // Check if we've finished deleting
    else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    timeoutRef.current = setTimeout(animate, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentText,
    currentPhraseIndex,
    isDeleting,
    phrases,
    typeSpeed,
    deleteSpeed,
    pauseTime,
    isPaused,
  ]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return currentText;
}

export default useTypingAnimation;
