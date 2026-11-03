import React, { useState, useEffect } from 'react';
import { SERVICES, SALON_INFO, AVAILABLE_TIME_SLOTS } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { useCart } from '../context/CartContext';
import {
  X,
  Calendar,
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Plus,
  Trash2,
  CheckSquare,
  Square
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
}

function parseMinutes(durationStr: string): number {
  const match = durationStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 45;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
}) => {
  const { cart } = useCart();

  // Wizard steps: 1 = Services, 2 = Date & Time, 3 = Guest Details, 4 = Review, 5 = Ready
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  // Selected Service IDs (multi-service support)
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('999999');
  const [notes, setNotes] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [whatsappGeneratedUrl, setWhatsappGeneratedUrl] = useState<string>('');

  const todayStr = new Date().toISOString().split('T')[0];

  // Initialize selected services when modal opens
  useEffect(() => {
    if (isOpen) {
      if (preSelectedServiceId) {
        setSelectedServiceIds((prev) =>
          prev.includes(preSelectedServiceId) ? prev : [...prev, preSelectedServiceId]
        );
      } else if (cart.length > 0) {
        setSelectedServiceIds(cart.map((c) => c.id));
      } else if (selectedServiceIds.length === 0) {
        setSelectedServiceIds([SERVICES[0].id]);
      }
    }
  }, [isOpen, preSelectedServiceId, cart]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedServices: ServiceItem[] = SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.startingPrice, 0);
  const totalMinutes = selectedServices.reduce((sum, s) => sum + parseMinutes(s.duration), 0);
  const formattedDuration = (() => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0 && mins > 0) return `${hours} hr ${mins} mins`;
    if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
    return `${mins} mins`;
  })();

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!date) {
      errs.date = 'Please select a preferred date';
    } else if (date < todayStr) {
      errs.date = 'Past dates cannot be selected';
    }
    if (!timeSlot) {
      errs.timeSlot = 'Please select a preferred time slot';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }
    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 5) {
      errs.phoneNumber = 'Please enter a valid telephone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmWhatsApp = () => {
    if (!validateStep2() || !validateStep3()) return;

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const treatmentsList = selectedServices
      .map(
        (s, idx) =>
          `${idx + 1}. ${s.name} (₹${s.startingPrice.toLocaleString('en-IN')} · ${s.duration})`
      )
      .join('\n');

    const message = `Hello Maison Élan! I would like to request an appointment.

Name: ${fullName.trim()}
Phone: ${phoneNumber.trim()}

Selected Treatments (${selectedServices.length}):
${treatmentsList}

Total Estimated: ₹${totalPrice.toLocaleString('en-IN')}
Total Estimated Duration: ${formattedDuration}
Date: ${formattedDate}
Time: ${timeSlot}
Notes: ${notes.trim() ? notes.trim() : 'None'}

Please confirm my appointment.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${SALON_INFO.phoneRaw}?text=${encodedMessage}`;
    setWhatsappGeneratedUrl(waUrl);
    setCurrentStep(5);

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback
    }
  };

  const handleResetAndClose = () => {
    setCurrentStep(1);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#241E1A]/40 backdrop-blur-xs overflow-y-auto"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E6DDD1] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#F4EFEA] text-[#241E1A] px-6 py-4 flex items-center justify-between border-b border-[#E6DDD1]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A47B4B] font-semibold block">
              Appointment Concierge · Direct WhatsApp
            </span>
            <h2 id="booking-modal-title" className="font-editorial text-xl sm:text-2xl text-[#241E1A]">
              Reserve Your Salon Rituals
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 min-h-[44px] min-w-[44px] text-[#756C63] hover:text-[#241E1A] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {currentStep <= 4 && (
          <div className="bg-[#EFE8DE] px-6 py-3 border-b border-[#E6DDD1] flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-wider text-[#756C63]">
            <span className={currentStep === 1 ? 'font-semibold text-[#241E1A]' : ''}>
              1. Services ({selectedServices.length})
            </span>
            <span className="opacity-40">/</span>
            <span className={currentStep === 2 ? 'font-semibold text-[#241E1A]' : ''}>
              2. Date & Time
            </span>
            <span className="opacity-40">/</span>
            <span className={currentStep === 3 ? 'font-semibold text-[#241E1A]' : ''}>
              3. Guest Details
            </span>
            <span className="opacity-40">/</span>
            <span className={currentStep === 4 ? 'font-semibold text-[#241E1A]' : ''}>
              4. Review & Confirm
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: MULTI-SERVICE SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h3 className="font-editorial text-2xl text-[#29241F]">
                    Select Your Rituals
                  </h3>
                  <p className="text-xs text-[#82796F]">
                    Choose one or multiple treatments to combine into your appointment.
                  </p>
                </div>
                <div className="text-right bg-white px-3 py-1.5 border border-[#EAE5DC] self-start sm:self-auto">
                  <span className="text-[10px] uppercase tracking-wider text-[#82796F] block">
                    Selected: {selectedServices.length} · Est. Total
                  </span>
                  <span className="font-mono text-sm font-bold text-[#29241F]">
                    ₹{totalPrice.toLocaleString('en-IN')} ({formattedDuration})
                  </span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-[#EAE5DC]/70 border border-[#B59A72]/20">
                {(['all', 'hair', 'skin', 'grooming', 'bridal'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#29241F] text-[#F7F5F0]'
                        : 'text-[#29241F] hover:bg-white/60'
                    }`}
                  >
                    {cat === 'all' ? 'All Rituals' : cat}
                  </button>
                ))}
              </div>

              {/* Multi-Service Checkbox Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {filteredServices.map((srv) => {
                  const isChecked = selectedServiceIds.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3.5 border cursor-pointer transition-all text-left flex flex-col justify-between ${
                        isChecked
                          ? 'bg-white border-[#B59A72] shadow-xs ring-1 ring-[#B59A72]'
                          : 'bg-[#F7F5F0] border-[#EAE5DC] hover:border-[#B59A72]/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#82796F]">
                            {srv.categoryLabel}
                          </span>
                          <span className="text-xs font-semibold text-[#B59A72] font-mono tabular-nums">
                            ₹{srv.startingPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <h4 className="font-editorial text-lg text-[#29241F] font-semibold mt-1">
                          {srv.name}
                        </h4>
                        <p className="text-xs text-[#82796F] line-clamp-2 mt-1">
                          {srv.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#EAE5DC]/60 text-xs">
                        <span className="flex items-center gap-1 text-[#82796F]">
                          <Clock className="w-3 h-3 text-[#B59A72]" /> {srv.duration}
                        </span>

                        <span
                          className={`flex items-center gap-1.5 font-medium ${
                            isChecked ? 'text-[#29241F]' : 'text-[#82796F]'
                          }`}
                        >
                          {isChecked ? (
                            <>
                              <CheckSquare className="w-4 h-4 text-[#B59A72]" /> Selected
                            </>
                          ) : (
                            <>
                              <Square className="w-4 h-4 text-[#82796F]/60" /> Add to Visit
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next Step Button */}
              <div className="pt-3 border-t border-[#E6DDD1] flex items-center justify-between">
                <span className="text-xs text-[#756C63]">
                  {selectedServices.length} ritual{selectedServices.length > 1 ? 's' : ''} in this booking
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 min-h-[46px] bg-[#C49A6C] text-white hover:bg-[#B58957] text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm border border-[#C49A6C]"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial text-2xl text-[#29241F]">
                  Choose Preferred Date & Slot
                </h3>
                <p className="text-xs sm:text-sm text-[#82796F] mt-1">
                  Estimated visit duration: <strong className="text-[#29241F]">{formattedDuration}</strong> ({selectedServices.length} ritual{selectedServices.length > 1 ? 's' : ''})
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label
                  htmlFor="booking-date"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]"
                >
                  Preferred Date (Past dates disabled)
                </label>
                <input
                  type="date"
                  id="booking-date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                  }}
                  className="w-full px-4 py-3 bg-white border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F] cursor-pointer"
                />
                {errors.date && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                  </p>
                )}
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#29241F]">
                    Preferred Time Slot
                  </label>
                  <span className="text-[11px] text-[#82796F]">Salon Hours: 9:30 AM – 8:30 PM</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => {
                          setTimeSlot(slot.time);
                          if (errors.timeSlot) setErrors((prev) => ({ ...prev, timeSlot: '' }));
                        }}
                        className={`p-2.5 text-xs text-center border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#C49A6C] text-white border-[#C49A6C] shadow-2xs font-semibold'
                            : 'bg-white text-[#241E1A] border-[#E6DDD1] hover:border-[#C49A6C]'
                        }`}
                      >
                        <span className="font-mono tabular-nums block font-medium">{slot.time}</span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#756C63]'}`}>{slot.period}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.timeSlot && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.timeSlot}
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t border-[#E6DDD1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-3 min-h-[46px] text-xs uppercase tracking-wider text-[#756C63] hover:text-[#241E1A] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setCurrentStep(3);
                  }}
                  className="px-6 py-3 min-h-[46px] bg-[#C49A6C] text-white hover:bg-[#B58957] text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm border border-[#C49A6C]"
                >
                  <span>Continue to Guest Info</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-editorial text-2xl text-[#29241F]">
                  Guest Contact Details
                </h3>
                <p className="text-xs sm:text-sm text-[#82796F] mt-1">
                  We coordinate your reservation directly with the salon host.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-fullname"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="booking-fullname"
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    className="w-full px-4 py-3 bg-white border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]"
                  >
                    Phone / WhatsApp Number * (Default: 999999)
                  </label>
                  <input
                    type="text"
                    id="booking-phone"
                    placeholder="999999"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                    }}
                    className="w-full px-4 py-3 bg-white border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#29241F]"
                  >
                    Special Requests or Hair/Skin Notes (Optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    placeholder="e.g. Hair is past shoulder length; sensitive skin; preparing for a wedding..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#EAE5DC] focus:border-[#B59A72] focus:outline-none text-sm text-[#29241F] resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DDD1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-3 min-h-[46px] text-xs uppercase tracking-wider text-[#756C63] hover:text-[#241E1A] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep3()) setCurrentStep(4);
                  }}
                  className="px-6 py-3 min-h-[46px] bg-[#C49A6C] text-white hover:bg-[#B58957] text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm border border-[#C49A6C]"
                >
                  <span>Review Total Booking</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial text-2xl text-[#29241F]">
                  Review Appointment Package
                </h3>
                <p className="text-xs sm:text-sm text-[#82796F] mt-1">
                  Ready to send your package enquiry directly to our WhatsApp concierge.
                </p>
              </div>

              {/* Review Card */}
              <div className="bg-white p-5 border border-[#B59A72]/30 space-y-4 shadow-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#82796F] block mb-2">
                    Selected Rituals ({selectedServices.length})
                  </span>
                  <div className="divide-y divide-[#EAE5DC] max-h-40 overflow-y-auto">
                    {selectedServices.map((srv, i) => (
                      <div key={srv.id} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-[#29241F]">
                            {i + 1}. {srv.name}
                          </p>
                          <span className="text-[#82796F] flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-[#B59A72]" /> {srv.duration} · {srv.categoryLabel}
                          </span>
                        </div>
                        <span className="font-mono font-semibold text-[#B59A72]">
                          ₹{srv.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#B59A72]/30 flex items-center justify-between font-medium text-xs">
                    <span className="text-[#82796F]">
                      Est. Total Time: <strong className="text-[#29241F]">{formattedDuration}</strong>
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-[#82796F] block">Combined Starting Price</span>
                      <span className="font-mono text-base font-bold text-[#29241F]">
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-[#EAE5DC]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#82796F] block">
                      Date & Slot
                    </span>
                    <p className="font-medium text-[#29241F] mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B59A72]" />
                      {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="font-mono text-xs text-[#82796F] mt-0.5 ml-5">{timeSlot}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#82796F] block">
                      Guest
                    </span>
                    <p className="font-medium text-[#29241F] mt-0.5">{fullName}</p>
                    <p className="text-xs text-[#82796F] font-mono mt-0.5">{phoneNumber}</p>
                  </div>
                </div>

                {notes && (
                  <div className="pt-2 border-t border-[#EAE5DC] text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#82796F] block">
                      Guest Notes
                    </span>
                    <p className="text-[#29241F] italic mt-0.5">{notes}</p>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 bg-[#EAE5DC]/60 border border-[#B59A72]/20 flex items-start gap-2.5 text-xs text-[#29241F]">
                <Sparkles className="w-4 h-4 text-[#B59A72] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Demonstration Appointment Request</p>
                  <p className="text-[#82796F] mt-0.5 leading-relaxed">
                    This confirms your appointment request directly to WhatsApp ({SALON_INFO.phoneDisplay}). The salon host will reply to verify chair availability.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#E6DDD1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-3 min-h-[46px] text-xs uppercase tracking-wider text-[#756C63] hover:text-[#241E1A] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleConfirmWhatsApp}
                  className="px-6 py-3 min-h-[48px] bg-[#C49A6C] hover:bg-[#B58957] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2.5 cursor-pointer shadow-md transition-all active:scale-[0.99] border border-[#C49A6C]"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>CONFIRM VIA WHATSAPP ({selectedServices.length})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: READY / WHATSAPP SCREEN */}
          {currentStep === 5 && (
            <div className="text-center py-6 px-2 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#B59A72]/15 border border-[#B59A72] flex items-center justify-center text-[#B59A72]">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#B59A72] font-semibold block">
                  Request Formatted
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#29241F] mt-1">
                  Ready to Send via WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-[#82796F] max-w-md mx-auto mt-2 leading-relaxed">
                  Your appointment package message has been crafted. If WhatsApp did not open automatically, tap the link below.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#EAE5DC] max-w-md mx-auto text-left text-xs text-[#29241F] font-mono whitespace-pre-wrap leading-relaxed shadow-xs max-h-48 overflow-y-auto">
                {`Hello Maison Élan! I would like to request an appointment.

Name: ${fullName}
Phone: ${phoneNumber}

Selected Treatments (${selectedServices.length}):
${selectedServices.map((s, i) => `${i + 1}. ${s.name} (₹${s.startingPrice})`).join('\n')}

Total Estimated: ₹${totalPrice.toLocaleString('en-IN')}
Estimated Duration: ${formattedDuration}
Date: ${date}
Time: ${timeSlot}
Notes: ${notes || 'None'}

Please confirm my appointment.`}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappGeneratedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] px-6 py-3 bg-[#C49A6C] hover:bg-[#B58957] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-sm border border-[#C49A6C]"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Open WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto min-h-[46px] px-6 py-3 border border-[#E6DDD1] text-[#241E1A] hover:bg-white text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-2xs"
                >
                  Done & Close
                </button>
              </div>

              <p className="text-[11px] text-[#82796F] pt-2">
                Demonstration mode: Configured salon WhatsApp receiver is {SALON_INFO.phoneDisplay}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
