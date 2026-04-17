import React, { useState, useEffect, useRef, useCallback } from 'react';
import Window from '../Window/Window';

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 5, y: 5 };

const SnakeWindow = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // Check crash wall
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          handleGameOver();
          return prev;
        }
        
        // Check crash self
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          handleGameOver();
          return prev;
        }

        const newSnake = [newHead, ...prev];
        
        // Check eat food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }
        
        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 120);
    return () => clearInterval(intervalId);
  }, [direction, food, isPlaying, gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

    // Draw snake
    ctx.fillStyle = '#7c6aff';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = '#4ec9b0';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

  }, [snake, food]);

  return (
    <Window id="snake" title="Snake">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: GRID_SIZE * CELL_SIZE, marginBottom: 10 }}>
          <span>Score: {score}</span>
          <span style={{ color: 'var(--secondary-color)' }}>High Score: {highScore}</span>
        </div>
        
        <div style={{ position: 'relative' }}>
          <canvas 
            ref={canvasRef} 
            width={GRID_SIZE * CELL_SIZE} 
            height={GRID_SIZE * CELL_SIZE}
            style={{ border: '2px solid var(--border-color)', borderRadius: 8 }}
          />
          
          {(!isPlaying || gameOver) && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', borderRadius: 8
            }}>
              {gameOver && <h3 style={{ color: '#ff5f56', marginBottom: 10 }}>Game Over!</h3>}
              <button 
                onClick={resetGame}
                style={{
                  padding: '8px 16px', background: 'var(--accent-color)', color: 'white',
                  border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                {gameOver ? 'Speel Opnieuw' : 'Start Spel'}
              </button>
            </div>
          )}
        </div>
        <p style={{ fontSize: '0.8rem', marginTop: 10, color: '#aaa', textAlign: 'center', display: 'none' }} className="snake-desktop-hint">Gebruik pijltjestoetsen om te bewegen</p>
        
        {/* Mobile controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16 }}>
          <div />
          <button style={btnStyle} onClick={() => { if(direction.y !== 1) setDirection({x:0, y:-1}) }}>▲</button>
          <div />
          <button style={btnStyle} onClick={() => { if(direction.x !== 1) setDirection({x:-1, y:0}) }}>◀</button>
          <button style={btnStyle} onClick={() => { if(direction.y !== -1) setDirection({x:0, y:1}) }}>▼</button>
          <button style={btnStyle} onClick={() => { if(direction.x !== -1) setDirection({x:1, y:0}) }}>▶</button>
        </div>
      </div>
    </Window>
  );
};

const btnStyle = {
  width: 40, height: 40, borderRadius: 8, border: 'none',
  background: 'rgba(255,255,255,0.1)', color: 'var(--text-color)',
  fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

export default SnakeWindow;
