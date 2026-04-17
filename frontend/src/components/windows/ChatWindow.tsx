import React, { useState, useRef, useEffect } from 'react';
import Window from '../Window/Window';
import api from '../../api';
import './ChatWindow.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hallo! Ik ben de AI-assistent van Yumnie. Je kunt mij vragen stellen over haar vaardigheden of projecten!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const { data } = await api.post('/chat', {
        message: userMessage,
        history: messages.slice(-10) // Stuur de laatste 10 berichten mee als context
      });
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'Ah, helaas! Ik ben tijdelijk de connectie met OpenAI kwijt (misschien mist de API key?). Stuur Yumnie even een e-mail!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Window id="chat" title="AI-Chat">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble-wrapper ${msg.role === 'user' ? 'user' : 'assistant'}`}>
              <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'assistant'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble-wrapper assistant">
              <div className="chat-bubble assistant typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Typ een bericht..."
            className="chat-input"
            disabled={loading}
          />
          <button type="submit" className="chat-submit" disabled={loading || !input.trim()}>
            Stuur
          </button>
        </form>
      </div>
    </Window>
  );
};

export default ChatWindow;
