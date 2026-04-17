import React, { useEffect, useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import socket from './socket';
import { motion, AnimatePresence } from 'framer-motion';

const BootScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, backgroundColor: '#000',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999, color: 'var(--text-color)', fontFamily: 'monospace'
      }}
    >
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'var(--accent-color)', marginBottom: 20 }}>OS Portfolio v1.0</h1>
        <p style={{ marginBottom: 20, color: 'var(--secondary-color)' }}>Booting system...</p>
        <div style={{ width: 300, height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--accent-color)', transition: 'width 0.1s linear' }} />
        </div>
      </motion.div>
    </motion.div>
  );
};



const EasterEgg = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === konami[idx]) {
        idx++;
        if (idx === konami.length) {
          setShow(true);
          setTimeout(() => setShow(false), 5000);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
             {/* Simple stars rain effect */}
             {Array.from({length: 50}).map((_, i) => (
                <motion.div key={i}
                  initial={{ y: -100, x: Math.random() * window.innerWidth }}
                  animate={{ y: window.innerHeight + 100 }}
                  transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }}
                />
             ))}
          </div>
          <motion.h1 
            initial={{ scale: 0.5, y: 50 }} 
            animate={{ scale: 1, y: 0 }} 
            style={{ color: '#fff', textShadow: '0 0 20px var(--accent-color)', fontSize: '3rem', zIndex: 1 }}
          >
            Je hebt me gevonden! 🎮
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    socket.connect();
    // Finish booting after 2.5s
    const bootTimer = setTimeout(() => setIsBooting(false), 2500);
    return () => {
      socket.disconnect();
      clearTimeout(bootTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootScreen />}
      </AnimatePresence>
      <EasterEgg />
      <Desktop />
      <Taskbar />
    </>
  );
}

export default App;
