import React, { useState, useRef, useEffect } from 'react';
import Window from '../Window/Window';
import { useStore } from '../../store';

const TerminalWindow = () => {
  const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([
    { command: '', output: 'Welkom bij OS Portfolio Terminal v1.0.0. Typ "help" voor een lijst met commando\'s.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div>
            <p>Beschikbare commando's:</p>
            <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
              <li><strong>whoami</strong> - Wie is Yumnie?</li>
              <li><strong>projects</strong> - Bekijk mijn werk</li>
              <li><strong>skills</strong> - Wat kan ik?</li>
              <li><strong>contact</strong> - Hoe bereik je mij?</li>
              <li><strong>chat</strong> - Start de AI chat assistent</li>
              <li><strong>clear</strong> - Maak de terminal leeg</li>
            </ul>
          </div>
        );
        break;
      case 'whoami':
        output = 'Ik ben Yumnie, een full-stack developer met liefde voor strakke UIs en robust backend systemen.';
        break;
      case 'projects':
        output = 'Projecten-venster wordt geopend...';
        openWindow('projects', 'Projecten', 'projects');
        break;
      case 'skills':
        output = 'Skills-venster wordt geopend...';
        openWindow('skills', 'Mijn Skills', 'skills');
        break;
      case 'chat':
        output = 'AI Assistent is aan het opstarten...';
        openWindow('chat', 'AI-Chat', 'chat');
        break;
      case 'contact':
        output = 'Mail me op: yumnie@example.com of check mijn LinkedIn!';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${cmd}. Typ "help" voor commando's.`;
    }

    setHistory([...history, { command: cmd, output }]);
    setInput('');
  };

  return (
    <Window id="terminal" title="Terminal">
      <div style={{
        fontFamily: '"Courier New", Courier, monospace',
        color: '#e8e0c8',
        backgroundColor: '#0f0f1a', // donkerdere tint
        padding: '10px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        overflowY: 'auto'
      }}>
        {history.map((entry, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {entry.command && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#4ec9b0' }}>yumnie@portfolio:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            {entry.output && <div style={{ marginTop: '4px', color: '#a0a0b5' }}>{entry.output}</div>}
          </div>
        ))}
        <form onSubmit={handleCommand} style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <span style={{ color: '#4ec9b0' }}>yumnie@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              outline: 'none',
              flex: 1,
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '14px'
            }}
            autoFocus
          />
        </form>
        <div ref={endRef} />
      </div>
    </Window>
  );
};

export default TerminalWindow;
