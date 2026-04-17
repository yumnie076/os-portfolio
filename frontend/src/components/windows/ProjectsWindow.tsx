import React, { useEffect, useState } from 'react';
import Window from '../Window/Window';
import api from '../../api';
import socket from '../../socket';
import { motion } from 'framer-motion';
import './ProjectsWindow.css';
import './ReactionBar.css';

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const EMOJIS = ['👍', '❤️', '🚀', '🔥'];

const ReactionBar = ({ projectId }: { projectId: string }) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Haal initiele reacties op
    api.get(`/reactions/${projectId}`).then(res => {
      const initCounts: Record<string, number> = {};
      res.data.forEach((r: any) => {
        initCounts[r.emoji] = (initCounts[r.emoji] || 0) + 1;
      });
      setCounts(initCounts);
    }).catch(console.error);

    // Luister naar live reacties
    const onReaction = (data: any) => {
      if (data.projectId === projectId) {
        setCounts(prev => ({ ...prev, [data.emoji]: (prev[data.emoji] || 0) + 1 }));
      }
    };
    socket.on('reaction-added', onReaction);

    return () => {
      socket.off('reaction-added', onReaction);
    };
  }, [projectId]);

  const handleReact = async (emoji: string) => {
    // Optimistic update
    setCounts(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    try {
      await api.post('/reactions', { projectId, emoji, visitorId: socket.id || 'guest' });
      socket.emit('new-reaction', { projectId, emoji });
    } catch (error) {
      console.error('Failed to save reaction:', error);
      setCounts(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) - 1 })); // revert
    }
  };

  return (
    <div className="reaction-bar">
      {EMOJIS.map(emoji => (
        <motion.button
          key={emoji}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleReact(emoji)}
          className="reaction-button"
        >
          {emoji} {counts[emoji] || 0}
        </motion.button>
      ))}
    </div>
  );
};

const ProjectsWindow = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/projects')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Kon projecten niet laden.');
        setLoading(false);
      });
  }, []);

  return (
    <Window id="projects" title="Projecten">
      <div className="projects-container">
        {loading && <p className="loading-text">Projecten ophalen uit de database...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && projects.length === 0 && !error && (
          <p className="loading-text">Nog geen projecten gevonden. Voeg ze toe via de admin interface!</p>
        )}
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project._id} className="project-card">
              {project.imageUrl && (
                <div className="project-image-wrapper">
                  <img src={project.imageUrl} alt={project.title} className="project-image" />
                </div>
              )}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <ReactionBar projectId={project._id} />
                <div className="project-links">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="link-button primary">Live Demo</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="link-button secondary">GitHub</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
};

export default ProjectsWindow;
