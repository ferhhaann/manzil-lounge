
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would send this data to a server
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We'll get back to you shortly.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-hotel-gold" />,
      title: 'Phone',
      details: '+91 8089654380',
      action: 'tel:+918089654380'
    },
    {
      icon: <Mail className="h-6 w-6 text-hotel-gold" />,
      title: 'Email',
      details: 'loungeasmanzil@gmail.com',
      action: 'mailto:loungeasmanzil@gmail.com'
    },
    {
      icon: <MapPin className="h-6 w-6 text-hotel-gold" />,
      title: 'Address',
      details: 'Near Kazhakoottom Railway Station, Trivandrum, Kerala, India',
      action: 'https://goo.gl/maps/YYJk8j5YJ3CKGRVt7'
    },
    {
      icon: <Clock className="h-6 w-6 text-hotel-gold" />,
      title: 'Reception Hours',
      details: 'Open 24/7',
      action: '#'
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
            backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-serif font-medium text-white mb-3">
            Contact Us
          </h1>
          <p className="text-white/80 max-w-2xl">
            Get in touch with us for bookings, inquiries, or any assistance you might need.
          </p>
        </div>
      </div>
      
      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <a 
                key={index}
                href={info.action}
                target={info.action.startsWith('http') ? '_blank' : '_self'}
                rel={info.action.startsWith('http') ? 'noopener noreferrer' : ''}
                className="bg-white p-6 rounded-lg shadow-md border border-hotel-beige hover:border-hotel-gold transition-colors group"
              >
                <div className="mb-4 text-hotel-navy group-hover:text-hotel-gold transition-colors">
                  {info.icon}
                </div>
                <h3 className="text-xl font-serif font-medium mb-2 text-hotel-navy">
                  {info.title}
                </h3>
                <p className="text-muted-foreground">
                  {info.details}
                </p>
              </a>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div>
              <span className="section-subtitle">GET IN TOUCH</span>
              <h2 className="section-title mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-hotel-beige focus:outline-none focus:border-hotel-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-hotel-beige focus:outline-none focus:border-hotel-gold"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-hotel-beige focus:outline-none focus:border-hotel-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-hotel-beige focus:outline-none focus:border-hotel-gold"
                    >
                      <option value="">Select a subject</option>
                      <option value="Booking">Room Booking</option>
                      <option value="Inquiry">General Inquiry</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-hotel-beige focus:outline-none focus:border-hotel-gold"
                  ></textarea>
                </div>
                
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full sm:w-auto flex items-center justify-center"
                  type="submit"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* WhatsApp & Direct Contact */}
            <div>
              <div className="bg-hotel-lightBeige p-8 rounded-lg border border-hotel-beige mb-8">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-green-600">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-3 text-hotel-navy">
                      Connect on WhatsApp
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      For quick responses and real-time assistance, reach out to us on WhatsApp. Our team is ready to help you with your queries.
                    </p>
                    <a 
                      href="https://wa.me/8089654380" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md inline-flex items-center"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15782.815827475622!2d76.89872603049925!3d8.570976036861325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05beb825a14333%3A0x4ae71beeef9faf1!2sKazhakkoottam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1649320876851!5m2!1sen!2sin" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Manzil Lounge Location"
                  className="w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Contact Banner */}
      <section className="py-12 bg-hotel-navy">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4 text-white">
              Need Immediate Assistance?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our reception is available 24/7 to assist you with bookings, inquiries, or any support you might need.
            </p>
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Phone className="text-hotel-gold mr-3" />
              <span className="text-white font-medium text-lg">+91 8089654380</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
