
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
    <section className="py-20 bg-hotel-lightBeige">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-subtitle">ACCOMMODATION</span>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Our Rooms
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Experience comfort and convenience with our Premium and Deluxe rooms,
            thoughtfully designed to ensure a relaxing stay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {rooms.map((room, index) => (
            <div 
              key={room.id}
              className="glass-card rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.error(`Failed to load image for ${room.name}`, e);
                    // Set a fallback image or color
                    e.currentTarget.src = "https://placehold.co/600x400/navy/white?text=Room+Image";
                  }}
                />
                <div className="absolute top-4 right-4 bg-hotel-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                  {room.price} / night
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2 text-hotel-navy">
                  {room.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {room.description}
                </p>
                <div className="mb-5">
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-hotel-beige px-2 py-1 rounded-full text-hotel-navy"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/rooms">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/rooms">
            <Button variant="primary" size="lg">
              View All Rooms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomPreview;
