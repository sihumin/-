/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Part1 } from './components/Part1';
import { Part2 } from './components/Part2';
import { Part3 } from './components/Part3';
import { Part4 } from './components/Part4';

export default function App() {
  return (
    <main className="w-full bg-[#050505] text-[#F0F0F0] selection:bg-white/20 selection:text-white min-h-screen relative overflow-x-hidden font-sans">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[200] opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-40 blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] max-h-[70vh] rounded-full bg-gradient-to-tl from-[#222] to-transparent opacity-30 blur-3xl pointer-events-none z-0"></div>
      
      <nav className="fixed top-0 inset-x-0 h-16 flex items-center justify-between px-6 md:px-12 z-[100] border-b border-white/5 bg-[#050505]/50 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <span className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-50 hidden md:block">EST. 2026 / NYC</span>
          <div className="h-[1px] w-12 bg-white/20 hidden md:block"></div>
        </div>
        <div className="text-xl md:text-2xl font-serif tracking-widest text-[#F0F0F0]">Minsihu's portfolio</div>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-[10px] tracking-[0.3em] uppercase hidden md:block">Collection</span>
          <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 rounded-full flex items-center justify-center text-[10px]">01</div>
        </div>
      </nav>

      <div className="relative z-10 pt-16">
        <Part1 />
        <Part2 />
        <Part4 />
        <Part3 />
      </div>
    </main>
  );
}
