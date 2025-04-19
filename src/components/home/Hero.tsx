import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = "/lovable-uploads/room1.jpg";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-hotel-navy/80 to-hotel-navy/40"></div>
        
        {imageError ? (
          <div className="absolute inset-0 bg-hotel-navy"></div>
        ) : (
          <img 
            src="public/lovable-uploads/room1.jpg"
            alt="Manzil Lounge Hotel" 
            className={`absolute inset-0 w-full h-full object-cover object-center ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 flex flex-col justify-center min-h-screen pt-24 pb-12">
        <div className="max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-white bg-hotel-gold/90 backdrop-blur-sm rounded-full">
            2-STAR HOTEL NEAR KAZHAKOOTTOM RAILWAY STATION
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-tight">
            Experience comfort and convenience at Manzil Lounge
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl">
            A clean, neat, and quiet atmosphere for travelers seeking comfort and convenience in Trivandrum. Your ideal home away from home.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="accent" 
              size="lg" 
              className="group"
            >
              Book Your Stay
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white hover:bg-white/10 text-white"
            >
              Explore Rooms
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
          <span className="text-white/70 text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
