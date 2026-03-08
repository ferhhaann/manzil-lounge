
import React from 'react';
import { Wifi, Car, Coffee, Clock, Shield, Wind } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    {
      icon: <Wifi className="h-8 w-8" />,
      title: 'Free WiFi',
      description: 'Stay connected with complimentary high-speed WiFi throughout the hotel premises.'
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Free Parking',
      description: 'Convenient on-site parking available for all our guests at no additional cost.'
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: 'Dining Area',
      description: 'Enjoy meals in our common dining area with a variety of local and continental options.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Reception',
      description: 'Our reception desk is available around the clock to assist with your needs.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security',
      description: 'Rest easy with our enhanced security measures ensuring a safe stay.'
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: 'Air Conditioning',
      description: 'All rooms are equipped with air conditioning for your comfort in any weather.'
    }
  ];
  
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase border border-accent/30 bg-accent/5 text-accent rounded-full mb-4">
            Facilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
            Hotel Amenities
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Enjoy a range of amenities designed to enhance your stay and provide convenience and comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-border/50 bg-card hover:bg-secondary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                {amenity.icon}
              </div>
              <h3 className="text-xl font-serif font-medium mb-3 text-foreground">
                {amenity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
