import React, { useState, useEffect } from 'react';
import Window from '../Window/Window';
import './AboutWindow.css';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span>
      {displayedText}
      {currentIndex === text.length ? <span className="blinking-cursor">|</span> : '|'}
    </span>
  );
};

const AboutWindow = () => {
  const text1 = 'Welkom op mijn portfolio! Dit is niet zomaar een website, maar een interactief desktop-besturingssysteem gebouwd met React, TypeScript en Framer Motion.';
  const text2 = 'Ik heb een passie voor het bouwen van vloeiende, interactieve web apps die een "wow"-factor hebben. Achter de schermen draait er een robust Node.js backend met Socket.io voor realtime interacties en AI-integraties.';

  const [showP2, setShowP2] = useState(false);

  useEffect(() => {
    // Show second paragraph after first finishes typing
    const t = setTimeout(() => setShowP2(true), text1.length * 30 + 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Window id="about" title="Over mij">
      <div className="about-container">
        <div className="about-header">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" 
            alt="Yumnie Avatar" 
            className="about-avatar"
          />
          <div>
            <h2 className="about-title">Hi, ik ben Yumnie! 👋</h2>
            <p className="about-subtitle">Fullstack Developer & AI Enthousiast</p>
          </div>
        </div>
        
        <div className="about-content">
          <p style={{ minHeight: '60px' }}>
            <TypewriterText text={text1} />
          </p>
          {showP2 ? (
            <p style={{ minHeight: '80px', marginTop: '10px' }}>
              <TypewriterText text={text2} />
            </p>
          ) : (
            <p style={{ minHeight: '80px', marginTop: '10px' }}></p>
          )}
          <div className="about-contact" style={{ marginTop: '20px', opacity: showP2 ? 1 : 0, transition: 'opacity 1s ease 2s' }}>
            <h3>Contact</h3>
            <p>📧 yumnie@example.com</p>
            <p>💼 <a href="#" style={{ color: 'var(--accent-color)' }}>LinkedIn</a></p>
            <p>💻 <a href="#" style={{ color: 'var(--accent-color)' }}>GitHub</a></p>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default AboutWindow;
