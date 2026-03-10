"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// --- Configurazione Immagini ---
// L'utente deve sostituire questi segnaposto con gli URL reali delle immagini.
const IMAGE_CLOSED_URL = "/image_closed.PNG"; // Sostituisci con il vero percorso
const IMAGE_OPEN_URL = "/image_open.PNG"; // Sostituisci con il vero percorso

// --- Configurazione Testo ---
const TEXT_H1 = "Invito di matrimonio";
const TEXT_H2 = "CLICCA PER APRIRE";

// Durata totale dell'animazione prima di passare alla landing page
const OPEN_DURATION = 2000; 

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

    // Dopo la sfumatura e il ritardo, vai alla landing
    timeoutRef.current = window.setTimeout(() => {
      onOpen?.();
    }, OPEN_DURATION);
  };

  return (
    <motion.div
      // Sfondo principale scuro per l'animazione
      className="fixed inset-0 z-50 overflow-hidden bg-[#ECE7DC] h-[100dvh] w-screen"
      initial={{ opacity: 1 }}
      animate={isOpening ? { opacity: 0, filter: "blur(5px)" } : { opacity: 1, filter: "blur(0px)" }}
      transition={
        isOpening
          ? { duration: 1, delay: 0.8, ease: "easeInOut" } // Sfumatura profonda verso la landing
          : { duration: 0.3 }
      }
    >
      <button
        type="button"
        onClick={handleOpen}
        disabled={isOpening}
        aria-label="Apri l'invito"
        className="relative block h-full w-full cursor-pointer outline-none overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        {/* --- Immagini di Sfondo con Sfumatura --- */}
        <div className="absolute inset-0 z-0">
          {/* Immagine 1: Busta Chiusa (con sigillo) */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGE_CLOSED_URL})` }}
            initial={{ opacity: 1 }}
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.65, 0, 0.35, 1] }} 
          />

          {/* Immagine 2: Busta Aperta (generata, con sigillo rimosso e lembi sollevati) */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGE_OPEN_URL})` }}
            initial={{ opacity: 0 }}
            animate={isOpening ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.65, 0, 0.35, 1] }} 
          />
        </div>

        {/* --- Testi Sovrapposti --- */}
        {/* Ho modificato translate-y per spingere il testo più in basso ed evitare il sigillo */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-40 w-full -translate-x-1/2 translate-y-48 md:translate-y-95 text-center pointer-events-none px-4"
          animate={isOpening ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-[#6B645A] font-serif text-3xl md:text-4xl italic tracking-wide mb-3">
            {TEXT_H1}
          </p>
          <motion.p
            className="text-[#968C7E] uppercase tracking-[0.25em] text-[10px] md:text-sm font-light mt-4"
            animate={isOpening ? { opacity: 0 } : { opacity: [0.3, 0.8, 0.3] }}
            transition={isOpening ? { duration: 0.2 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            {TEXT_H2}
          </motion.p>
        </motion.div>
      </button>
    </motion.div>
  );
}