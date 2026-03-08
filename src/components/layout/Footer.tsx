
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px]"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-5 flex items-center space-x-1 font-serif text-2xl">
              <span className="font-bold">Manzil</span>
              <span className="text-accent">Lounge</span>
            </div>
            <p className="text-primary-foreground/60 mb-6 leading-relaxed">
              A clean, neat, and quiet 2-star hotel offering comfortable accommodations near Kazhakoottom Railway Station in Trivandrum.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-accent/20 hover:border-accent/30 hover:text-accent transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/rooms', label: 'Rooms & Accommodation' },
                { to: '/dining', label: 'Dining Space' },
                { to: '/location', label: 'Location & Accessibility' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-primary-foreground/60 hover:text-accent transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: 'Near Kazhakoottom Railway Station, Trivandrum, Kerala, India' },
                { Icon: Phone, text: '+91 8089654380' },
                { Icon: Mail, text: 'loungeasmanzil@gmail.com' },
                { Icon: Clock, text: '24/7 Reception' }
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-accent" />
                  </div>
                  <span className="text-primary-foreground/60 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-6">Newsletter</h3>
            <p className="text-primary-foreground/60 mb-4 text-sm leading-relaxed">Subscribe to receive updates on our special offers and news.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3 bg-primary-foreground/5 text-primary-foreground rounded-xl border border-primary-foreground/10 focus:outline-none focus:border-accent/50 focus:bg-primary-foreground/10 transition-all duration-300 text-sm placeholder:text-primary-foreground/30"
              />
              <button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg shadow-accent/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/40 text-sm">&copy; {currentYear} Manzil Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
