import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 p-2">
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        ></motion.span>
      ))}
    </div>
  );
};

export default TypingIndicator;