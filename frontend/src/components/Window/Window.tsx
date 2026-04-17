import React from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useStore } from '../../store';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ id, title, children }) => {
  const { windows, closeWindow, minimizeWindow, focusWindow } = useStore();
  const windowState = windows.find(w => w.id === id);
  const nodeRef = React.useRef(null);

  if (!windowState || windowState.isMinimized) return null;

  return (
    <Draggable handle=".window-handle" cancel=".window-controls" onMouseDown={() => focusWindow(id)} nodeRef={nodeRef}>
      <div ref={nodeRef} style={{ position: 'absolute', top: '10%', left: '10%', zIndex: windowState.zIndex }} className="window-drag-container">
        <motion.div
          className="window-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => focusWindow(id)}
        >
          <div className="window-handle" style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{title}</h3>
          <div className="window-controls" style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => minimizeWindow(id)} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}><Minus size={14} /></button>
            <button onClick={() => {}} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}><Maximize2 size={14} /></button>
            <button onClick={() => closeWindow(id)} style={{ background: 'none', border: 'none', color: '#ff5f56', cursor: 'pointer' }}><X size={14} /></button>
          </div>
        </div>
        <div className="window-content" style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </motion.div>
      </div>
    </Draggable>
  );
};

export default Window;
