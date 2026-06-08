import { useState, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Eye, MapPin, Clock, ScanFace, Combine, Hammer, Box, Rotate3D } from 'lucide-react';

import imgCrystal from '../assets/images/crystal_watch_1780740840061.png';
import imgTitanium from '../assets/images/titanium_watch_1780740853118.png';
import imgMovement from '../assets/images/watch_movement_1780740795872.png';
import imgBlueprint from '../assets/images/watch_blueprint_1780740811185.png';

export function Part2() {
    // For Section 14 Simulator
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-500, 500], [15, -15]);
    const rotateY = useTransform(x, [-500, 500], [-15, 15]);

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div className="w-full text-[#F0F0F0]">
            {/* Section 8: Product - Perpetual Calendar */}
            <section className="min-h-screen py-20 md:py-32 bg-transparent border-t border-white/5 border-b relative flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                     <motion.img initial={{ y: -50 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} src={imgCrystal} className="w-full h-full object-cover grayscale opacity-20" />
                      <div className="absolute inset-0 bg-[#050505]/70"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24 text-center">
                    <Eye className="mx-auto text-white/40 stroke-1 mb-8" size={32} />
                    <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50 mb-6">Collection 03</h3>
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif font-light italic leading-none tracking-tighter mb-10">The Perpetual<br />Calendar</h2>
                    <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
                    <p className="text-[10px] text-white/40 tracking-widest uppercase max-w-lg mx-auto leading-loose text-center md:text-justify">
                        An algorithmic mechanical memory calculating leap years and lunar cycles for centuries. The ultimate mastery of astronomical mechanics seamlessly synchronized with your unique wrist motion.
                    </p>
                </div>
            </section>

            {/* Section 9: Origin - Tech Lab */}
            <section className="py-20 md:py-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 border-b border-white/5">
                 <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex-1 space-y-8">
                     <MapPin className="text-white/40 stroke-1" size={32} />
                     <h2 className="text-3xl sm:text-5xl md:text-7xl text-[#F0F0F0] font-serif font-light italic">The Brooklyn<br />Laboratory</h2>
                     <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                     <p className="text-[10px] tracking-widest uppercase text-white/40 leading-relaxed text-left md:text-justify">
                          Aetheria's headquarters in the heart of Brooklyn, New York. A sanctuary where artists and horological engineers coexist, intersecting American pioneering spirit with experimental 3D manufacturing.
                     </p>
                 </motion.div>
                 <div className="flex-1 w-full aspect-video border border-white/5 rounded-2xl relative overflow-hidden backdrop-blur-md">
                     <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent z-10 pointer-events-none"></div>
                     <img src={imgTitanium} className="w-full h-full object-cover grayscale mix-blend-screen opacity-70" />
                 </div>
            </section>

            {/* Section 10: Timeline (Craftsmanship) */}
            <section className="py-20 md:py-40 bg-transparent overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5"></div>
                    <div className="text-center mb-32">
                         <div className="-rotate-90 whitespace-nowrap text-[10px] tracking-[0.5em] uppercase opacity-40 italic absolute left-0 top-32 hidden md:block">Precision Engineered</div>
                         <Clock className="mx-auto text-white/40 stroke-1 mb-8" size={32} />
                         <h2 className="text-3xl sm:text-4xl md:text-6xl text-[#F0F0F0] font-serif font-light italic">14 Weeks of Patience</h2>
                         <p className="mt-8 text-[11px] font-bold tracking-[0.4em] opacity-50 uppercase">The Evolution of Form</p>
                    </div>

                    <div className="space-y-24 relative z-10">
                        {[{num: '01', title: 'Data Acquisition', desc: 'Capturing your unique wrist topography with 0.001mm precision using ultra-accurate LiDAR scanning.'},
                          {num: '02', title: 'Algorithmic Shaping', desc: 'Calculating the most optimized weight distribution and fluid dynamic case design through AI rendering.'},
                          {num: '03', title: 'Additive Forging', desc: 'Aerospace-grade 3D printers sinter elemental metal powders with lasers, forging form from the void.'},
                          {num: '04', title: 'Hand Polishing', desc: 'Master artisans hand-polish the surfaces, veiling mechanical coldness with profound artistic warmth.'}
                        ].map((step, idx) => (
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: idx * 0.1 }} key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left md:order-2'}`}>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light italic text-[#F0F0F0]">{step.title}</h3>
                                    <p className="mt-4 text-[10px] tracking-widest text-white/40 uppercase leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0 text-center md:text-inherit">{step.desc}</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center relative z-10 shrink-0 md:order-1 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    <span className="font-sans text-[11px] tracking-widest text-white font-bold">{step.num}</span>
                                </div>
                                <div className={`flex-1 hidden md:block ${idx % 2 === 0 ? 'md:order-3' : 'md:order-0'}`}></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 11: Process Grid */}
            <section className="border-t border-b border-white/5 bg-[#050505] py-32 px-6">
                 <div className="max-w-7xl mx-auto">
                     <h2 className="text-4xl md:text-5xl font-serif font-light italic text-center mb-24 text-[#F0F0F0]">The Tailored Algorithm</h2>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
                         {[ {icon: <ScanFace size={32}/>, title: "Precision Mapping"},
                            {icon: <Combine size={32}/>, title: "Topology Optimization"},
                            {icon: <Hammer size={32}/>, title: "Micro-milling"},
                            {icon: <Box size={32}/>, title: "Vacuum Sealed"}].map((feature, idx) => (
                             <div key={idx} className="bg-[#050505] p-12 text-center flex flex-col items-center justify-center space-y-6 hover:bg-white/[0.02] transition-colors duration-500">
                                 <span className="text-white/40 stroke-1">{feature.icon}</span>
                                 <h4 className="font-sans text-[10px] tracking-[0.4em] font-bold uppercase text-[#F0F0F0]">{feature.title}</h4>
                             </div>
                         ))}
                     </div>
                 </div>
            </section>

            {/* Section 12: Sustainability */}
            <section className="py-20 md:py-40 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
                 <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl sm:text-5xl md:text-7xl font-serif font-light italic leading-snug mb-12 text-[#F0F0F0]">
                      Zero Waste,<br />Infinite Beauty
                 </motion.h2>
                 <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>
                 <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white/40 max-w-2xl text-[10px] uppercase tracking-widest leading-loose text-center md:text-justify mx-auto font-light">
                      While traditional horological milling wastes 80% of raw metal, Aetheria's 3D additive tech consumes only the exact required powder. True luxury is not the ostentation of resources, but preserving a noble metaphor for nature.
                 </motion.p>
            </section>

            {/* Section 13: Lookbook */}
            <section className="min-h-screen relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center py-20 md:py-40 border-t border-b border-white/5">
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-white/5 z-0"></div>
                 <div className="absolute left-10 md:left-20 top-0 bottom-0 w-[1px] bg-white/5 z-0"></div>
                 <div className="absolute top-10 left-10 md:left-24 text-[10px] tracking-[0.4em] font-bold text-white/50 uppercase z-20 bg-[#050505] px-4 py-2 border border-white/10 rounded-full">Campaign [Ascension]</div>
                 <motion.div initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="w-full max-w-[90vw] md:max-w-[80vw] px-0 aspect-video md:aspect-[21/9] relative z-10 p-2 md:p-4 border border-white/5 rounded-3xl backdrop-blur-sm bg-white/[0.02]">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl z-20 pointer-events-none mix-blend-overlay"></div>
                     <img src={imgMovement} className="w-full h-full object-cover grayscale opacity-90 rounded-2xl mix-blend-screen" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent rounded-2xl z-10 pointer-events-none"></div>
                 </motion.div>
                 <div className="mt-[-30px] md:mt-[-60px] text-center z-30 mix-blend-difference flex flex-col items-center">
                     <h3 className="font-serif font-light italic text-4xl sm:text-6xl md:text-[8rem] text-[#F0F0F0]">The New Silhouette</h3>
                     <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold mix-blend-normal bg-[#050505] px-8 py-2 border border-white/10">Beyond Tradition</p>
                 </div>
            </section>

            {/* Section 14: Interactive Artifact Viewer */}
            <section className="min-h-screen bg-transparent py-20 md:py-40 px-6 flex flex-col items-center justify-center border-b border-white/5 perspective-[1500px]">
                <div className="text-center mb-16">
                     <h2 className="text-3xl sm:text-5xl text-[#F0F0F0] font-serif font-light italic mb-6">The Artifact</h2>
                     <p className="text-[10px] uppercase tracking-[0.4em] opacity-50 font-bold">Simulated Dimension Viewer</p>
                </div>
                
                <div 
                    className="relative w-full max-w-md aspect-square lg:max-w-xl mx-auto"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div 
                        style={{ rotateX, rotateY }} 
                        className="w-full h-full transform-style-preserve-3d relative flex items-center justify-center group"
                    >
                         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl rotate-[5deg] backdrop-blur-sm z-10 shadow-2xl transition-transform duration-1000 group-hover:rotate-[0deg]"></div>
                         <div className="absolute inset-4 bg-gradient-to-tl from-white/5 to-transparent border border-white/5 rounded-2xl rotate-[-2deg] backdrop-blur-md z-0 transition-transform duration-1000 group-hover:rotate-[0deg]"></div>
                         
                         <img src={imgBlueprint} className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] object-cover grayscale mix-blend-screen opacity-50 group-hover:scale-105 transition-transform duration-1000 rounded-xl z-20" />
                         <Rotate3D size={48} className="text-white/40 absolute stroke-1 opacity-50 group-hover:opacity-10 transition-opacity z-30" />
                         
                         <div className="absolute top-0 right-[-40px] text-[9px] uppercase tracking-widest border-l border-white/20 pl-4 py-2 opacity-60 z-30 hidden md:block">
                           [01] Simulated Physics<br/><span className="text-white/30">Aerogel Render</span>
                         </div>
                         <div className="absolute bottom-20 left-[-60px] text-[9px] uppercase tracking-widest border-r border-white/20 pr-4 py-2 opacity-60 text-right z-30 hidden md:block">
                           [04] Depth Field<br/><span className="text-white/30">Haptic Control v.2</span>
                         </div>

                         <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none flex flex-col items-center z-40 rounded-b-2xl">
                             <p className="text-white uppercase tracking-widest text-[9px] flex items-center gap-3">
                                 <Rotate3D size={14} className="stroke-1"/> Hover & Draft to Rotate
                             </p>
                         </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
