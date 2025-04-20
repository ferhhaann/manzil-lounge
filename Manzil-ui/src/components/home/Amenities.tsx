
import React from 'react';
import { Wifi, Car, Coffee, Clock, Shield, Wind } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    {
      icon: <Wifi className="h-10 w-10 text-hotel-gold" />,
      title: 'Free WiFi',
      description: 'Stay connected with complimentary high-speed WiFi throughout the hotel premises.'
    },
    {
      icon: <Car className="h-10 w-10 text-hotel-gold" />,
      title: 'Free Parking',
      description: 'Convenient on-site parking available for all our guests at no additional cost.'
    },
    {
      icon: <Coffee className="h-10 w-10 text-hotel-gold" />,
      title: 'Dining Area',
      description: 'Enjoy meals in our common dining area with a variety of local and continental options.'
    },
    {
      icon: <Clock className="h-10 w-10 text-hotel-gold" />,
      title: '24/7 Reception',
      description: 'Our reception desk is available around the clock to assist with your needs.'
    },
    {
      icon: <Shield className="h-10 w-10 text-hotel-gold" />,
      title: 'Security',
      description: 'Rest easy with our enhanced security measures ensuring a safe stay.'
    },
    {
      icon: <Wind className="h-10 w-10 text-hotel-gold" />,
      title: 'Air Conditioning',
      description: 'All rooms are equipped with air conditioning for your comfort in any weather.'
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-subtitle">FACILITIES</span>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Hotel Amenities
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Enjoy a range of amenities designed to enhance your stay and provide convenience and comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border border-hotel-beige hover:border-hotel-gold transition-all duration-300 hover:shadow-md bg-white"
            >
              <div className="mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-serif font-medium mb-2 text-hotel-navy">
                {amenity.title}
              </h3>
              <p className="text-muted-foreground">
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
