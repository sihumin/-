import { motion } from 'motion/react';
import { Package, ShieldCheck, Mail } from 'lucide-react';

import imgBoutique from '../assets/images/watch_boutique_1780740825497.png';

export function Part3() {
    return (
        <div className="w-full bg-transparent text-[#F0F0F0]">
             {/* Section 15: Concierge Delivery */}
             <section className="py-20 md:py-40 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="flex-1 w-full aspect-square relative border border-white/5 bg-[#050505] p-6 rounded-2xl shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl -z-10 blur-xl"></div>
                      <div className="w-full h-full relative overflow-hidden rounded-xl">
                           <img src={imgBoutique} className="w-full h-full object-cover grayscale opacity-60 mix-blend-screen hover:scale-105 transition-transform duration-1000" />
                      </div>
                  </div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 space-y-8 pl-0 md:pl-12">
                      <Package className="text-white/40 stroke-1" size={32} />
                      <h2 className="text-3xl sm:text-4xl md:text-6xl text-[#F0F0F0] font-serif font-light italic border-l-2 border-white/10 pl-6 py-2">
                           White-Glove<br />Armored Delivery
                      </h2>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed text-left md:text-justify pl-6 font-light">
                           Every Aetheria creation is transported in a ballistic-grade, 3D-printed biometric security vessel. Our private couriers deliver the timepiece directly from New York to your residence, ensuring absolute security and discretion.
                      </p>
                  </motion.div>
             </section>

             {/* Section 16: The Black Tier */}
             <section className="py-20 md:py-40 bg-transparent text-center relative overflow-hidden border-t border-b border-white/5">
                 <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-[30rem] font-serif overflow-hidden pointer-events-none">
                     IV
                 </div>
                 <div className="max-w-3xl mx-auto px-6 relative z-10">
                      <ShieldCheck className="mx-auto mb-10 text-white/30 stroke-1" size={40} />
                      <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50 mb-6">By Invitation Only</h3>
                      <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light italic text-[#F0F0F0] mb-8">The Black Tier</h2>
                      <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"></div>
                      <p className="text-white/40 leading-loose text-[10px] tracking-widest uppercase text-center md:text-justify max-w-xl mx-auto mb-16 font-light">
                           Access to unreleased horological portfolios, private tours of the Brooklyn Lab, and 1:1 custom piece fabrication with our master engineers. All privileges exclusively reserved for the invited few of the Aetheria Black Tier.
                      </p>
                      <button className="w-full max-w-sm mx-auto h-16 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-4 hover:bg-[#e0e0e0] transition-colors">
                          Request Access
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                 </div>
             </section>

             {/* Section 17: Global Flagships */}
             <section className="py-20 md:py-40 px-6 max-w-7xl mx-auto">
                 <h2 className="text-3xl sm:text-5xl text-center font-serif font-light italic text-[#F0F0F0] mb-12 md:mb-24">Global Sanctuaries</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {['New York / 5th Ave', 'Los Angeles / Rodeo Dr', 'Miami / Design Dist'].map((city, idx) => (
                         <div key={idx} className="group cursor-pointer">
                             <div className="aspect-[3/4] bg-[#050505] border border-white/5 overflow-hidden relative rounded-xl">
                                 <img src={imgBoutique} className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold border border-white/20 px-6 py-4 text-white hover:bg-white hover:text-black transition-colors">View Boutique</span>
                                 </div>
                             </div>
                             <h4 className="mt-8 text-center font-serif text-2xl font-light italic tracking-wide text-[#F0F0F0]">{city}</h4>
                         </div>
                     ))}
                 </div>
             </section>

             {/* Section 18: Founder Letter */}
             <section className="py-20 md:py-32 bg-transparent border-t border-white/5 px-6 relative">
                 <div className="absolute top-0 right-[-40px] text-[9px] uppercase tracking-widest border-l border-white/20 pl-4 py-2 opacity-60 hidden md:block">
                     [08] Vision<br/><span className="text-white/30">Foundational Ethos</span>
                 </div>
                 <div className="max-w-3xl mx-auto text-center space-y-12">
                     <p className="text-xl sm:text-2xl md:text-5xl font-serif text-[#F0F0F0] font-light italic leading-relaxed">
                         "We do not merely manufacture timepieces.<br/>We bestow monuments that prove the limits of time and physics upon your daily life."
                     </p>
                     <div className="flex flex-col items-center gap-4">
                         <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
                         <h5 className="uppercase tracking-[0.4em] text-[11px] font-bold text-[#F0F0F0]">Alexander Vance</h5>
                         <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 italic">Chief Architect & Founder</p>
                     </div>
                 </div>
             </section>

             {/* Section 19: Private Consultation Form */}
             <section className="py-20 md:py-40 px-6 max-w-4xl mx-auto border-t border-white/5">
                 <div className="text-center mb-10 md:mb-20">
                     <Mail className="mx-auto text-white/40 stroke-1 mb-8" size={32} />
                     <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light italic text-[#F0F0F0] mb-8">Book Your Consultation</h2>
                     <p className="text-[10px] tracking-[0.4em] font-bold text-white/50 uppercase">Wrist Scan & Horology Session</p>
                 </div>
                 <form className="space-y-12 max-w-xl mx-auto relative" onSubmit={(e) => e.preventDefault()}>
                     <div className="absolute bottom-[-60px] left-[-60px] text-[9px] uppercase tracking-widest border-r border-white/20 pr-4 py-2 opacity-60 text-right hidden md:block">
                         [11] Data Intake<br/><span className="text-white/30">Encrypted transmission</span>
                     </div>
                     <div className="flex flex-col space-y-4">
                         <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/50">Legal Name</label>
                         <input type="text" className="bg-transparent border-b border-white/10 p-4 text-[#F0F0F0] font-serif font-light text-xl outline-none focus:border-white/40 transition-colors" placeholder="Enter your full name" />
                     </div>
                     <div className="flex flex-col space-y-4">
                         <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/50">Private Contact</label>
                         <input type="email" className="bg-transparent border-b border-white/10 p-4 text-[#F0F0F0] font-serif font-light text-xl outline-none focus:border-white/40 transition-colors" placeholder="Email or phone number" />
                     </div>
                     <div className="flex flex-col space-y-4">
                         <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/50">Preferred Collection</label>
                         <select className="bg-transparent border-b border-white/10 p-4 text-white/40 font-serif font-light text-xl outline-none focus:border-white/40 transition-colors appearance-none">
                             <option className="bg-[#050505]">The Monolith</option>
                             <option className="bg-[#050505]">The Gravity Tourbillon</option>
                             <option className="bg-[#050505]">The Perpetual Calendar</option>
                             <option className="bg-[#050505]">Bespoke Horology</option>
                         </select>
                     </div>
                     <button type="submit" className="w-full h-16 mt-8 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-4 hover:bg-[#e0e0e0] transition-colors">
                         Submit Request
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                     </button>
                 </form>
             </section>

             {/* Section 20: Footer */}
             <footer className="pt-32 border-t border-white/5 text-[9px] uppercase tracking-[0.2em] font-medium text-white/30 flex flex-col bg-[#050505]">
                 <div className="max-w-7xl mx-auto w-full flex flex-col items-center px-12 mb-16">
                     <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-light leading-none tracking-tight mix-blend-difference select-none text-[#F0F0F0]">Minsihu's portfolio</h2>
                 </div>
                 <div className="h-16 flex border-t border-white/5 w-full">
                     <div className="grid grid-cols-1 md:grid-cols-4 w-full divide-y md:divide-y-0 md:divide-x divide-white/10 text-center md:text-left items-center">
                         <div className="px-6 py-4 md:py-0">Latitude 40.7128° N</div>
                         <div className="px-6 py-4 md:py-0">Longitude 74.0060° W</div>
                         <div className="px-6 py-4 md:py-0 text-center">Serialized: #ATH-112-90</div>
                         <div className="px-6 py-4 md:py-0 text-center md:text-right">© Minsihu's portfolio 2026</div>
                     </div>
                 </div>
             </footer>
        </div>
    )
}
