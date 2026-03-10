import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope({ onOpen, onPlayMusic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onPlayMusic(); // Fa partire l'audio nativo al clic

    setTimeout(() => {
      setIsZooming(true);
      setTimeout(() => { onOpen(); }, 1200);
    }, 2800);
  };

  const paperTexture = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")";

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-stone-900 z-50 p-4"
      animate={isZooming ? { opacity: 0, scale: 4 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <div className="relative w-[92vw] max-w-2xl aspect-[3/2] cursor-pointer shadow-2xl" onClick={handleOpen}>
        
        {/* Interno Busta */}
        <div className="absolute inset-0 bg-[#c7b098] shadow-[inset_0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundImage: paperTexture }}></div>
        </div>

        {/* Lettera K & D */}
        <motion.div 
          className="absolute left-4 right-4 bottom-2 bg-[#FAF9F6] flex flex-col items-center justify-start pt-12 shadow-xl border border-stone-200 z-10"
          style={{ height: '90%', backgroundImage: paperTexture }}
          initial={{ y: 0 }}
          animate={isOpen ? { y: '-35%' } : { y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
           <h2 className="font-serif text-5xl md:text-7xl italic text-stone-700 mb-6">K & D</h2>
           <div className="w-16 h-[1px] bg-stone-300 mb-6"></div>
           <p className="text-stone-500 uppercase tracking-widest text-xs">L'Invito</p>
        </motion.div>

        {/* Alette Laterali/Inferiori */}
        <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-lg">
          <div className="absolute inset-0 bg-[#e8ddcd]" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)', backgroundImage: paperTexture }}></div>
          <div className="absolute inset-0 bg-[#e8ddcd]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', backgroundImage: paperTexture }}></div>
          <div className="absolute inset-0 bg-[#ede3d4]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)', backgroundImage: paperTexture }}></div>
        </div>

        {/* Aletta Superiore (si apre verso l'alto) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full origin-top z-30"
          animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
          transition={{ rotateX: { duration: 0.8 }, zIndex: { delay: 0.4 } }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-[#f0e5d8]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', backfaceVisibility: 'hidden', backgroundImage: paperTexture }}></div>
          <div className="absolute inset-0 bg-[#c7b098]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', backgroundImage: paperTexture }}></div>
        </motion.div>

        {/* Sigillo Oro */}
        {!isOpen && (
          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-40 bg-[radial-gradient(circle_at_35%_35%,#f3d060_0%,#cda036_50%,#876211_100%)] rounded-full flex items-center justify-center shadow-xl border border-black/10">
            <span className="font-serif text-[#ffeeb2] text-xl italic font-semibold">K&D</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}