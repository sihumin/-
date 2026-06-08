import { motion } from 'motion/react';
import { Gem, Settings, Library, Fingerprint } from 'lucide-react';

import imgCrystal from '../assets/images/crystal_watch_1780740840061.png';
import imgMovement from '../assets/images/watch_movement_1780740795872.png';
import imgBlueprint from '../assets/images/watch_blueprint_1780740811185.png';
import imgTitanium from '../assets/images/titanium_watch_1780740853118.png';

export function Part4() {
    return (
        <div className="w-full text-[#F0F0F0]">
            {/* Section 21: Sapphire Architecture */}
            <section className="min-h-screen py-20 md:py-40 bg-transparent border-t border-b border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-10 right-10 text-[9px] uppercase tracking-widest border-r border-white/20 pr-4 py-2 opacity-60 text-right hidden md:block z-20">
                     [12] Translucency<br/><span className="text-white/30">Crystalline Case</span>
                </div>
                <div className="absolute inset-0 z-0">
                    <img src={imgCrystal} className="w-full h-full object-cover grayscale opacity-10 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <Gem className="mx-auto text-white/40 stroke-1 mb-8" size={32} />
                    <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50 mb-6">Material Mastery</h3>
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif font-light italic mb-8">Sapphire<br />Architecture</h2>
                    <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"></div>
                    <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase max-w-xl mx-auto leading-loose text-center md:text-justify font-light">
                        Machined from a solid block of synthetic sapphire. Revealing the beating heart of the caliber while offering diamond-like resistance to abrasion. Over 800 hours of continuous polishing required for a single casing.
                    </p>
                </div>
            </section>

            {/* Section 22: The Caliber (Movement) */}
            <section className="min-h-screen py-20 md:py-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 border-b border-white/5">
                 <div className="flex-1 w-full aspect-[4/5] border border-white/5 rounded-2xl relative overflow-hidden backdrop-blur-md p-2 shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl -z-10 blur-xl"></div>
                     <motion.img initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} src={imgMovement} className="w-full h-full object-cover grayscale mix-blend-screen rounded-xl" />
                 </div>
                 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex-1 space-y-8 md:pl-16">
                     <Settings className="text-white/40 stroke-1" size={32} />
                     <h2 className="text-3xl sm:text-5xl md:text-7xl text-[#F0F0F0] font-serif font-light italic">Caliber<br />X-9000</h2>
                     <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                     <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <span className="text-[10px] border border-white/20 w-6 h-6 flex items-center justify-center shrink-0 mt-1">.C</span>
                            <div>
                                <p className="text-[11px] font-bold tracking-widest uppercase mb-1">Micro-Mechanics</p>
                                <p className="text-[10px] text-white/40 leading-relaxed text-left md:text-justify uppercase tracking-widest font-light">
                                    Composed of 482 individual hand-finished components. Suspension bridges in rose gold and plates in grade 5 titanium. A symphony of kinetic energy orchestrating absolute precision.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-[10px] border border-white/20 w-6 h-6 flex items-center justify-center shrink-0 mt-1">.P</span>
                            <div>
                                <p className="text-[11px] font-bold tracking-widest uppercase mb-1">Power Reserve</p>
                                <p className="text-[10px] text-white/40 leading-relaxed text-left md:text-justify uppercase tracking-widest font-light">
                                    Twin-barrel integration ensures an uninterrupted 120-hour chronometric performance.
                                </p>
                            </div>
                        </div>
                    </div>
                 </motion.div>
            </section>

            {/* Section 23: The Archives */}
            <section className="py-20 md:py-40 px-6 max-w-7xl mx-auto">
                 <div className="text-center mb-12 md:mb-24">
                     <Library className="mx-auto text-white/40 stroke-1 mb-8" size={32} />
                     <h2 className="text-3xl sm:text-5xl md:text-7xl text-[#F0F0F0] font-serif font-light italic mb-6">The Archives</h2>
                     <p className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50">Historical Patents & Blueprints</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="group cursor-pointer relative aspect-[16/9] border border-white/5 rounded-xl overflow-hidden p-2">
                         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 blur-xl"></div>
                         <img src={imgBlueprint} className="w-full h-full object-cover grayscale opacity-30 mix-blend-screen group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 rounded-lg" />
                         <div className="absolute bottom-8 left-8 z-20">
                             <h4 className="font-serif text-2xl font-light italic mb-2">Tourbillon Blueprint .1982</h4>
                             <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">Geneva Vault</p>
                         </div>
                     </div>
                     <div className="group cursor-pointer relative aspect-[16/9] border border-white/5 rounded-xl overflow-hidden p-2">
                         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 blur-xl"></div>
                         <img src={imgBlueprint} className="w-full h-full object-cover grayscale opacity-30 mix-blend-screen group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 rounded-lg" />
                         <div className="absolute bottom-8 left-8 z-20">
                             <h4 className="font-serif text-2xl font-light italic mb-2">Escapement Geometry</h4>
                             <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">Patent 4A-901</p>
                         </div>
                     </div>
                 </div>
            </section>

             {/* Section 24: Bespoke Engraving */}
            <section className="min-h-screen py-20 md:py-40 border-t border-white/5 bg-[#050505] relative overflow-hidden flex items-center">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#050505] to-[#050505] pointer-events-none"></div>
                 <div className="absolute bottom-10 left-10 text-[9px] uppercase tracking-widest border-l border-white/20 pl-4 py-2 opacity-60 hidden md:block z-20">
                     [13] Bespoke<br/><span className="text-white/30">Couture Engraving</span>
                 </div>
                 <div className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
                      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 space-y-10">
                         <Fingerprint className="text-white/40 stroke-1" size={32} />
                         <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50">Personalization</h3>
                         <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light italic leading-none tracking-tighter">The Monogram</h2>
                         <div className="h-[1px] w-1/4 bg-white/20"></div>
                         <p className="text-white/40 leading-loose text-[10px] tracking-widest uppercase text-left md:text-justify max-w-md font-light">
                             Every masterpiece deserves authentication. Our micro-engraving artists can etch family crests, signatures, or specific coordinates onto the rotor or case-back using femtosecond lasers, ensuring your legacy runs parallel to time itself.
                         </p>
                      </motion.div>
                     <div className="flex-1 w-full aspect-square relative border border-white/5 rounded-full overflow-hidden p-4 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                         <div className="w-full h-full rounded-full overflow-hidden relative">
                              <img src={imgTitanium} className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen scale-110" />
                              <div className="absolute inset-0 border-[4px] border-[#050505] rounded-full"></div>
                         </div>
                     </div>
                </div>
            </section>
        </div>
    );
}
