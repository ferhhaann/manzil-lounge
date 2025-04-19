
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DatePickerWithRange } from '@/components/booking/DateRangePicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Booking = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
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
          <h1 className="text-4xl font-serif font-medium text-white mb-3">
            Book Your Stay
          </h1>
          <p className="text-white/80 max-w-2xl">
            Select your room and dates to complete your booking.
          </p>
        </div>
      </div>
      
      {/* Booking Form Section */}
      <section className="py-16 bg-hotel-lightBeige">
        <div className="container-custom max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Please select your check-in and check-out dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <DatePickerWithRange />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Room Type</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-hotel-gold transition-colors">
                    <h4 className="font-medium text-hotel-navy">Premium Room</h4>
                    <p className="text-sm text-muted-foreground mb-2">Spacious retreat with enhanced amenities</p>
                    <p className="text-hotel-navy font-medium">₹1,999 <span className="text-sm text-muted-foreground">/ night</span></p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-hotel-gold transition-colors">
                    <h4 className="font-medium text-hotel-navy">Deluxe Room</h4>
                    <p className="text-sm text-muted-foreground mb-2">Cozy and comfortable space</p>
                    <p className="text-hotel-navy font-medium">₹1,699 <span className="text-sm text-muted-foreground">/ night</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Booking;
