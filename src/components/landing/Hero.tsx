import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Your Learning Journey
        <br />
        Starts Here
      </h1>
      <p className="mx-auto mt-6 max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
        Discover personalized learning paths, track your progress, and connect with
        a community of learners. Start your journey to mastery today.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          onClick={() => navigate('/explore')}
          className="h-12 px-8"
        >
          Explore Roadmaps
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/register')}
          className="h-12 px-8"
        >
          Get Started
        </Button>
      </div>
      <div className="mt-12 animate-bounce text-gray-500 dark:text-gray-400">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};
