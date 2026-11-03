import React from 'react';
import { TEAM_MEMBERS, SALON_INFO } from '../data/salonData';
import { SafeImage } from '../components/SafeImage';
import { Sparkles, Compass, Shield, Feather, Calendar } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full pb-20">
      {/* Editorial Header with Salon Background */}
      <section className="relative bg-gradient-to-b from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] text-[#241E1A] border-b border-[#E6DDD1] py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80"
            alt="Maison Élan Salon Atmosphere"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold block">
            The Maison Story
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#241E1A] font-normal tracking-tight">
            Where beauty meets individuality.
          </h1>
          <p className="text-sm sm:text-base text-[#7D7368] max-w-xl mx-auto leading-relaxed">
            Founded on the belief that personal grooming is not about following trends, but about uncovering the effortless grace already within you.
          </p>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-[#EAE5DC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold">
              The Architecture of Care
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#29241F] font-normal leading-tight">
              An unhurried sanctuary for your mind and style.
            </h2>
            <div className="space-y-4 text-sm text-[#82796F] leading-relaxed">
              <p>
                In a world crowded by loud salon aesthetics and hurried 20-minute conveyor-belt appointments, Maison Élan was imagined as a quiet counter-movement.
              </p>
              <p>
                Every appointment begins with an attentive one-on-one dialogue. We study how your hair falls naturally when wet, how you prefer to part it when running out the door on a Monday morning, and what skin tone tones flatter your wardrobe.
              </p>
              <p>
                We do not enforce an arbitrary seasonal trend onto you. We design a cut, color, or botanical facial that works effortlessly in your daily life.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#EAE5DC]">
              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-editorial text-lg text-[#29241F] font-semibold">Consultation First</h4>
                  <p className="text-xs text-[#82796F]">Dedicated time to listen before any service begins.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Feather className="w-5 h-5 text-[#B59A72] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-editorial text-lg text-[#29241F] font-semibold">Botanical Purity</h4>
                  <p className="text-xs text-[#82796F]">Ammonia-free formulas gentle on hair and scalp.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative shadow-xl border border-[#B59A72]/30">
              <SafeImage
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80"
                alt="Maison Élan Interior Philosophy"
                fallbackTitle="Maison Élan Atelier Atmosphere"
                aspectRatioClass="aspect-4/3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interior Architecture & Experience */}
      <section className="w-full py-16 bg-[#EAE5DC]/30 border-b border-[#EAE5DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
              The Physical Space
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#29241F] font-normal">
              Designed for tranquility and focus.
            </h2>
            <p className="text-xs sm:text-sm text-[#82796F] mt-2">
              Limewash textures, natural travertine pedestals, and ergonomic stations curated to make you feel instantly at ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#EAE5DC] overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                alt="Acoustic Styling Stations"
                fallbackTitle="Acoustic Styling Stations"
                aspectRatioClass="aspect-4/3"
              />
              <div className="p-5">
                <h4 className="font-editorial text-xl text-[#29241F] font-semibold">The Styling Atelier</h4>
                <p className="text-xs text-[#82796F] mt-1">Generously spaced cutting chairs allowing private, peaceful dialogue.</p>
              </div>
            </div>

            <div className="bg-white border border-[#EAE5DC] overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
                alt="Quiet Basin Sanctuary"
                fallbackTitle="Quiet Basin Sanctuary"
                aspectRatioClass="aspect-4/3"
              />
              <div className="p-5">
                <h4 className="font-editorial text-xl text-[#29241F] font-semibold">Head Spa Sanctuary</h4>
                <p className="text-xs text-[#82796F] mt-1">Dimmable warm lighting and ergonomic lie-flat Japanese wash basins.</p>
              </div>
            </div>

            <div className="bg-white border border-[#EAE5DC] overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1512290900672-1f0233320f32?auto=format&fit=crop&w=800&q=80"
                alt="Aesthetic & Skin Suite"
                fallbackTitle="Aesthetic & Skin Suite"
                aspectRatioClass="aspect-4/3"
              />
              <div className="p-5">
                <h4 className="font-editorial text-xl text-[#29241F] font-semibold">Skin Aesthetics Suite</h4>
                <p className="text-xs text-[#82796F] mt-1">Private room dedicated to customized facial therapy and bridal prep.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
            The Atelier Hands
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal">
            Meet Our Creative Team
          </h2>
          <p className="text-xs sm:text-sm text-[#82796F] mt-2">
            Passionate stylists, master colorists, and skin therapists dedicated to bringing out your best look.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-[#EAE5DC] overflow-hidden flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="relative overflow-hidden aspect-4/5">
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    fallbackTitle={member.name}
                    aspectRatioClass="aspect-4/5"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 text-[10px] tracking-wider uppercase font-semibold bg-white/90 text-[#241E1A] px-2.5 py-1 rounded-sm backdrop-blur-xs border border-[#E6DDD1]">
                    {member.experience}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#C49A6C] font-semibold block">
                    {member.specialty}
                  </span>
                  <h3 className="font-editorial text-2xl text-[#241E1A] font-semibold mt-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#7D7368] font-medium mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#7D7368] mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E6DDD1]/60 mt-4">
                <button
                  onClick={onOpenBooking}
                  className="w-full min-h-[40px] py-2 rounded-lg border border-[#E6DDD1] hover:border-[#C49A6C] hover:bg-[#C49A6C] hover:text-white text-[#241E1A] bg-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Request Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-[#F4EFEA] border border-[#E6DDD1] text-[#241E1A] rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#241E1A]">
            Experience the Atelier in Person
          </h3>
          <p className="text-xs sm:text-sm text-[#7D7368] max-w-lg mx-auto">
            Book an appointment or visit us on Rue Royale for an unhurried personalized consultation.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="min-h-[46px] px-8 py-3.5 rounded-lg bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] text-white text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-[#C49A6C]/25"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>BOOK YOUR VISIT</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
