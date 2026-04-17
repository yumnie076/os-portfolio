import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-portfolio';

const seedProjects = [
  {
    title: 'OS Portfolio',
    description: 'Een desktop-style web portfolio met venster beheer',
    tags: ['React', 'TypeScript', 'Node.js', 'Socket.io'],
    githubUrl: 'https://github.com/yumnie/os-portfolio',
    liveUrl: 'https://portfolio.yumnie.dev',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    featured: true
  },
  {
    title: 'AI Chatbot',
    description: 'Slimme klantenservice bot gebouwd op GPT-4o.',
    tags: ['OpenAI', 'Python', 'React'],
    githubUrl: 'https://github.com/yumnie/ai-bot',
    imageUrl: 'https://images.unsplash.com/photo-1531297172864-16ce38bd84c9?auto=format&fit=crop&w=400&q=80',
    featured: false
  },
  {
    title: 'E-commerce API',
    description: 'Schaalbare backend voor webshops.',
    tags: ['Express', 'MongoDB', 'Redis'],
    githubUrl: 'https://github.com/yumnie/ecommerce-api',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80',
    featured: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    await Project.insertMany(seedProjects);
    console.log('Seed data inserted successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
