import { useState, useEffect } from 'react';

const UseSpeechRecognition = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e) => setError(e.error);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    if (isListening) recognition.start();
    else recognition.stop();

    return () => recognition.abort();
  }, [isListening]);

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  return { isListening, toggleListening, error };
};

export default UseSpeechRecognition;
