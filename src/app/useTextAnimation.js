import { useEffect, useState } from "react";

export function useTextAnimation() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const textToType = "A Smart Rental Application";
  const typingSpeed = 100; // Adjust typing speed here (milliseconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText((prevText) => prevText + textToType[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [currentIndex, textToType.length, typingSpeed]);

  return { typedText };
}
