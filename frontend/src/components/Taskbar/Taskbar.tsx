import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../../store';
import { User, Folder, Code, Terminal as TerminalIcon, MessageSquare, Shield, Users, Gamepad2, Music } from 'lucide-react';
import socket from '../../socket';
import { motion, AnimatePresence } from 'framer-motion';

const Taskbar = () => {
  const { openWindow, windows } = useStore();
  const [visitorCount, setVisitorCount] = useState(1);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    socket.on('visitor-count', (count: number) => setVisitorCount(count));
    return () => { socket.off('visitor-count'); };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      // Free Lo-fi stream
      audioRef.current = new Audio('https://stream.zeno.fm/4eqzyw951wzuv'); 
      audioRef.current.volume = 0.2;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const apps = [
    { id: 'about', title: 'Over mij', icon: <User size={20} /> },
    { id: 'projects', title: 'Projecten', icon: <Folder size={20} /> },
    { id: 'skills', title: 'Skills', icon: <Code size={20} /> },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon size={20} /> },
    { id: 'chat', title: 'AI-Chat', icon: <MessageSquare size={20} /> },
    { id: 'admin', title: 'Admin', icon: <Shield size={20} /> },
    { id: 'snake', title: 'Snake', icon: <Gamepad2 size={20} /> }
  ];

  return (
    <div style={{
      height: '56px',
      backgroundColor: 'var(--taskbar-bg)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      justifyContent: 'space-between',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 9999,
      backdropFilter: 'blur(20px)'
    }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        {apps.map(app => {
          const isOpen = windows.some(w => w.id === app.id);
          const isFocused = windows.some(w => w.id === app.id && w.isFocused);
          return (
            <motion.div key={app.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.button
                onClick={() => openWindow(app.id, app.title, app.id)}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: isFocused ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  color: isOpen ? 'var(--accent-color)' : 'var(--text-color)',
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isOpen ? '0 0 10px rgba(124, 106, 255, 0.2)' : 'none'
                }}
                title={app.title}
              >
                {app.icon}
              </motion.button>
              {isOpen && (
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', position: 'absolute', bottom: '-4px' }} />
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <motion.button
            onClick={() => setShowMusicPlayer(!showMusicPlayer)}
            whileHover={{ scale: 1.1 }}
            style={{ background: 'transparent', border: 'none', color: isPlaying ? 'var(--secondary-color)' : 'var(--text-color)', cursor: 'pointer' }}
          >
            <Music size={18} />
          </motion.button>
          <AnimatePresence>
            {showMusicPlayer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ position: 'absolute', bottom: '40px', right: '-10px', background: 'var(--window-bg)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', gap: '10px', alignItems: 'center', width: '200px' }}
              >
                <div onClick={toggleAudio} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', background: 'var(--accent-color)', borderRadius: '50%' }}>
                  {isPlaying ? '⏸' : '▶'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-color)' }}>Lo-Fi Beats stream<br/><small style={{color:'var(--secondary-color)'}}>{isPlaying ? 'Playing...' : 'Paused'}</small></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--secondary-color)', boxShadow: '0 0 8px var(--secondary-color)' }}></div>
          <span>{visitorCount} online</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
