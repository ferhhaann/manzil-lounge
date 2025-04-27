
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
    // { name: 'Dining', path: '/dining' },
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
      <nav style={{ backgroundColor: !scrolled ? '#fff' : '' }}
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
            <img src="/lovable-uploads/newlogo.png" alt="logo" style={{height:'50px', width:'auto'}}/>
            {/* <span className="font-bold">Manzil</span>
            <span className="text-hotel-gold">Lounge</span> */}
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
