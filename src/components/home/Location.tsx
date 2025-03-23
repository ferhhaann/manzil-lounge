
import React from 'react';
import { MapPin, Train, Plane, Car } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Location = () => {
  const locationInfo = [
    {
      icon: <Train className="h-6 w-6 text-hotel-gold" />,
      title: 'Railway Station',
      description: 'Just 2 minutes walk from Kazhakoottom Railway Station.'
    },
    {
      icon: <Plane className="h-6 w-6 text-hotel-gold" />,
      title: 'Airport',
      description: 'Trivandrum International Airport is 15 km away (30 minutes drive).'
    },
    {
      icon: <Car className="h-6 w-6 text-hotel-gold" />,
      title: 'City Center',
      description: 'Trivandrum city center is 12 km away (25 minutes drive).'
    },
    {
      icon: <MapPin className="h-6 w-6 text-hotel-gold" />,
      title: 'Tech Park',
      description: 'Technopark is just 5 minutes drive from the hotel.'
    }
  ];
  
  return (
    <section className="py-20 bg-hotel-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm uppercase tracking-wider text-hotel-gold font-medium mb-2 inline-block">
              STRATEGIC LOCATION
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-white">
              Conveniently Located in Kazhakoottom
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Manzil Lounge offers the perfect blend of convenience and tranquility. Located near Kazhakoottom Railway Station, our hotel provides easy access to major transportation hubs and attractions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {locationInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/location">
              <Button 
                variant="accent" 
                size="lg"
              >
                Get Directions
              </Button>
            </Link>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15782.815827475622!2d76.89872603049925!3d8.570976036861325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05beb825a14333%3A0x4ae71beeef9faf1!2sKazhakkoottam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1649320876851!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Manzil Lounge Location"
              className="w-full h-96 lg:h-full min-h-[350px]"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
