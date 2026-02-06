import { ReactNode } from 'react';
import Logo from '../branding/Logo';
import { Button } from '@/components/ui/button';
import { Search, Settings, Heart } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  currentPage: 'search' | 'settings';
  onNavigate: (page: 'search' | 'settings') => void;
}

export default function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Logo size={48} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DeltaV3</h1>
              <p className="text-xs text-muted-foreground">.org</p>
            </div>
          </div>
          <nav className="flex gap-2">
            <Button
              variant={currentPage === 'search' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('search')}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button
              variant={currentPage === 'settings' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('settings')}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>

      <footer className="border-t border-border/50 bg-card/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2026. Built with <Heart className="h-4 w-4 fill-primary text-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
