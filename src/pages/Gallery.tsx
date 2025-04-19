
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const galleryImages = [
    // Exterior
    {
      category: 'Exterior',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Hotel Exterior View',
          description: 'Front view of Manzil Lounge'
        },
        {
          src: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Hotel Entrance',
          description: 'Welcoming entrance of our hotel'
        },
        {
          src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
          alt: 'Hotel Building',
          description: 'The elegant exterior architecture'
        }
      ]
    },
    // Rooms
    {
      category: 'Rooms',
      images: [
        {
          src: '/lovable-uploads/room1.png',
          alt: 'Premium Room',
          description: 'Our spacious Premium Room'
        },
        {
          src: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Deluxe Room',
          description: 'Comfortable Deluxe Room'
        },
        {
          src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Room Interior',
          description: 'Elegantly designed interiors'
        },
        {
          src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Bathroom',
          description: 'Modern and clean bathroom'
        }
      ]
    },
    // Dining
    {
      category: 'Dining',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1652788613166-15a6972a43a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
          alt: 'Dining Area',
          description: 'Common dining area'
        },
        {
          src: 'https://images.unsplash.com/photo-1577303935007-0d306ee638cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Food Serving',
          description: 'Delicious meals served daily'
        },
        {
          src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Breakfast Spread',
          description: 'Our breakfast options'
        }
      ]
    },
    // Amenities
    {
      category: 'Amenities',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Reception',
          description: '24/7 reception desk'
        },
        {
          src: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
          alt: 'Lobby',
          description: 'Comfortable lobby area'
        },
        {
          src: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          alt: 'Parking',
          description: 'Free parking facility'
        }
      ]
    }
  ];
  
  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-24 pb-12 bg-hotel-navy relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-serif font-medium text-white mb-3">
            Photo Gallery
          </h1>
          <p className="text-white/80 max-w-2xl">
            Explore our hotel through images showcasing our rooms, facilities, and ambiance.
          </p>
        </div>
      </div>
      
      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {galleryImages.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <h2 className="section-title mb-8">
                {category.category}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className="overflow-hidden rounded-lg shadow-md border border-hotel-beige group cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1"
                    onClick={() => openLightbox(image.src)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white font-medium">{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-hotel-gold"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
