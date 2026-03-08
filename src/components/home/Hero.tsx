
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Button from '../common/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroScene = lazy(() => import('../three/HeroScene'));
const RoomAnimationScene = lazy(() => import('../three/RoomAnimationScene'));

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const roomScale = useTransform(scrollY, [0, 300], [0.5, 1]);
  const roomOpacity = useTransform(scrollY, [100, 400], [0, 1]);
  const roomY = useTransform(scrollY, [0, 400], [100, 0]);

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
    <>
      {/* Hero Section with 3D Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 z-0 bg-hotel-navy">
          {imageError ? null : (
            <img 
              src="/lovable-uploads/room1.jpg"
              alt="Manzil Lounge Hotel" 
              className={`absolute inset-0 w-full h-full object-cover object-center ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
              style={{ transition: 'opacity 0.5s ease-in-out' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-hotel-navy/95 via-hotel-navy/80 to-hotel-navy/60"></div>
        </div>

        {/* 3D Parallax Scene */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-[1]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>
        
        {/* Hero Content */}
        <div className="container-custom relative z-10 flex flex-col justify-center min-h-screen px-4 pt-24 pb-12">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
          </motion.div>
          
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
            <span className="text-white/50 text-xs sm:text-sm mb-2 tracking-widest uppercase">Scroll Down</span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-white/20 flex justify-center pt-2">
              <div className="w-1 h-1 rounded-full bg-hotel-gold animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Room Animation Section - Appears on Scroll */}
      <motion.div 
        className="relative h-[80vh] bg-hotel-navy overflow-hidden"
        style={{ y: roomY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-hotel-navy via-hotel-navy/95 to-hotel-navy"></div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: roomOpacity, scale: roomScale }}
        >
          <div className="w-full h-full max-w-5xl mx-auto">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-hotel-gold/30 border-t-hotel-gold rounded-full animate-spin"></div>
              </div>
            }>
              <RoomAnimationScene />
            </Suspense>
          </div>
        </motion.div>

        {/* Section content */}
        <div className="absolute bottom-12 left-0 right-0 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase border border-hotel-gold/30 bg-hotel-gold/5 text-hotel-gold rounded-full mb-4">
              Virtual Room Preview
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">
              Step Into Your Room
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              Experience our thoughtfully designed spaces before you arrive
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
