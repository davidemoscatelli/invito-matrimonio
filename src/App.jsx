import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react'; 
import Envelope from './Envelope';

function App() {
  const [isSiteVisible, setIsSiteVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Countdown: 2 Giugno 2026
  const targetDate = new Date("2026-06-02T11:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ giorni: 0, ore: 0, minuti: 0, secondi: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          giorni: Math.floor(distance / (1000 * 60 * 60 * 24)),
          ore: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minuti: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secondi: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.5;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/Musica matrimonio.mp3" loop />

      {!isSiteVisible && (
        <Envelope 
          onOpen={() => setIsSiteVisible(true)} 
          onPlayMusic={handleStartMusic} 
        />
      )}

      {isSiteVisible && (
        <motion.div className="bg-[#FAF9F6] min-h-screen font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          
          {/* Hero con Video Tavolata */}
          <section className="h-screen relative flex flex-col justify-center items-center text-center overflow-hidden bg-stone-900">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
              <source src="/12423708_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="z-20 text-white px-4">
              <p className="tracking-widest uppercase text-xs mb-4">Siete invitati al matrimonio di</p>
              <h1 className="font-serif text-6xl md:text-8xl italic mb-6">Krizia & Davide</h1>
              <p className="text-lg tracking-widest">2 Giugno 2026</p>
              <a href="#rsvp" className="mt-16 inline-block border border-white px-8 py-3 text-xs uppercase tracking-widest backdrop-blur-sm bg-white/10">Conferma Presenza</a>
            </div>
          </section>

          {/* Countdown e restanti sezioni (Casina di Poggio della Rota) */}
          <section className="py-20 text-center px-4">
            <h2 className="font-serif text-3xl mb-10 text-stone-600 italic">Mancano solo...</h2>
            <div className="flex justify-center gap-6">
              {Object.entries(timeLeft).map(([unit, val]) => (
                <div key={unit} className="flex flex-col">
                  <span className="text-4xl font-serif">{val}</span>
                  <span className="text-[10px] uppercase text-stone-400">{unit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tasto Audio */}
          <button onClick={toggleMute} className="fixed bottom-6 right-6 z-50 p-4 bg-stone-900/40 text-white rounded-full backdrop-blur-md border border-white/20">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          {/* Sezioni RSVP e Lista Nozze... */}
          <section id="rsvp" className="py-20 bg-stone-900 text-white text-center px-6">
             <h2 className="font-serif text-4xl mb-10 italic">Ci sarai?</h2>
             {/* Qui puoi inserire il form RSVP */}
          </section>

        </motion.div>
      )}
    </>
  );
}

export default App;