
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Button from '../common/Button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Location', path: '/location' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const handleBookNow = () => {
    navigate('/booking');
    closeMenu();
  };
  
  return (
    <>
      <nav 
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500',
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50 py-3' 
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-1 font-serif text-2xl z-50"
          >
            <span className={cn("font-bold transition-colors duration-300", scrolled ? "text-foreground" : "text-white")}>Manzil</span>
            <span className="text-accent">Lounge</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                    scrolled 
                      ? isActive(link.path) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      : isActive(link.path)
                        ? 'bg-white/20 text-white backdrop-blur-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button 
              variant="accent" 
              size="md" 
              onClick={handleBookNow}
              className="shadow-lg shadow-accent/20 rounded-full"
            >
              Book Now
            </Button>
          </div>
          
          <button 
            className={cn(
              "md:hidden z-50 p-2 rounded-full transition-colors",
              scrolled ? "text-foreground" : "text-white"
            )}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isOpen}
        onClose={closeMenu}
        navLinks={navLinks}
        isActive={isActive}
        onBookNow={handleBookNow}
      />
    </>
  );
};

export default Navbar;
