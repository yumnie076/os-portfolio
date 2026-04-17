import React, { useState } from 'react';
import Window from '../Window/Window';
import api from '../../api';

const AdminWindow = () => {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{ totalVisitors?: number }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/login', { password });
      setLoggedIn(true);
      setError('');
      setPassword('');
      fetchStats();
    } catch (err) {
      setError('Ongeldig wachtwoord');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout');
    } catch (err) {
      console.error(err);
    } finally {
      setLoggedIn(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/visitors/stats');
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Window id="admin" title="Admin Paneel">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        {!loggedIn ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: 'auto' }}>
            <h3 style={{ color: 'var(--accent-color)', textAlign: 'center' }}>Beveiligde Toegang</h3>
            <input 
              type="password" 
              placeholder="Wachtwoord" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '10px',
                background: 'rgba(30,30,45,0.8)',
                border: '1px solid var(--border-color)',
                color: 'white',
                borderRadius: '6px'
              }}
            />
            {error && <p style={{ color: '#ff5f56', fontSize: '0.9rem' }}>{error}</p>}
            <button 
              type="submit"
              style={{
                padding: '10px',
                background: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Inloggen
            </button>
          </form>
        ) : (
          <div>
            <h3 style={{ color: 'var(--secondary-color)' }}>Welkom Admin!</h3>
            <p>Hier beheer je Yumnie's OS Portfolio componenten.</p>
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h4>Live Statistieken</h4>
              <p>Totaal aantal unieke bezoekers geregistreerd: {stats.totalVisitors !== undefined ? stats.totalVisitors : 'Laden...'}</p>
            </div>
            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '8px 16px', background: '#ff5f56', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Uitloggen</button>
          </div>
        )}
      </div>
    </Window>
  );
};

export default AdminWindow;
