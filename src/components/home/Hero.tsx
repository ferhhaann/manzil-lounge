
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Button from '../common/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroScene = lazy(() => import('../three/HeroScene'));

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/room1.jpg";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  const handleBookNow = () => {
    navigate('/booking');
  };

  const handleExploreRooms = () => {
    navigate('/rooms');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-hotel-navy/90 via-hotel-navy/70 to-hotel-navy/40 z-[1]"></div>
        
        {imageError ? (
          <div className="absolute inset-0 bg-hotel-navy"></div>
        ) : (
          <img 
            src="/lovable-uploads/room1.jpg"
            alt="Manzil Lounge Hotel" 
            className={`absolute inset-0 w-full h-full object-cover object-center ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
        )}
      </div>

      {/* 3D Scene overlay */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      
      <div className="container-custom relative z-10 flex flex-col justify-center min-h-screen px-4 pt-24 pb-12">
        <div className="max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium tracking-widest text-white/90 border border-hotel-gold/40 bg-hotel-gold/10 backdrop-blur-md rounded-full uppercase">
            2-Star Hotel near Kazhakoottom Railway Station
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4 sm:mb-6 leading-tight">
            Experience comfort and convenience at{' '}
            <span className="text-hotel-gold">Manzil Lounge</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-xl leading-relaxed">
            A clean, neat, and quiet atmosphere for travelers seeking comfort and convenience in Trivandrum. Your ideal home away from home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              variant="accent" 
              size={isMobile ? "sm" : "lg"} 
              className="group w-full sm:w-auto backdrop-blur-sm shadow-lg shadow-hotel-gold/20"
              onClick={handleBookNow}
            >
              Book Your Stay
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "lg"} 
              className="border-white/30 hover:bg-white/10 hover:border-white/50 text-white w-full sm:w-auto backdrop-blur-sm"
              onClick={handleExploreRooms}
            >
              Explore Rooms
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
          <span className="text-white/50 text-xs sm:text-sm mb-2 tracking-widest uppercase">Scroll Down</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-1 rounded-full bg-hotel-gold animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
