'use client'

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './messageBubble';
import ChatInput from './chatInput';
import TypingIndicator from './typingIndicator';
import { useChatStore } from '@/store/chatStore';
import UseSpeechRecognition from './useSpeechRecognition';
import UseTextToSpeech from './useTextToSpeech';
import StockSelect from './stock-select';
import { ArrowDown } from 'lucide-react';


const ChatBox = () => {
  const { messages, addMessage } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const { speak, stopSpeaking, isSpeaking } = UseTextToSpeech();
  const token = localStorage.getItem("jwt");

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleUserMessage = async (message) => {
    stopSpeaking()
    if (!message.trim()) return;

    // Prepend selected stock symbol if available
    const modifiedMessage = selectedStock ? `With respect to ${selectedStock}, ${message}` : message;

    addMessage({ id: Date.now().toString(), text: modifiedMessage, sender: 'user' });
    setIsTyping(true);

   
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, { // Update if hosted elsewhere
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ query: modifiedMessage }),
      });
  
      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        const aiMessage = {
          id: Date.now().toString(),
          text: data.response, // Response from FastAPI
          sender: 'ai',
        };
  
        addMessage(aiMessage);
        speak(data.response); //speak AI message automatically
      } else {
        addMessage({
          id: Date.now().toString(),
          text: 'Error: Unable to get AI response.',
          sender: 'ai',
        });
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      addMessage({
        id: Date.now().toString(),
        text: 'Error: Server unreachable.',
        sender: 'ai',
      });
    } finally {
      setIsTyping(false);
    }
  };

  const wakeWord = "hey gamma";
  const { isListening, toggleListening, error } = UseSpeechRecognition((transcript) => {
    if (transcript.toLowerCase().includes(wakeWord)) {
      toggleListening();
    } else {
    handleUserMessage(transcript);
  }});

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isSpeaking && !isTyping && messages.length > 0) {
      console.log("Voice interaction restarted...");
      setTimeout(() => {
        toggleListening(); // Automatically start listening again
      }, 1000); // Small delay to feel natural
    }
  }, [isSpeaking, isTyping]);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  };

  return (
        <>
            

            <div className="chatbox-container p-6 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <div className='flex flex-row'>
            <StockSelect onStockSelect={handleStockSelect}/>
            {isListening && <div className="mic-wave animate-ping bg-blue-500 w-4 h-4 rounded-full" />}
            </div>

            <div className="chat-messages overflow-y-auto h-96 my-4 p-2 border rounded-lg">
                {messages.map((msg) => (
                <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />

                <button
                    className="absolute bottom-20 right-6 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-700"
                    onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <ArrowDown size={24} />
                </button>
            </div>
            <ChatInput onSend={handleUserMessage} onSpeech={toggleListening} isListening={isListening} />
            
            </div>
        </>
  );
};

export default ChatBox;
