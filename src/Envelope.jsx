import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope({ onOpen, onPlayMusic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Attivazione immediata della musica per bypassare i blocchi di Safari/Chrome
    if (onPlayMusic) onPlayMusic();

    // Sequenza: apertura (0.8s) + uscita lettera (1s) + lettura, poi zoom
    setTimeout(() => {
      setIsZooming(true);
      setTimeout(() => {
        onOpen();
      }, 1200); 
    }, 2800); 
  };

  const paperTexture = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")";

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-stone-900 z-50 p-4"
      animate={isZooming ? { opacity: 0, scale: 4 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Busta con proporzione fissa 3/2 */}
      <div 
        className="relative w-[92vw] max-w-2xl aspect-[3/2] cursor-pointer group shadow-2xl mt-12 md:mt-0" 
        onClick={handleOpen}
      >
        
        {/* Sfondo INTERNO */}
        <div className="absolute inset-0 bg-[#c7b098] shadow-[inset_0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundImage: paperTexture }}></div>
        </div>

        {/* La Lettera */}
        <motion.div 
          className="absolute left-4 right-4 bottom-2 bg-[#FAF9F6] flex flex-col items-center justify-start pt-8 md:pt-16 shadow-xl border border-stone-200"
          style={{ height: '90%', zIndex: 10, backgroundImage: paperTexture }}
          initial={{ y: 0 }}
          animate={isOpen ? { y: '-40%' } : { y: 0 }} 
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }} 
        >
           <h2 className="font-serif text-4xl md:text-6xl italic text-stone-700 mb-4 drop-shadow-sm">K & D</h2>
           <div className="w-16 md:w-24 h-[1px] bg-stone-300 mb-4"></div>
           <p className="text-stone-500 uppercase tracking-widest text-[10px] md:text-xs font-light">L'Invito</p>
        </motion.div>

        {/* Alette Laterali e Inferiore */}
        <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-lg">
          <div className="absolute inset-0 bg-[#e8ddcd]" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)', backgroundImage: paperTexture }}></div>
          <div className="absolute inset-0 bg-[#e8ddcd]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', backgroundImage: paperTexture }}></div>
          <div className="absolute inset-0 bg-[#ede3d4]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)', backgroundImage: paperTexture }}></div>
        </div>

        {/* Aletta SUPERIORE */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full origin-top drop-shadow-2xl"
          initial={{ rotateX: 0, zIndex: 30 }}
          animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
          transition={{ 
            rotateX: { duration: 0.8, ease: "easeInOut" },
            zIndex: { delay: 0.4 } 
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0 bg-[#f0e5d8]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', backfaceVisibility: 'hidden', backgroundImage: paperTexture }}
          >
            <div className="absolute inset-0 border-b border-white/60" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}></div>
          </div>
          
          <div 
            className="absolute inset-0 bg-[#c7b098]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', backgroundImage: paperTexture }}
          ></div>
        </motion.div>

        {/* Sigillo DORATO */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 z-40 flex items-center justify-center
                         bg-[radial-gradient(circle_at_35%_35%,#f3d060_0%,#cda036_50%,#876211_100%)]
                         shadow-[0_10px_15px_rgba(0,0,0,0.4),inset_0_-4px_8px_rgba(0,0,0,0.3)]"
              style={{ borderRadius: '52% 48% 51% 49% / 51% 49% 52% 48%' }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="absolute inset-[5px] md:inset-[8px] bg-[radial-gradient(circle_at_50%_50%,#dfb13b_0%,#9a7215_100%)] 
                           shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center border border-black/10"
                style={{ borderRadius: '50% 51% 49% 50% / 49% 50% 51% 50%' }}
              >
                <span 
                  className="font-serif text-[#ffeeb2] text-xl md:text-3xl italic font-semibold opacity-90 tracking-wide"
                  style={{ textShadow: '0 -1px 2px rgba(0,0,0,0.4), 0 1px 1px rgba(255,255,255,0.4)' }}
                >
                  K&D
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
           {!isOpen && (
             <motion.p 
               className="absolute -bottom-16 left-0 right-0 text-center text-stone-400 tracking-[0.4em] text-xs md:text-sm uppercase font-light"
               exit={{ opacity: 0 }}
             >
               Tocca il sigillo per aprire
             </motion.p>
           )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}