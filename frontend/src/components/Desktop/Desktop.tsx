import React, { useEffect, useState } from 'react';
import AboutWindow from '../windows/AboutWindow';
import ProjectsWindow from '../windows/ProjectsWindow';
import SkillsWindow from '../windows/SkillsWindow';
import TerminalWindow from '../windows/TerminalWindow';
import ChatWindow from '../windows/ChatWindow';
import AdminWindow from '../windows/AdminWindow';
import SnakeWindow from '../windows/SnakeWindow';
import { useStore } from '../../store';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AmbientParticles = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="particles-container">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ['0vh', '-100vh'],
            x: Math.random() * 200 - 100,
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: -10,
            left: `${Math.random() * 100}vw`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: i % 2 === 0 ? 'var(--accent-color)' : 'var(--secondary-color)',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<{ temp: number, condition: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`);
          const data = await res.json();
          setWeather({ temp: Math.round(data.current_weather.temperature), condition: data.current_weather.weathercode });
        } catch (e) {
          console.error('Weather fetch failed', e);
        }
      }, () => {
        // Fallback to Amsterdam if geolocation denied
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.3676&longitude=4.9041&current_weather=true')
          .then(res => res.json())
          .then(data => setWeather({ temp: Math.round(data.current_weather.temperature), condition: data.current_weather.weathercode }))
          .catch(console.error);
      });
    }
  }, []);

  if (!weather) return null;

  const renderIcon = () => {
    if (weather.condition <= 3) return <Sun size={20} color="#FFD700" />;
    if (weather.condition >= 51 && weather.condition <= 67) return <CloudRain size={20} color="#87CEEB" />;
    return <Cloud size={20} color="#A9A9A9" />;
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 3 }}
      style={{
        position: 'absolute', top: 20, right: 20,
        background: 'rgba(15,15,26,0.5)', backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)', borderRadius: 12,
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
        color: 'var(--text-color)', zIndex: 1000
      }}
    >
      {renderIcon()}
      <span style={{ fontWeight: 600 }}>{weather.temp}°C</span>
    </motion.div>
  );
};

const WelcomeNotification = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ delay: 2.8 }}
          onClick={() => setShow(false)}
          style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--accent-color)', color: '#fff',
            padding: '12px 24px', borderRadius: 20, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124, 106, 255, 0.4)', zIndex: 1001,
            fontWeight: 600
          }}
        >
          Welkom bij OS Portfolio! Klik op de iconen beneden om te starten.
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Desktop = () => {
  const { windows } = useStore();

  return (
    <div style={{ position: 'relative', width: '100vw', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>
      <AmbientParticles />
      <WeatherWidget />
      <WelcomeNotification />
      
      {windows.map((w) => {
        switch (w.id) {
          case 'about': return <AboutWindow key={w.id} />;
          case 'projects': return <ProjectsWindow key={w.id} />;
          case 'skills': return <SkillsWindow key={w.id} />;
          case 'terminal': return <TerminalWindow key={w.id} />;
          case 'chat': return <ChatWindow key={w.id} />;
          case 'admin': return <AdminWindow key={w.id} />;
          case 'snake': return <SnakeWindow key={w.id} />;
          default: return null;
        }
      })}
    </div>
  );
};

export default Desktop;
