
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { Wifi, Tv, Wind, Coffee, ShowerHead, Users } from 'lucide-react';

const Rooms = () => {
  const rooms = [
    {
      id: 'premium',
      name: 'Premium Room',
      description: 'Our Premium Rooms offer a spacious retreat with enhanced amenities and elegant furnishings. Each room features a comfortable queen-sized bed, work desk, and additional seating area to ensure a relaxing and productive stay.',
      images: [
        '/lovable-uploads/cfa89f90-5c91-405b-a97c-694cf32bb17c.png',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
      ],
      price: '₹1,999',
      count: 4,
      size: '320 sq ft',
      capacity: '2 Adults',
      amenities: [
        { name: 'Free WiFi', icon: <Wifi size={18} /> },
        { name: 'Air Conditioning', icon: <Wind size={18} /> },
        { name: '32" LED TV', icon: <Tv size={18} /> },
        { name: 'Tea/Coffee Maker', icon: <Coffee size={18} /> },
        { name: 'Premium Bathroom', icon: <ShowerHead size={18} /> },
        { name: 'Queen-sized Bed', icon: <Users size={18} /> }
      ]
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Our Deluxe Rooms provide a cozy and comfortable space with all essential amenities. Featuring a double bed, private bathroom, and work area, these rooms are perfect for travelers seeking value without compromising on comfort.',
      images: [
        '/lovable-uploads/065161ab-6fd6-4e2b-b1ae-7820a8533267.png',
        'https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80'
      ],
      price: '₹1,699',
      count: 10,
      size: '280 sq ft',
      capacity: '2 Adults',
      amenities: [
        { name: 'Free WiFi', icon: <Wifi size={18} /> },
        { name: 'Air Conditioning', icon: <Wind size={18} /> },
        { name: '24" LED TV', icon: <Tv size={18} /> },
        { name: 'Private Bathroom', icon: <ShowerHead size={18} /> }
      ]
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-24 pb-12 bg-hotel-navy relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-serif font-medium text-white mb-3">
            Our Rooms
          </h1>
          <p className="text-white/80 max-w-2xl">
            Choose from our selection of Premium and Deluxe rooms, designed for comfort and convenience.
          </p>
        </div>
      </div>
      
      {/* Rooms Section */}
      <section className="py-16 bg-hotel-lightBeige">
        <div className="container-custom">
          <div className="space-y-16">
            {rooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-hotel-beige"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 order-2 lg:order-1">
                    <div className="space-y-6">
                      <div>
                        <span className="text-sm uppercase tracking-wider text-hotel-gold font-medium mb-1 inline-block">
                          {room.count} Rooms Available
                        </span>
                        <h2 className="text-2xl md:text-3xl font-serif font-medium mb-3 text-hotel-navy">
                          {room.name}
                        </h2>
                        <p className="text-muted-foreground">
                          {room.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-hotel-beige rounded p-3">
                          <span className="text-sm text-muted-foreground">Room Size</span>
                          <p className="font-medium text-hotel-navy">{room.size}</p>
                        </div>
                        <div className="border border-hotel-beige rounded p-3">
                          <span className="text-sm text-muted-foreground">Capacity</span>
                          <p className="font-medium text-hotel-navy">{room.capacity}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {room.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <span className="text-hotel-gold">{amenity.icon}</span>
                              <span className="text-sm">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-hotel-beige">
                        <div>
                          <span className="text-sm text-muted-foreground">Starting from</span>
                          <p className="text-xl font-medium text-hotel-navy">{room.price} <span className="text-sm text-muted-foreground">/ night</span></p>
                        </div>
                        <Button variant="accent">Book Now</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-72 lg:h-auto overflow-hidden order-1 lg:order-2">
                    <img 
                      src={room.images[0]} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Booking Policy */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2 mb-8">
              Booking Information
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-hotel-beige">
                <h3 className="text-xl font-medium mb-3 text-hotel-navy">Check-in & Check-out</h3>
                <p className="text-muted-foreground mb-2">
                  • Check-in time: 12:00 PM (Early check-in subject to availability)
                </p>
                <p className="text-muted-foreground">
                  • Check-out time: 11:00 AM (Late check-out available on request for an additional fee)
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-hotel-beige">
                <h3 className="text-xl font-medium mb-3 text-hotel-navy">Reservation & Cancellation</h3>
                <p className="text-muted-foreground mb-2">
                  • Advance booking is recommended, especially during peak seasons.
                </p>
                <p className="text-muted-foreground mb-2">
                  • Free cancellation up to 24 hours before check-in.
                </p>
                <p className="text-muted-foreground">
                  • Late cancellation or no-show will incur a charge equivalent to one night's stay.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-hotel-beige">
                <h3 className="text-xl font-medium mb-3 text-hotel-navy">Payment Methods</h3>
                <p className="text-muted-foreground">
                  We accept cash, all major credit/debit cards, and digital payment methods including UPI, Google Pay, and PayTM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Rooms;
