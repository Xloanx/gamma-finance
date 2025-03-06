import { create } from 'zustand';

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'ai';
// }

// interface ChatState {
//   messages: Message[];
//   addMessage: (message: Message) => void;
//   clearMessages: () => void;
// }

export const useChatStore = create((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
