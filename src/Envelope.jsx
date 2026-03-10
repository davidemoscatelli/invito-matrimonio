"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const OPEN_DURATION = 1500;

export default function Envelope({ onOpen, onPlayMusic }) {
  const [isOpening, setIsOpening] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;

    onPlayMusic?.();
    setIsOpening(true);

    timeoutRef.current = window.setTimeout(() => {
      onOpen?.();
    }, OPEN_DURATION);
  };

  const paperTexture =
    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.04\'/%3E%3C/svg%3E")';

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#E4DCCB]" // Sfondo scuro per sicurezza
      initial={{ opacity: 1 }}
      animate={isOpening ? { opacity: 0, filter: "blur(5px)" } : { opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
    >
      <button
        type="button"
        onClick={handleOpen}
        disabled={isOpening}
        aria-label="Apri l'invito"
        className="relative block h-screen w-screen cursor-pointer outline-none overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        {/* INTERNO SCURO (Visibile solo quando l'aletta si alza) */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: "#C9BEA8", backgroundImage: paperTexture }} 
        />

        {/* --- ALETTE LATERALI (Livello base) --- */}
        <div
          className="absolute inset-0 z-10"
          style={{
            clipPath: "polygon(0 0, 50% 50%, 0 100%)",
            backgroundColor: "#EBE4D5",
            backgroundImage: paperTexture,
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
            backgroundColor: "#EBE4D5",
            backgroundImage: paperTexture,
          }}
        />

        {/* --- ALETTA INFERIORE (Sovrappone le laterali, crea la prima V) --- */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
            backgroundColor: "#F2ECE0",
            backgroundImage: paperTexture,
            // L'ombra applicata direttamente qui assicura che le linee si vedano
            filter: "drop-shadow(0px -6px 15px rgba(0,0,0,0.12))",
            WebkitFilter: "drop-shadow(0px -6px 15px rgba(0,0,0,0.12))"
          }}
        />

        {/* --- ALETTA SUPERIORE ANIMATA (Sovrappone tutto, crea la X completa) --- */}
        <motion.div
          className="absolute inset-0 z-30 origin-top pointer-events-none"
          initial={{ rotateX: 0 }}
          animate={isOpening ? { rotateX: -25 } : { rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            backgroundColor: "#FDFBF8",
            backgroundImage: paperTexture,
            // Cambia l'ombra mentre si apre
            filter: isOpening 
              ? "drop-shadow(0px 20px 20px rgba(0,0,0,0.3))" 
              : "drop-shadow(0px 6px 15px rgba(0,0,0,0.15))",
            WebkitFilter: isOpening 
              ? "drop-shadow(0px 20px 20px rgba(0,0,0,0.3))" 
              : "drop-shadow(0px 6px 15px rgba(0,0,0,0.15))",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* RETRO DELL'ALETTA SUPERIORE (Colore più scuro per dare profondità quando ruota in su) */}
        <motion.div
          className="absolute inset-0 z-25 origin-top pointer-events-none"
          initial={{ rotateX: 0, opacity: 0 }}
          animate={isOpening ? { rotateX: -25, opacity: 1 } : { rotateX: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            backgroundColor: "#D9CFBA",
            backgroundImage: paperTexture,
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* --- SIGILLO IN CERALACCA --- */}
        {/* Contenitore per centrare esattamente (non interferisce con le animazioni) */}
        <div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={
              isOpening
                ? { opacity: 0, scale: 1.1, y: -30, filter: "blur(4px)" }
                : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
            }
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex items-center justify-center h-24 w-24 md:h-32 md:w-32 rounded-full"
            style={{
              background: "linear-gradient(135deg, #A83333 0%, #681515 100%)",
              boxShadow: "inset 0 3px 5px rgba(255,255,255,0.2), inset 0 -4px 6px rgba(0,0,0,0.4), 0 3px 6px rgba(0,0,0,0.3)",
              border: "1px solid #570E0E"
            }}
          >
            <div className="absolute inset-[3px] rounded-full border border-[#D44C4C] opacity-40" />
            <div className="absolute inset-[6px] rounded-full border border-[#4D0B0B] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]" />
            
            <span className="font-serif italic text-4xl md:text-5xl text-[#F3E6E6] opacity-90 tracking-tighter" style={{ textShadow: "1px 2px 2px rgba(0,0,0,0.6)" }}>
              K&D
            </span>
          </motion.div>
        </div>

        {/* --- TESTI --- */}
        <motion.div
          className="absolute inset-x-0 bottom-[15%] md:bottom-[20%] z-40 text-center pointer-events-none"
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[#6B645A] font-serif text-2xl md:text-3xl italic tracking-wide mb-3">
            invito di matrimonio
          </p>
          <motion.p
            className="text-[#968C7E] uppercase tracking-[0.25em] text-[10px] md:text-xs font-light mt-4"
            animate={isOpening ? { opacity: 0 } : { opacity: [0.3, 0.8, 0.3] }}
            transition={isOpening ? { duration: 0.2 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            clicca per aprire
          </motion.p>
        </motion.div>
      </button>
    </motion.div>
  );
}