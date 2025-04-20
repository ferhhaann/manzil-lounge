
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hotel-navy text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <div className="mb-4 flex items-center space-x-2 font-serif text-2xl">
              <span className="font-bold">Manzil</span>
              <span className="text-hotel-gold">Lounge</span>
            </div>
            <p className="text-white/80 mb-4">
              A clean, neat, and quiet 2-star hotel offering comfortable accommodations near Kazhakoottom Railway Station in Trivandrum.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 pb-2 border-b border-white/20">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Rooms & Accommodation
                </Link>
              </li>
              <li>
                <Link to="/dining" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Dining Space
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Location & Accessibility
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 pb-2 border-b border-white/20">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-hotel-gold mt-1 flex-shrink-0" />
                <span className="text-white/80">Near Kazhakoottom Railway Station, Trivandrum, Kerala, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-hotel-gold flex-shrink-0" />
                <span className="text-white/80">+91 8089654380</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-hotel-gold flex-shrink-0" />
                <span className="text-white/80">loungeasmanzil@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock size={18} className="text-hotel-gold flex-shrink-0" />
                <span className="text-white/80">24/7 Reception</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 pb-2 border-b border-white/20">Newsletter</h3>
            <p className="text-white/80 mb-3">Subscribe to receive updates on our special offers and news.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/20 focus:outline-none focus:border-hotel-gold"
              />
              <button 
                type="submit" 
                className="w-full bg-hotel-gold hover:bg-opacity-90 text-white py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-white/60 text-sm">
          <p>&copy; {currentYear} Manzil Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
