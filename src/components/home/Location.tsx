
import React from 'react';
import { MapPin, Train, Plane, Car } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Location = () => {
  const locationInfo = [
    {
      icon: <Train className="h-5 w-5" />,
      title: 'Railway Station',
      description: 'Just 2 minutes walk from Kazhakoottom Railway Station.'
    },
    {
      icon: <Plane className="h-5 w-5" />,
      title: 'Airport',
      description: 'Trivandrum International Airport is 15 km away (30 minutes drive).'
    },
    {
      icon: <Car className="h-5 w-5" />,
      title: 'City Center',
      description: 'Trivandrum city center is 12 km away (25 minutes drive).'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Tech Park',
      description: 'Technopark is just 5 minutes drive from the hotel.'
    }
  ];
  
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase border border-accent/30 bg-accent/10 text-accent rounded-full mb-5">
              Strategic Location
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6 text-primary-foreground leading-tight">
              Conveniently Located in{' '}
              <span className="text-accent">Kazhakoottom</span>
            </h2>
            <p className="text-primary-foreground/70 mb-10 text-lg leading-relaxed">
              Manzil Lounge offers the perfect blend of convenience and tranquility. Located near Kazhakoottom Railway Station, our hotel provides easy access to major transportation hubs and attractions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {locationInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-foreground mb-1">{item.title}</h3>
                    <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/location">
              <Button 
                variant="accent" 
                size="lg"
                className="shadow-lg shadow-accent/20"
              >
                Get Directions
              </Button>
            </Link>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10">
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
