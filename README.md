# Miles - Learning Roadmap Platform

## Overview

Miles is a comprehensive learning roadmap platform designed to help users navigate their educational journey in technology and professional development. Built with React, TypeScript, and modern web technologies, it provides personalized learning paths, progress tracking, and community features.

## Features

- 🎯 **Personalized Learning Paths**: Create and follow customized roadmaps tailored to your goals
- 📊 **Progress Tracking**: Monitor your learning journey with detailed analytics
- 👥 **Community Integration**: Connect with fellow learners and share experiences
- 🎨 **Interactive UI**: Modern, responsive design with dark/light mode support
- 🔒 **Authentication System**: Secure user authentication and authorization
- 📱 **Responsive Design**: Fully responsive across all devices
- 🎨 **Customizable Themes**: Support for light and dark modes
- 🛠 **Multiple Roadmaps**: Including:
  - Frontend Development
  - Backend Development
  - Full Stack Development
  - Machine Learning
  - UI/UX Design
  - Web3 Development

## Tech Stack

- **Frontend Framework**: React 18
- **Type System**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router
- **UI Components**: Radix UI
- **Build Tool**: Vite
- **Package Manager**: npm/yarn
- **Authentication**: JWT-based auth system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/zoro-aizen/final-year-project.git
cd final-year-project
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a \`.env\` file in the root directory with the following variables:

\`\`\`env
VITE_API_URL=your_api_url
VITE_AUTH_SECRET=your_auth_secret
\`\`\`

## Project Structure

\`\`\`
src/
├── app/              # App-wide configurations
├── components/       # Reusable components
│   ├── auth/        # Authentication components
│   ├── landing/     # Landing page components
│   ├── layout/      # Layout components
│   └── ui/          # UI components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
│   └── roadmapData/ # Roadmap definitions
├── pages/           # Page components
└── styles/          # Global styles
\`\`\`

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm run preview\`: Preview production build
- \`npm run lint\`: Lint code
- \`npm run type-check\`: Type check TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Zustand](https://github.com/pmndrs/zustand)

## Contact

Project Link: [https://github.com/zoro-aizen/final-year-project](https://github.com/zoro-aizen/final-year-project)

## Screenshots

Coming soon...

---

Made with ❤️ by [Your Name]