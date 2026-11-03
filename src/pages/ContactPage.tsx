import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Please provide a valid email address';
    if (!phone.trim() || phone.trim().length < 9) newErrors.phone = 'Please provide a valid telephone number';
    if (!message.trim() || message.trim().length < 10) newErrors.message = 'Please enter a message (at least 10 characters)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="w-full pb-20">
      {/* Header Banner with Salon Parlour Interior Backdrop */}
      <section className="relative bg-gradient-to-b from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] text-[#241E1A] border-b border-[#E6DDD1] py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80"
            alt="Maison Élan Atelier Concierge"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold block">
            Atelier Enquiries · Direct Salon Host
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#241E1A] font-normal tracking-tight">
            Contact & Location
          </h1>
          <p className="text-sm sm:text-base text-[#7D7368] max-w-xl mx-auto leading-relaxed">
            Whether inquiring about wedding bookings, custom color consultations, or multi-ritual reservations, our atelier desk is at your service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & Salon Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
                Visit & Connect
              </span>
              <h2 className="font-editorial text-3xl text-[#29241F] font-normal">
                Maison Élan Atelier
              </h2>
              <p className="text-xs sm:text-sm text-[#82796F] mt-2 leading-relaxed">
                Nestled on luxury promenade with private valet parking and discrete entrance.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 text-xs sm:text-sm text-[#29241F]">
              <div className="p-4 bg-white border border-[#EAE5DC] flex items-start gap-3.5 shadow-xs">
                <MapPin className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#29241F]">Salon Address</h3>
                  <p className="text-[#82796F] mt-0.5">{SALON_INFO.address}</p>
                  <p className="text-[11px] text-[#B59A72] mt-1 font-mono">Quarter 4, Luxury Promenade</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#EAE5DC] flex items-start gap-3.5 shadow-xs">
                <Phone className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-semibold text-[#29241F]">Direct Telephone</h3>
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="text-[#82796F] hover:text-[#29241F] font-mono mt-0.5 block"
                  >
                    {SALON_INFO.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-[#82796F] block mt-1">Direct line to salon host</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#EAE5DC] flex items-start gap-3.5 shadow-xs">
                <MessageCircle className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-semibold text-[#29241F]">WhatsApp Concierge</h3>
                  <p className="text-[#82796F] font-mono mt-0.5">{SALON_INFO.phoneDisplay}</p>
                  <a
                    href={SALON_INFO.whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#B59A72] font-semibold uppercase tracking-wider mt-1 hover:underline"
                  >
                    <span>Instant WhatsApp Chat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#EAE5DC] flex items-start gap-3.5 shadow-xs">
                <Mail className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#29241F]">Electronic Mail</h3>
                  <a
                    href={`mailto:${SALON_INFO.email}`}
                    className="text-[#82796F] hover:text-[#29241F] font-mono mt-0.5 block"
                  >
                    {SALON_INFO.email}
                  </a>
                  <span className="text-[11px] text-[#82796F] block mt-1">General & press enquiries</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#EAE5DC] flex items-start gap-3.5 shadow-xs">
                <Clock className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#29241F]">Opening Hours</h3>
                  <p className="text-[#82796F] mt-0.5">{SALON_INFO.hoursWeekday}</p>
                  <p className="text-[#82796F] text-xs mt-0.5">{SALON_INFO.hoursWeekend}</p>
                  <span className="text-[11px] text-[#B59A72] font-medium block mt-1">
                    Open all 7 days for pre-scheduled visits
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Booking Callout */}
            <div className="p-5 bg-[#29241F] text-[#F7F5F0] space-y-3">
              <h3 className="font-editorial text-xl text-white">Need an immediate appointment?</h3>
              <p className="text-xs text-[#EAE5DC]/80 leading-relaxed">
                Skip the enquiry form and book directly using our interactive appointment concierge.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full min-h-[44px] py-2.5 bg-[#B59A72] hover:bg-[#CBB494] text-[#211E1A] text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer transition-colors"
              >
                OPEN BOOKING CONCIERGE
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form & Map Simulation */}
          <div className="lg:col-span-7 space-y-10">
            {/* Form Section */}
            <div className="bg-white p-6 sm:p-8 border border-[#EAE5DC] shadow-xs">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-1">
                Write to Us
              </span>
              <h2 className="font-editorial text-3xl text-[#29241F] font-normal mb-2">
                Send an Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#82796F] mb-6">
                Fill in your details below and our team will get in touch shortly.
              </p>

              {isSubmitted ? (
                <div className="py-8 px-4 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#B59A72]/20 border border-[#B59A72] flex items-center justify-center text-[#B59A72]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-2xl text-[#29241F]">
                    Thank You, {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#82796F] max-w-md mx-auto leading-relaxed">
                    Your demo enquiry has been successfully registered. In a production deployment, this transmits securely to the salon concierge desk.
                  </p>
                  <div className="p-3 bg-[#EAE5DC]/60 border border-[#B59A72]/20 text-xs text-[#29241F] max-w-sm mx-auto text-left">
                    <p className="font-medium">Captured Details:</p>
                    <p className="text-[#82796F]">Email: {email}</p>
                    <p className="text-[#82796F]">Phone: {phone}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="min-h-[42px] px-6 py-2.5 bg-[#29241F] text-[#F7F5F0] text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Julian Hayes"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F]"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. julian@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F]"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="999999"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="How may our stylists assist you?"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F] resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-[#82796F]">
                      * Client verification simulation for PRIS portfolio demo.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[46px] px-8 py-3 rounded-lg bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] shadow-md shadow-[#C49A6C]/25"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>SUBMIT ENQUIRY</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Google Maps Location Section */}
            <div className="bg-white rounded-xl border border-[#E6DDD1] overflow-hidden shadow-xs">
              <div className="p-4 bg-[#F4EFEA] border-b border-[#E6DDD1] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#241E1A] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C49A6C]" /> Location Architecture
                </span>
                <span className="text-[11px] text-[#7D7368]">Demo Map Visualizer</span>
              </div>

              {/* Styled Interactive/Visual Map Canvas */}
              <div className="relative w-full h-64 sm:h-80 bg-[#FAF8F5] overflow-hidden flex items-center justify-center">
                {/* SVG Map Grid Background */}
                <div className="absolute inset-0 opacity-40">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="streetMap" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 0 10 L 80 10 M 0 50 L 80 50 M 20 0 L 20 80 M 60 0 L 60 80" stroke="#C49A6C" strokeWidth="1" strokeOpacity="0.4" />
                        <rect x="25" y="15" width="30" height="30" fill="#FAF8F5" fillOpacity="0.8" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#streetMap)" />
                  </svg>
                </div>

                {/* Map Pin Card */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md p-5 rounded-xl border border-[#C49A6C]/50 shadow-xl max-w-xs text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#C49A6C] text-white flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-lg text-[#241E1A] font-semibold">
                    MAISON ÉLAN ATELIER
                  </h4>
                  <p className="text-xs text-[#82796F]">
                    14 Rue Royale / Lavelle Boulevard, Quarter 4
                  </p>
                  <div className="pt-1">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#B59A72] hover:underline"
                    >
                      <span>Open Navigation Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#F7F5F0] border-t border-[#EAE5DC] flex items-center gap-2 text-[11px] text-[#82796F]">
                <Info className="w-3.5 h-3.5 text-[#B59A72] shrink-0" />
                <span>
                  Demonstration Note: The fictional salon location is easily replaceable with your client's live Google Maps embed iframe or API.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
