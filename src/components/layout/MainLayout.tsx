import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to={ROUTES.HOME} className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Miles</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                to={ROUTES.EXPLORE}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Explore
              </Link>
              <Link
                to={ROUTES.COMMUNITY}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Community
              </Link>
              <Link
                to={ROUTES.ABOUT}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                About
              </Link>
              {isAuthenticated && (
                <Link
                  to={ROUTES.SKETCHPAD}
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  Sketchpad
                </Link>
              )}
            </nav>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-between text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                <span className="hidden lg:inline-flex">Search documentation...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
            <nav className="flex items-center">
              <ThemeToggle />

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={ROUTES.PROFILE}
                    className="flex items-center space-x-2"
                  >
                    <div className="relative h-8 w-8">
                      <img
                        src={user?.avatar || '/default-avatar.png'}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </div>
                    <span className="hidden text-sm font-medium md:inline-block">
                      {user?.name}
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              <Link
                to={ROUTES.EXPLORE}
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                Explore
              </Link>
              <Link
                to={ROUTES.COMMUNITY}
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                Community
              </Link>
              <Link
                to={ROUTES.ABOUT}
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                About
              </Link>
              {isAuthenticated && (
                <Link
                  to={ROUTES.SKETCHPAD}
                  className="flex w-full items-center rounded-md p-2 hover:underline"
                >
                  Sketchpad
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{' '}
              <a
                href="https://twitter.com/milesapp"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Miles
              </a>
              . The source code is available on{' '}
              <a
                href="https://github.com/milesapp/miles"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
