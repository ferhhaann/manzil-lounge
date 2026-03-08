
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { ArrowRight } from 'lucide-react';

const RoomPreview = () => {
  const rooms = [
    {
      id: 'premium',
      name: 'Premium Room',
      description: 'Spacious and comfortable premium rooms featuring modern amenities and elegant decor.',
      image: '/lovable-uploads/room1.jpg',
      price: '₹1,999',
      features: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Room Service']
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Cozy and affordable deluxe rooms perfect for travelers seeking comfort and value.',
      image: '/lovable-uploads/room2.jpg',
      price: '₹1,699',
      features: ['Free WiFi', 'Air Conditioning', 'LED TV', 'Room Service']
    }
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase border border-accent/30 bg-accent/5 text-accent rounded-full mb-4">
            Accommodation
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
            Our Rooms
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Experience comfort and convenience with our Premium and Deluxe rooms,
            thoughtfully designed to ensure a relaxing stay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400/navy/white?text=Room+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 px-4 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-sm font-medium tracking-wide">
                  {room.price} / night
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-serif font-medium mb-3 text-foreground">
                  {room.name}
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {room.description}
                </p>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border/50 font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/rooms">
                  <Button 
                    variant="outline" 
                    size="md" 
                    className="w-full group/btn border-primary/20 hover:border-primary"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/rooms">
            <Button variant="accent" size="lg" className="shadow-lg shadow-accent/20">
              View All Rooms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomPreview;
