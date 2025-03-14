export const backendRoadmap = {
  title: 'Backend Development Roadmap',
  description: 'A comprehensive guide to becoming a backend developer',
  sections: [
    {
      title: 'Programming Fundamentals',
      topics: [
        {
          title: 'Core Concepts',
          items: [
            'Data structures',
            'Algorithms',
            'Time complexity',
            'Memory management',
            'Design patterns',
          ],
        },
        {
          title: 'Version Control',
          items: [
            'Git basics',
            'Branching strategies',
            'Collaboration workflows',
            'Code review practices',
            'CI/CD integration',
          ],
        },
      ],
    },
    {
      title: 'Node.js Development',
      topics: [
        {
          title: 'Node.js Basics',
          items: [
            'Event loop',
            'Modules system',
            'File system operations',
            'Streams and buffers',
            'Error handling',
          ],
        },
        {
          title: 'Express.js',
          items: [
            'Routing',
            'Middleware',
            'Template engines',
            'Error handling',
            'Security best practices',
          ],
        },
      ],
    },
    {
      title: 'Database Management',
      topics: [
        {
          title: 'SQL Databases',
          items: [
            'Database design',
            'SQL queries',
            'Indexing',
            'Transactions',
            'Performance optimization',
          ],
        },
        {
          title: 'NoSQL Databases',
          items: [
            'MongoDB',
            'Document modeling',
            'Aggregation pipeline',
            'Scaling strategies',
            'Data validation',
          ],
        },
      ],
    },
    {
      title: 'API Development',
      topics: [
        {
          title: 'REST APIs',
          items: [
            'RESTful principles',
            'API versioning',
            'Authentication',
            'Rate limiting',
            'Documentation',
          ],
        },
        {
          title: 'GraphQL',
          items: [
            'Schema design',
            'Resolvers',
            'Type system',
            'Subscriptions',
            'Performance optimization',
          ],
        },
      ],
    },
    {
      title: 'DevOps & Deployment',
      topics: [
        {
          title: 'Server Management',
          items: [
            'Linux basics',
            'Shell scripting',
            'Process management',
            'Monitoring',
            'Security',
          ],
        },
        {
          title: 'Containerization',
          items: [
            'Docker',
            'Kubernetes',
            'Container orchestration',
            'Service discovery',
            'Load balancing',
          ],
        },
      ],
    },
  ],
  resources: [
    {
      title: 'Documentation',
      links: [
        {
          name: 'Node.js Documentation',
          url: 'https://nodejs.org/docs',
        },
        {
          name: 'Express.js Guide',
          url: 'https://expressjs.com/guide',
        },
        {
          name: 'MongoDB Manual',
          url: 'https://docs.mongodb.com/manual',
        },
      ],
    },
    {
      title: 'Courses',
      links: [
        {
          name: 'Node.js Master Class',
          url: 'https://nodejs.dev/learn',
        },
        {
          name: 'SQL and Database Design',
          url: 'https://www.postgresql.org/docs/online-resources/',
        },
        {
          name: 'Docker for Developers',
          url: 'https://docs.docker.com/get-started/',
        },
      ],
    },
    {
      title: 'Tools',
      links: [
        {
          name: 'Postman',
          url: 'https://www.postman.com',
        },
        {
          name: 'MongoDB Compass',
          url: 'https://www.mongodb.com/products/compass',
        },
        {
          name: 'Docker Desktop',
          url: 'https://www.docker.com/products/docker-desktop',
        },
      ],
    },
  ],
  projects: [
    {
      title: 'RESTful API',
      description: 'Build a RESTful API with Node.js and Express',
      skills: ['Node.js', 'Express', 'MongoDB'],
      difficulty: 'Beginner',
    },
    {
      title: 'Authentication System',
      description: 'Create a secure authentication system with JWT',
      skills: ['Node.js', 'Security', 'Database'],
      difficulty: 'Intermediate',
    },
    {
      title: 'Microservices Architecture',
      description: 'Develop a microservices-based application with Docker',
      skills: ['Node.js', 'Docker', 'Microservices'],
      difficulty: 'Advanced',
    },
  ],
};
