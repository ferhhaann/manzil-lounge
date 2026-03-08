
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Train, Plane, Car, Building, Navigation, Clock } from 'lucide-react';
import Button from '@/components/common/Button';

const Location = () => {
  const nearbyAttractions = [
    {
      name: 'Technopark',
      distance: '2 km (5 min drive)',
      icon: <Building className="h-6 w-6 text-hotel-gold" />
    },
    {
      name: 'Kovalam Beach',
      distance: '15 km (30 min drive)',
      icon: <Navigation className="h-6 w-6 text-hotel-gold" />
    },
    {
      name: 'Padmanabhaswamy Temple',
      distance: '12 km (25 min drive)',
      icon: <Building className="h-6 w-6 text-hotel-gold" />
    },
    {
      name: 'Napier Museum',
      distance: '10 km (20 min drive)',
      icon: <Building className="h-6 w-6 text-hotel-gold" />
    }
  ];
  
  const transportInfo = [
    {
      icon: <Train className="h-10 w-10 text-hotel-gold" />,
      title: 'By Train',
      description: 'We are just 2 minutes walk from Kazhakoottom Railway Station, making it extremely convenient for train travelers.',
      directions: 'Exit the station, turn right and walk 100 meters. The hotel will be visible on your left side.'
    },
    {
      icon: <Plane className="h-10 w-10 text-hotel-gold" />,
      title: 'By Air',
      description: 'Trivandrum International Airport is 15 km away (approximately 30 minutes drive).',
      directions: 'Taxis and ride-sharing services are readily available at the airport. We can also arrange airport pickup with advance notice.'
    },
    {
      icon: <Car className="h-10 w-10 text-hotel-gold" />,
      title: 'By Road',
      description: 'The hotel is easily accessible from NH66 (formerly NH47) that connects major cities in Kerala.',
      directions: 'From Trivandrum city, take the NH66 towards Kollam and follow signs for Kazhakoottom. The hotel is near the railway station.'
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
            backgroundImage: `url('https://images.unsplash.com/photo-1588411393236-d2524cca2184?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-serif font-medium text-white mb-3">
            Location & Accessibility
          </h1>
          <p className="text-white/80 max-w-2xl">
            Strategically located near Kazhakoottom Railway Station for easy access and convenience.
          </p>
        </div>
      </div>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-subtitle">FIND US</span>
            <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
              Our Location
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Located in the vibrant area of Kazhakoottom, our hotel offers convenient access to transportation, business centers, and tourist attractions.
            </p>
            
            <div className="bg-hotel-beige/30 inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8">
              <MapPin size={18} className="text-hotel-gold" />
              <span className="font-medium">Near Kazhakoottom Railway Station, Trivandrum, Kerala, India</span>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg border border-hotel-beige mb-12">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15782.815827475622!2d76.89872603049925!3d8.570976036861325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05beb825a14333%3A0x4ae71beeef9faf1!2sKazhakkoottam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1649320876851!5m2!1sen!2sin" 
              width="100%" 
              height="500" 
              style={{ border: 0 }}
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Manzil Lounge Location"
              className="w-full"
            ></iframe>
          </div>
          
          <div className="text-center">
            <Button 
              variant="accent" 
              size="lg" 
              onClick={() => window.open('https://goo.gl/maps/YYJk8j5YJ3CKGRVt7', '_blank')}
            >
              Get Directions on Google Maps
            </Button>
          </div>
        </div>
      </section>
      
      {/* Transportation Options */}
      <section className="py-16 bg-hotel-lightBeige">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-subtitle">HOW TO REACH</span>
            <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
              Getting Here
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Multiple convenient transportation options to reach our hotel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transportInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md border border-hotel-beige"
              >
                <div className="mb-4">{info.icon}</div>
                <h3 className="text-xl font-serif font-medium mb-3 text-hotel-navy">
                  {info.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {info.description}
                </p>
                <div className="bg-hotel-beige/30 p-4 rounded-lg">
                  <h4 className="font-medium text-hotel-navy mb-2 flex items-center">
                    <Navigation size={16} className="mr-2" />
                    Directions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {info.directions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nearby Attractions */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-subtitle">EXPLORE AROUND</span>
              <h2 className="section-title">
                Nearby Attractions
              </h2>
              <p className="text-muted-foreground mb-8">
                Our strategic location provides easy access to various tourist attractions, business centers, and entertainment options in and around Trivandrum.
              </p>
              
              <div className="space-y-4">
                {nearbyAttractions.map((attraction, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 border border-hotel-beige rounded-lg hover:border-hotel-gold transition-colors"
                  >
                    <div className="mt-1">{attraction.icon}</div>
                    <div>
                      <h3 className="font-medium text-hotel-navy">{attraction.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={14} className="mr-1" />
                        <span>{attraction.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1580745924772-f2bed4b1c502?ixlib=rb-4.0.3&auto=format&fit=crop&w=1324&q=80" 
                alt="Nearby attractions in Trivandrum"
                className="w-full rounded-lg shadow-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1585538617950-6d5b31515c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                  alt="Kovalam Beach"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="https://images.unsplash.com/photo-1518080614899-98fc14f78337?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                  alt="Padmanabhaswamy Temple"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Location;
