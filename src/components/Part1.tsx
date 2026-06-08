import { motion } from 'motion/react';
import { ChevronDown, Fingerprint, Layers, Cpu, Compass } from 'lucide-react';

import imgTitanium from '../assets/images/titanium_watch_1780740853118.png';
import imgMovement from '../assets/images/watch_movement_1780740795872.png';
import imgBlueprint from '../assets/images/watch_blueprint_1780740811185.png';
import imgCrystal from '../assets/images/crystal_watch_1780740840061.png';

export function Part1() {
    return (
        <div className="w-full">
            {/* Section 1: Hero */}
            <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/5">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-1/4 left-10 text-[9px] uppercase tracking-widest border-l border-white/20 pl-4 py-2 hidden md:block z-20"
                >
                    [01] Masterpiece<br/><span className="text-white/30">Horology Engine</span>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-1/4 right-10 text-[9px] uppercase tracking-widest border-r border-white/20 pr-4 py-2 text-right hidden md:block z-20"
                >
                    [02] Caliber<br/><span className="text-white/30">Perpetual Dynamics</span>
                </motion.div>

                {/* Ken Burns Elegant Parallax Zoom Background */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.15, filter: "blur(4px)" }} 
                    animate={{ opacity: 0.65, scale: 1, filter: "blur(0px)" }} 
                    transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }} 
                    className="absolute inset-0"
                >
                    <img src={imgTitanium} alt="Abstract 3D Luxury" className="w-full h-full object-cover mix-blend-screen grayscale opacity-50" />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4 select-none">
                    {/* Masthead mask transition */}
                    <div className="overflow-hidden py-4">
                        <motion.h1 
                            initial={{ y: "105%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-7xl md:text-[10rem] font-serif font-light italic leading-none tracking-tighter text-[#F0F0F0] drop-shadow-[0_10px_50px_rgba(255,255,255,0.05)]"
                        >
                            Aetheria<span className="text-5xl md:text-8xl not-italic">.</span><span className="text-5xl md:text-8xl italic">01</span>
                        </motion.h1>
                    </div>

                    {/* Elegant Divider expansion from center out */}
                    <motion.div 
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8 mb-8 origin-center"
                    />

                    {/* Slow tracking expansion and fade effect */}
                    <div className="overflow-hidden">
                        <motion.p 
                            initial={{ letterSpacing: "1.5em", opacity: 0, y: 15 }}
                            animate={{ letterSpacing: "0.8em", opacity: 0.4, y: 0 }}
                            transition={{ delay: 1.0, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[10px] md:text-[11px] uppercase text-white font-bold ml-[0.8em]"
                        >
                            New York • Dimensional Perfection
                        </motion.p>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 2.6, duration: 1.2, repeat: Infinity, repeatType: "reverse" }} 
                    className="absolute bottom-12 z-10 text-white/30 cursor-pointer"
                >
                    <ChevronDown size={24} className="stroke-1" />
                </motion.div>
            </section>

            {/* Section 2: The Vision */}
            <section className="min-h-screen flex items-center justify-center px-6 py-48 border-b border-white/5 bg-transparent relative overflow-hidden">
                <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 transform md:-translate-x-1/2"></div>
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="max-w-5xl text-center relative z-10 bg-[#050505] p-12 lg:p-24 border border-white/5 shadow-2xl">
                    <Fingerprint className="mx-auto mb-16 text-white/40 stroke-1" size={48} />
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-light italic leading-relaxed text-[#F0F0F0] mx-auto mix-blend-difference">
                        "True luxury is born in spaces that defy limitations.<br/>We shatter boundaries to sculpt unprecedented perfection."
                    </h2>
                    <div className="h-[1px] w-1/4 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mt-16 mb-8"></div>
                    <p className="text-white/40 tracking-[0.4em] text-[10px] uppercase font-bold">The Zenith of American Design</p>
                </motion.div>
            </section>

            {/* Section 3: Manufacturing Concept */}
            <section className="min-h-screen py-20 md:py-32 px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-7xl mx-auto border-t border-white/5">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex-1 space-y-8">
                    <div className="flex items-start gap-4">
                        <span className="text-[10px] border border-white/20 w-6 h-6 flex items-center justify-center shrink-0 mt-1">01</span>
                        <div>
                            <p className="text-[11px] font-bold tracking-widest uppercase mb-1">The Architecture</p>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light italic mt-4 mb-6">3D Additive<br />Renaissance</h2>
                            <p className="text-[10px] text-white/40 leading-relaxed text-left md:text-justify max-w-md">
                                3D additive micro-engineering that tolerates zero margin of error. Every Aetheria timepiece is rendered in our Brooklyn laboratory, calculating unique volumes and light refractions tailored to your exact wrist topography.
                            </p>
                        </div>
                    </div>
                </motion.div>
                <div className="flex-1 w-full aspect-[4/5] relative overflow-hidden border border-white/5 rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
                    <motion.img initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} src={imgMovement} alt="3D Process" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
            </section>

            {/* Section 4: Carbon Matrix */}
            <section className="min-h-screen py-20 md:py-32 bg-transparent relative border-t border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
                    <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} src={imgBlueprint} className="w-full h-full object-cover grayscale blur-sm mix-blend-screen" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full pt-32">
                    <Layers className="text-white/40 stroke-1 mb-8" size={32} />
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif font-light italic tracking-tight mb-8">Carbon<br />Matrix 3.0</h2>
                    <div className="h-[1px] w-1/4 bg-white/20 mb-8"></div>
                    <p className="text-[10px] tracking-widest text-white/40 max-w-sm leading-loose text-left md:text-justify uppercase">
                        Carbon composites utilized in next-generation aerospace. Extreme lightness and diamond-equivalent strength form the foundational chassis of Aetheria. Experience transcendent horological durability.
                    </p>
                </div>
            </section>

            {/* Section 5: Aero Titanium */}
            <section className="min-h-screen py-20 md:py-32 px-6 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 max-w-7xl mx-auto">
                 <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex-1 space-y-8 pl-0 md:pl-24">
                    <div className="flex items-start gap-4">
                        <span className="text-[10px] border border-white/20 w-6 h-6 flex items-center justify-center shrink-0 mt-1">02</span>
                        <div>
                            <p className="text-[11px] font-bold tracking-widest uppercase mb-1">The Metal</p>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light italic mt-4 mb-6">Aero-Grade<br />Titanium</h2>
                            <p className="text-[10px] text-white/40 leading-relaxed text-left md:text-justify max-w-md uppercase tracking-widest">
                                Hermetic titanium machining that exceeds military specifications. The aesthetics of endurance against heat and pressure transition through a 3D milling core to rebirth as the coldest, most elegant metallic horology.
                            </p>
                        </div>
                    </div>
                </motion.div>
                <div className="flex-1 w-full aspect-square relative overflow-hidden border border-white/5 rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent z-10 pointer-events-none"></div>
                    <motion.img initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} src={imgTitanium} alt="Titanium" className="w-full h-full object-cover invert grayscale opacity-80 mix-blend-screen" />
                </div>
            </section>

            {/* Section 6: Collection - The Timepiece */}
            <section className="min-h-screen relative flex items-center justify-center p-6 border-t border-white/5 bg-transparent overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-40 blur-3xl z-0 pointer-events-none"></div>
                <div className="absolute inset-0 z-0">
                    <img src={imgCrystal} className="w-full h-full object-cover grayscale opacity-20 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative z-10 text-center space-y-12 max-w-3xl">
                    <Compass className="mx-auto text-white/40 stroke-1" size={40} />
                    <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50">Collection 01</h3>
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif font-light italic leading-none tracking-tighter mix-blend-difference mb-4">The Monolith<br />Timepiece</h2>
                    <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
                    <p className="text-white/40 max-w-lg mx-auto font-light space-y-4 text-center md:text-justify text-[10px] tracking-widest uppercase">
                        A flawless case carved from a single titanium block through 400 hours of 3D cutting. The absolute vessel for time.
                    </p>
                     <div className="flex justify-between items-end border-b border-white/10 pb-4 max-w-sm mx-auto mt-12 mb-8">
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">MSRP</span>
                        <span className="text-2xl font-serif italic">$14,200.00</span>
                    </div>
                    <button className="w-full max-w-sm mx-auto h-16 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-4 hover:bg-[#e0e0e0] transition-colors">
                        Secure Allocation
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                    <p className="text-center text-[9px] uppercase tracking-widest text-white/20 italic mt-4">Strictly Limited to 150 Serialized Pieces</p>
                </motion.div>
            </section>

            {/* Section 7: Collection - Spatial Audio */}
            <section className="min-h-screen py-20 md:py-32 px-6 flex flex-col md:flex-row items-center max-w-7xl mx-auto border-t border-white/5 gap-8 md:gap-16 relative">
                 <div className="flex-1 order-2 md:order-1 relative h-[35vh] md:h-[70vh] w-full border border-white/5 rounded-3xl overflow-hidden p-2">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl -z-10 blur-xl"></div>
                     <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} src={imgMovement} className="w-full h-full object-cover grayscale rounded-2xl mix-blend-screen" />
                 </div>
                 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex-1 order-1 md:order-2 space-y-10 pl-0 md:pl-16 relative z-10 w-full">
                    <Cpu className="text-white/40 stroke-1" size={36} />
                    <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50">Collection 02</h3>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light italic leading-none tracking-tighter">The Gravity<br />Tourbillon</h2>
                    <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent my-8"></div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <span className="text-[10px] border border-white/20 w-6 h-6 flex items-center justify-center shrink-0 mt-1">.V4</span>
                            <div>
                                <p className="text-[11px] font-bold tracking-widest uppercase mb-1">Gravity Counteraction</p>
                                <p className="text-[10px] text-white/40 leading-relaxed text-left md:text-justify uppercase tracking-widest font-light">
                                    A bespoke mechanical movement engineered to counteract Earth's gravitational pull. A multi-axis tourbillon suspended in a vacuum-sealed sapphire chamber, delivering pure chronometric precision.
                                </p>
                            </div>
                        </div>
                    </div>
                     <div className="flex justify-between items-end border-b border-white/10 pb-4 mt-12 mb-8">
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">MSRP</span>
                        <span className="text-2xl font-serif italic">$54,800.00</span>
                    </div>
                    <button className="w-full h-16 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-4 hover:bg-[#e0e0e0] transition-colors">
                        Explore Movement
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                 </motion.div>
            </section>
        </div>
    );
}
