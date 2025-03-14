import { frontendRoadmap } from './frontendRoadmap';
import { backendRoadmap } from './backendRoadmap';
import { fullstackRoadmap } from './fullstackRoadmap';
import { mlRoadmap } from './mlRoadmap';
import { uiuxRoadmap } from './uiuxRoadmap';
import { web3Roadmap } from './web3Roadmap';
import { managementRoadmap } from './managementRoadmap';
import { financeRoadmap } from './financeRoadmap';
import { consultingRoadmap } from './consultingRoadmap';

export const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Learn modern frontend development with React, TypeScript, and more',
    data: frontendRoadmap,
    category: 'development',
    level: 'beginner',
    duration: '6-12 months',
    prerequisites: ['HTML', 'CSS', 'JavaScript basics'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Master backend development with Node.js, databases, and APIs',
    data: backendRoadmap,
    category: 'development',
    level: 'intermediate',
    duration: '8-14 months',
    prerequisites: ['JavaScript', 'Programming fundamentals'],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become a full stack developer with both frontend and backend skills',
    data: fullstackRoadmap,
    category: 'development',
    level: 'advanced',
    duration: '12-18 months',
    prerequisites: ['Frontend basics', 'Backend basics'],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Learn machine learning, deep learning, and AI fundamentals',
    data: mlRoadmap,
    category: 'data-science',
    level: 'advanced',
    duration: '12-24 months',
    prerequisites: ['Python', 'Mathematics', 'Statistics'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Master user interface and user experience design',
    data: uiuxRoadmap,
    category: 'design',
    level: 'beginner',
    duration: '6-12 months',
    prerequisites: ['Design fundamentals'],
  },
  {
    id: 'web3',
    title: 'Web3 Development',
    description: 'Learn blockchain, smart contracts, and decentralized applications',
    data: web3Roadmap,
    category: 'blockchain',
    level: 'advanced',
    duration: '8-14 months',
    prerequisites: ['JavaScript', 'Solidity'],
  },
];
