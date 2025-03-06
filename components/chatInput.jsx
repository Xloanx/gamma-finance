import { useState } from 'react';
import { Mic, Send } from 'lucide-react';

const ChatInput = ({ onSend, onSpeech }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-2 bg-white shadow-md rounded-lg">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg outline-none"
      />
      <button onClick={onSpeech} className="mx-2 p-2 bg-gray-200 rounded-full">
        <Mic size={20} />
      </button>
      <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
