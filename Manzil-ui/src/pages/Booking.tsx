'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DatePickerWithRange } from '@/components/booking/DateRangePicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '',
    dateRange: {
      from: '',
      to: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const inputClass =
    'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-gold focus:border-hotel-gold';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoomSelect = (room: string) => {
    setFormData({ ...formData, roomType: room });
  };

  const handleDateChange = (range: any) => {
    setFormData({
      ...formData,
      dateRange: {
        from: range.from,
        to: range.to,
      },
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const { from, to } = formData.dateRange;
  
    if (!from || !to) {
      toast.error('Please select both check-in and check-out dates.');
      return;
    }
  
    const phoneValid = /^\+\d{10,15}$/.test(formData.phone);
    if (!phoneValid) {
      toast.error('Phone number must include country code and contain only digits (e.g. +919876543210)');
      return;
    }
  
    setLoading(true); // Start loading
  
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      roomType: formData.roomType,
      checkin: new Date(from).toLocaleDateString('en-GB'),
      checkout: new Date(to).toLocaleDateString('en-GB'),
    };
  
    emailjs
      .send(
        'service_veymaee',
        'template_yqcq86p',
        templateParams,
        'to2m0kTtNdkXyBlep'
      )
      .then(() => {
        toast.success('Booking enquiry sent to hotel!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          roomType: '',
          dateRange: { from: '', to: '' },
        });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        toast.error('Failed to send booking email.');
      })
      .finally(() => setLoading(false)); // Stop loading
  };
  

  const handleWhatsApp = () => {
    const { from, to } = formData.dateRange;

    if (!from || !to) {
      toast.error('Please select both check-in and check-out dates.');
      return;
    }

    const phoneValid = /^\+\d{10,15}$/.test(formData.phone);
    if (!phoneValid) {
      toast.error('Phone number must include country code and contain only digits.');
      return;
    }

    const message = `Booking Enquiry:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Room Type: ${formData.roomType}
Check-in: ${new Date(from).toLocaleDateString('en-GB')}
Check-out: ${new Date(to).toLocaleDateString('en-GB')}
`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918089654380?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-12 bg-hotel-navy relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/lovable-uploads/room1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-serif font-medium text-white mb-3">Book Your Stay</h1>
          <p className="text-white/80 max-w-2xl">Select your room and dates to complete your booking.</p>
        </div>
      </div>

      <section className="py-16 bg-hotel-lightBeige">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Please fill out your details and submit the enquiry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (e.g. +919876543210)"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\+?\d*$/.test(value)) {
                        setFormData({ ...formData, phone: value });
                      }
                    }}
                    pattern="^\+\d{10,15}$"
                    title="Phone number must start with country code (e.g. +91) and contain only numbers"
                    className={inputClass}
                  />
                </div>

                <DatePickerWithRange onChange={handleDateChange} />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Room Type</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div
                      onClick={() => handleRoomSelect('Premium Room')}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.roomType === 'Premium Room' ? 'border-hotel-gold' : ''
                      }`}
                    >
                      <h4 className="font-medium text-hotel-navy">Premium Room</h4>
                      <p className="text-sm text-muted-foreground mb-2">Spacious retreat with enhanced amenities</p>
                      <p className="text-hotel-navy font-medium">₹1,999 / night</p>
                    </div>
                    <div
                      onClick={() => handleRoomSelect('Deluxe Room')}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.roomType === 'Deluxe Room' ? 'border-hotel-gold' : ''
                      }`}
                    >
                      <h4 className="font-medium text-hotel-navy">Deluxe Room</h4>
                      <p className="text-sm text-muted-foreground mb-2">Cozy and comfortable space</p>
                      <p className="text-hotel-navy font-medium">₹1,699 / night</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-hotel-navy text-white px-6 py-2 rounded-lg transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-hotel-gold'
                  }`}
                >
                  {loading ? 'Sending...' : 'Submit Enquiry (Email)'}
                </button>


                <div className="text-center text-sm text-muted-foreground mt-2">— or —</div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.52 3.48A11.72 11.72 0 0012.03.5a11.52 11.52 0 00-9.92 17.31L.5 23.5l5.79-1.54A11.52 11.52 0 0012.03 23.5a11.72 11.72 0 008.49-20.02zM12.03 21a9.51 9.51 0 01-5.13-1.5l-.37-.23-3.43.9.91-3.35-.24-.35A9.55 9.55 0 1112.03 21zm5.46-7.32c-.3-.15-1.76-.87-2.04-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07s-1.27-.47-2.42-1.5c-.9-.8-1.5-1.78-1.68-2.08s-.02-.45.13-.6c.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.07-.15-.68-1.62-.93-2.22-.24-.57-.49-.5-.68-.5s-.38-.02-.58-.02c-.2 0-.53.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.23 3.1c.15.2 2.09 3.2 5.08 4.48.71.3 1.26.47 1.69.6.71.22 1.35.19 1.86.12.57-.08 1.76-.72 2-1.42.24-.7.24-1.3.17-1.42-.07-.12-.26-.2-.56-.35z" />
                    </svg>
                    Book via WhatsApp
                  </button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
