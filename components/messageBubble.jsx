
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-2 text-sm ${isUser ? 'text-right' : 'text-left'}`}
    >
      <div className={`inline-block p-3 rounded-lg shadow-md ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}>
        {isUser ? (
         <ReactMarkdown>{text}</ReactMarkdown> 
        ) : (
          <Typewriter
            words={[text]}
            loop={1}
            typeSpeed={50}
            deleteSpeed={0}
            cursor={false}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
