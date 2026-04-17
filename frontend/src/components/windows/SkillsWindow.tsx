import React from 'react';
import Window from '../Window/Window';
import './SkillsWindow.css';

const SkillsWindow = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Framer Motion', 'Zustand', 'Vite'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Socket.io', 'JWT', 'REST APIs'] },
    { category: 'Database & Overig', items: ['MongoDB', 'Mongoose', 'Git', 'OpenAI API'] }
  ];

  return (
    <Window id="skills" title="Mijn Skills">
      <div className="skills-container">
        {skills.map(group => (
          <div key={group.category} className="skill-group">
            <h3 className="skill-category">{group.category}</h3>
            <div className="skill-items">
              {group.items.map(item => (
                <span key={item} className="skill-badge">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
};

export default SkillsWindow;
