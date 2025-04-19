
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    setIsOpen(false);
  };
  
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-serif text-2xl text-hotel-navy z-50"
        >
          <span className="font-bold">Manzil</span>
          <span className="text-hotel-gold">Lounge</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  'nav-link',
                  isActive(link.path) && 'nav-link-active'
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
          >
            Book Now
          </Button>
        </div>
        
        <button 
          className="md:hidden text-hotel-navy z-50" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div 
        className={cn(
          'md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out pt-20',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: 'white', opacity: 1 }} // Explicitly setting background color and opacity
      >
        <div className="container-custom px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'text-lg py-2 px-4 rounded-md transition-colors',
                isActive(link.path)
                  ? 'bg-hotel-beige text-hotel-navy font-medium'
                  : 'text-muted-foreground hover:bg-hotel-beige hover:text-hotel-navy'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button 
              variant="accent" 
              size="lg" 
              onClick={handleBookNow}
              className="w-full"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
