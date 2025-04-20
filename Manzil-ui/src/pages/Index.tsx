
import React from 'react';
import Hero from '@/components/home/Hero';
import RoomPreview from '@/components/home/RoomPreview';
import Amenities from '@/components/home/Amenities';
import Location from '@/components/home/Location';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <RoomPreview />
      <Amenities />
      <Location />
      <Footer />
    </div>
  );
};

export default Index;
