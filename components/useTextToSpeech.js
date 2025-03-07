'use client'

import { useEffect, useState } from 'react';

const UseTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sanitizeText = (text) => {
    return text.replace(/[*#_`~<>^{}|\-]/g, ''); //  Remove asterisks, hashtags, brackets, code blocks, and markdown symbols
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Immediately stops the speech
    setIsSpeaking(false);
  };

  const speak = (text) => {
    if (!text) return;

    // Stop current speech if new message comes in
    if (window.speechSynthesis.speaking) {
        stopSpeaking();
      }

    const cleanedText = sanitizeText(text); // Clean text before speakin
    const speech = new SpeechSynthesisUtterance(cleanedText);
    speech.lang = 'en-US';
    speech.rate = 1; // Normal Speed
    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(speech);
  };

  return { speak, stopSpeaking, isSpeaking };
};

export default UseTextToSpeech;
