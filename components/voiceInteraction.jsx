import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FaMicrophone, FaStop } from "react-icons/fa";

export default function VoiceInteraction() {
  const [response, setResponse] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support voice recognition.</p>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();
    const userQuery = transcript;
    resetTranscript();
    
    try {
      const response = await fetch("https://api.example.com/voice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });
      const data = await response.json();
      setResponse(data.reply);
    } catch (error) {
      console.error("Error fetching voice response:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4">Two-Way Voice Interaction</h2>
      <p className="text-gray-600">Speak your query and receive a response.</p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleStartListening}
          className={`bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 ${listening ? "opacity-50" : ""}`}
          disabled={listening}
        >
          <FaMicrophone /> Start Listening
        </button>
        <button
          onClick={handleStopListening}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaStop /> Stop & Process
        </button>
      </div>
      <p className="mt-4 text-blue-600 font-bold">{transcript}</p>
      {response && <p className="mt-4 text-gray-700 font-semibold">Response: {response}</p>}
    </div>
  );
}