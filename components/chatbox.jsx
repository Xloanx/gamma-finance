'use client'

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './messageBubble';
import ChatInput from './chatInput';
import TypingIndicator from './typingIndicator';
import { useChatStore } from '@/store/chatStore';
import UseSpeechRecognition from './useSpeechRecognition';
import StockSelect from './stock-select';
import { ArrowDown } from 'lucide-react';


const ChatBox = ({ onVideoResponse }) => {
  const { messages, addMessage } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleUserMessage = async (message) => {
    if (!message.trim()) return;

    // Prepend selected stock symbol if available
    const modifiedMessage = selectedStock ? `With respect to ${selectedStock}, ${message}` : message;

    addMessage({ id: Date.now().toString(), text: modifiedMessage, sender: 'user' });
    setIsTyping(true);

    // setTimeout(() => {
    //     const isVideoResponse = message.toLowerCase().includes('video');
    //     // const isVideoResponse = true;

    //     const aiMessage = {
    //         id: Date.now().toString(),
    //         text: isVideoResponse ? 'AI Video Response: [Video Placeholder]' : `AI Response: ${message}`,
    //         sender: 'ai',
    //         type: isVideoResponse ? 'video' : 'text',
    //       };

    //     if (isVideoResponse) {
    //         onVideoResponse(aiMessage);
    //       } else {
    //         addMessage(aiMessage);
    //       }
    
    //     setIsTyping(false);
    //   }, 2000);


    try {
      const response = await fetch('http://0.0.0.0:8000/chat', { // Update if hosted elsewhere
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: modifiedMessage }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const aiMessage = {
          id: Date.now().toString(),
          text: data.response, // Response from FastAPI
          sender: 'ai',
        };
  
        addMessage(aiMessage);
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

  const { isListening, toggleListening, error } = UseSpeechRecognition((transcript) => {
    handleUserMessage(transcript);
  });

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  };

  return (
        <>
            

            <div className="chatbox-container p-6 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <StockSelect onStockSelect={handleStockSelect}/>
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
