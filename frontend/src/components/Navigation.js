import { Link, useLocation } from "react-router-dom";
import { Home, Wand2, Grid3X3, Image as ImageIcon } from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav 
      className="sticky top-0 z-40 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 border-b border-border"
      data-testid="primary-nav"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[Fredoka] text-foreground">ColorCraft</span>
          </Link>
          
          <div className="flex gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-[hsl(var(--primary))] text-white' 
                  : 'text-foreground hover:bg-muted'
              }`}
              data-testid="nav-home"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/generate"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/generate') 
                  ? 'bg-[hsl(var(--primary))] text-white' 
                  : 'text-foreground hover:bg-muted'
              }`}
              data-testid="nav-generate"
            >
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">Generate</span>
            </Link>
            <Link
              to="/templates"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/templates') 
                  ? 'bg-[hsl(var(--primary))] text-white' 
                  : 'text-foreground hover:bg-muted'
              }`}
              data-testid="nav-templates"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </Link>
            <Link
              to="/gallery"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/gallery') 
                  ? 'bg-[hsl(var(--primary))] text-white' 
                  : 'text-foreground hover:bg-muted'
              }`}
              data-testid="nav-gallery"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}