'use client'
import { askGemini, getQuestions } from '@/graphql/gpt';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useChatContext } from '@/context/Providers';
import { useSession } from 'next-auth/react';

interface Message {
  from: 'user' | 'ai';
  text: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const chat = useChatContext();
  const { data: session } = useSession();
  const params = useParams()
  const router = useRouter()

  const hasStarted = messages.length > 0;
  useEffect(() => {
    getQuestions(String(session?.user?.email), String(params.id)).then((data) => {
      const _messages: Message[] = [];
      for (const question of data) {
        _messages.push({from: 'user', text: question.question});
        _messages.push({from: 'ai', text: question.answer});
      }
      setMessages(_messages);
      if(params.id == "new") {
        chat.setUpdate(true);
      }
    });
  }, [params.id])

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { from: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askGemini(String(session?.user?.email),userMessage.text, String(params.id));
      const aiMessage: Message = {
        from: 'ai',
        text: response?.answer || "Sorry, I couldn't get a response."
      };
      setMessages((prev) => [...prev, aiMessage]);
      router.push(`/gpt/${response?.chatId}`);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: "Oops! Something went wrong." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex p-5 w-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full h-[80vh] flex flex-col rounded-xl border border-gray-300 bg-white shadow-md">
        
        {/* Header */}
        <div className="p-4 text-lg font-semibold text-gray-800 border-b border-gray-200">
          ShopGPT
        </div>

        {/* Chat Messages or Initial Intro */}
        <div className="flex-1 overflow-y-auto p-4 text-gray-800">
          {!hasStarted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-700">Shopping Assistant</h2>
              <p className="text-gray-600 max-w-md">
                I can help you find products, answer questions about shipping, returns, and provide recommendations tailored to your preferences.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs md:max-w-4xl text-sm ${
                      msg.from === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-black rounded-bl-none'
                    }`}
                  >
                    {msg.from === 'ai' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
              {loading && (
                <div
                  className="flex justify-start px-4 py-2 text-gray-500 text-sm font-semibold"
                  style={{
                    animation: 'heartbeatBlink 1.5s ease-in-out infinite',
                    transformOrigin: 'center center',
                  }}
                >
                  AI is typing...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>

      {/* Heartbeat blink animation */}
      <style jsx>{`
        @keyframes heartbeatBlink {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.6;
            filter: brightness(1.3);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatComponent;
