import { Asterisk } from 'lucide-react';

import imgTitanium from '../assets/images/titanium_watch_1780740853118.png';
import imgBlueprint from '../assets/images/watch_blueprint_1780740811185.png';
import imgMovement from '../assets/images/watch_movement_1780740795872.png';
import imgCrystal from '../assets/images/crystal_watch_1780740840061.png';

const complications = [
    {
        id: "01",
        title: "Kinetic Isolation",
        subtitle: "Zero-G Suspension",
        desc: "기계식 무브먼트를 특수 합성 오일 배스에 띄워 외부의 모든 물리적 충격을 무효화합니다. 중력을 거스르는 완전한 형태의 키네틱 아이솔레이션. 어떠한 격렬한 움직임 속에서도 절대적인 평온을 유지합니다.",
        image: imgTitanium,
    },
    {
        id: "02",
        title: "Lunar Calibration",
        subtitle: "Astronomical Accuracy",
        desc: "수 세기에 걸친 윤년과 달의 위상 변화를 기계식 메모리로 완벽하게 추적합니다. 천체의 규칙성을 작은 톱니바퀴 안에 담아낸 우주적 정밀함. 자연의 거대한 주기를 손목 위에서 통제하십시오.",
        image: imgBlueprint,
    },
    {
        id: "03",
        title: "Perpetual Escapement",
        subtitle: "Frictionless Motion",
        desc: "마찰을 극적으로 줄인 실리콘 이스케이프먼트는 윤활유 없이도 영구적인 박동을 유지합니다. 기계식 시계의 고질적인 한계를 극복한 진화. 시간이 멈출 때까지 박동하는 불가역의 심장입니다.",
        image: imgMovement,
    },
    {
        id: "04",
        title: "Acoustic Resonance",
        subtitle: "Crystalline Chime",
        desc: "마이크로 가공된 크리스탈 사파이어 공을 사용한 미닛 리피터. 내부의 복잡한 해머가 가장 순수하고 투명한 소리를 타격하며 당신의 공간에 시간의 흐름을 맑게 각인합니다.",
        image: imgCrystal,
    }
];

export function Part5() {
    return (
        <div className="w-full text-[#F0F0F0] relative z-20 bg-[#050505]">
            <section className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
                <div className="text-center mb-32">
                    <Asterisk className="mx-auto text-white/40 stroke-1 mb-8" size={32} />
                    <h2 className="text-5xl md:text-7xl font-serif font-light italic mb-6">The Master<br />Complications</h2>
                    <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8 mb-8"></div>
                    <p className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/50">Chronometric Innovations</p>
                </div>
                
                <div className="relative flex flex-col pb-32" style={{ gap: '20vh' }}>
                    {complications.map((item, index) => (
                        <div 
                            key={index}
                            className="sticky w-full min-h-[60vh] border border-white/10 rounded-3xl overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row transform transition-all duration-500 will-change-transform bg-[#050505]"
                            style={{ 
                                zIndex: index,
                                top: `calc(15vh + ${index * 40}px)`,
                            }}
                        >
                             <div className="flex-1 p-10 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
                                 {/* Background glow per card */}
                                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0 pointer-events-none"></div>

                                 <div className="absolute top-8 right-8 text-[6rem] md:text-[8rem] font-serif font-light italic text-white/[0.03] leading-none select-none z-0">
                                     {item.id}
                                 </div>
                                 
                                 <div className="relative z-10">
                                     <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50 mb-4">{item.subtitle}</h3>
                                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light italic mb-8">{item.title}</h2>
                                     <div className="h-[1px] w-12 bg-white/20 mb-8"></div>
                                     <p className="text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-white/40 uppercase leading-loose text-justify max-w-md">
                                         {item.desc}
                                     </p>
                                 </div>
                             </div>
                             <div className="flex-[0.8] relative h-64 md:h-auto border-l border-white/5">
                                 <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent mix-blend-overlay z-10 pointer-events-none border-l border-white/5"></div>
                                 <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-70 mix-blend-screen" />
                             </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
