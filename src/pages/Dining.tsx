
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Clock, Coffee, UtensilsCrossed } from 'lucide-react';

const Dining = () => {
  const mealOptions = [
    {
      category: 'Breakfast',
      time: '7:00 AM - 10:30 AM',
      icon: <Coffee className="h-10 w-10 text-hotel-gold" />,
      description: 'Start your day with our freshly prepared breakfast options, including South Indian and Continental choices.',
      items: [
        'South Indian Breakfast (Idli, Dosa, Vada)',
        'Continental Breakfast (Bread, Eggs, Cereals)',
        'Fresh Fruit Platters',
        'Tea, Coffee, and Fresh Juices'
      ],
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
    },
    {
      category: 'Lunch & Dinner',
      time: 'Lunch: 12:30 PM - 3:00 PM | Dinner: 7:00 PM - 10:30 PM',
      icon: <UtensilsCrossed className="h-10 w-10 text-hotel-gold" />,
      description: 'Enjoy a variety of local Kerala cuisine and North Indian dishes freshly prepared by our experienced chefs.',
      items: [
        'Kerala Meals with Rice and Curries',
        'North Indian Thali Options',
        'Vegetarian and Non-Vegetarian Specialties',
        'Fresh Seafood Dishes (based on availability)'
      ],
      image: 'https://images.unsplash.com/photo-1577303935007-0d306ee638cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
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
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-serif font-medium text-white mb-3">
            Dining Space
          </h1>
          <p className="text-white/80 max-w-2xl">
            Experience the flavors of Kerala and international cuisine in our comfortable dining area.
          </p>
        </div>
      </div>
      
      {/* Dining Area Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-subtitle">OUR DINING EXPERIENCE</span>
              <h2 className="section-title">
                Common Dining Area
              </h2>
              <p className="text-muted-foreground mb-6">
                Our hotel features a comfortable common dining area where guests can enjoy freshly prepared meals in a relaxed atmosphere. The dining space is designed to provide a pleasant setting for breakfast, lunch, and dinner.
              </p>
              <p className="text-muted-foreground mb-6">
                We take pride in serving authentic Kerala cuisine along with popular North Indian dishes and Continental options. Our experienced kitchen staff ensures that all meals are prepared with fresh ingredients and attention to quality.
              </p>
              
              <div className="flex items-center space-x-4 p-4 bg-hotel-beige/50 rounded-lg">
                <Clock className="h-6 w-6 text-hotel-gold" />
                <div>
                  <h3 className="font-medium text-hotel-navy">Dining Hours</h3>
                  <p className="text-sm text-muted-foreground">Open daily from 7:00 AM to 10:30 PM</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1652788613166-15a6972a43a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                alt="Manzil Lounge Dining Area"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Meal Options */}
      <section className="py-16 bg-hotel-lightBeige">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-subtitle">CULINARY OFFERINGS</span>
            <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
              Meal Options
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Explore our diverse menu options available throughout the day.
            </p>
          </div>
          
          <div className="space-y-12">
            {mealOptions.map((meal, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-hotel-beige"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className={`p-8 ${index % 2 !== 0 ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="mb-4">{meal.icon}</div>
                    <h3 className="text-2xl font-serif font-medium mb-2 text-hotel-navy">
                      {meal.category}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                      <Clock size={16} />
                      <span>{meal.time}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {meal.description}
                    </p>
                    
                    <h4 className="font-medium text-hotel-navy mb-3">Menu Highlights:</h4>
                    <ul className="space-y-2">
                      {meal.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-hotel-gold text-lg">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`h-72 lg:h-auto overflow-hidden ${index % 2 !== 0 ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <img 
                      src={meal.image} 
                      alt={meal.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Special Requests */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-hotel-beige/30 border border-hotel-beige p-8 rounded-lg">
            <h2 className="text-2xl font-serif font-medium mb-4 text-hotel-navy text-center">
              Special Dietary Requirements
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              We understand that guests may have specific dietary requirements or preferences. Our kitchen team is happy to accommodate special requests with advance notice.
            </p>
            <div className="text-center">
              <p className="font-medium text-hotel-navy">
                For special meal requests, please contact our reception at least 4 hours in advance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dining;
