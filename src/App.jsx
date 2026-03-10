import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react'; // Icone per la musica
import Envelope from './Envelope';

function App() {
  const [isSiteVisible, setIsSiteVisible] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Stato per il tasto Muto
  
  const audioRef = useRef(null);
  
  const dataMatrimonio = "2026-06-02"; 
  const targetDate = new Date(`${dataMatrimonio}T11:00:00`).getTime();
  
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
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Errore audio:", e));
      setIsMusicPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const dateSenzaTrattini = dataMatrimonio.replace(/-/g, '');
  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio+di+Krizia+e+Davide&dates=${dateSenzaTrattini}T090000Z/${dateSenzaTrattini}T180000Z&details=Vi+aspettiamo+per+festeggiare+insieme!&location=Casina+di+Poggio+della+Rota,+Bassano+Romano`;

  return (
    <>
      {/* AUDIO LOCALE */}
      <audio 
        ref={audioRef} 
        src="/Musica matrimonio.mp3" 
        loop 
        preload="auto"
      />

      {/* COMPONENTE BUSTA */}
      {!isSiteVisible && (
        <Envelope 
          onOpen={() => setIsSiteVisible(true)} 
          onPlayMusic={handleStartMusic} 
        />
      )}

      {/* TASTO FLUTTUANTE PER LA MUSICA */}
      {isSiteVisible && isMusicPlaying && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-4 bg-stone-900/40 text-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md hover:bg-stone-800 transition-all border border-white/20"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {/* SITO PRINCIPALE */}
      {isSiteVisible && (
        <motion.div 
          className="font-sans text-stone-800 bg-[#FAF9F6] min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 1. HERO SECTION */}
          <section className="h-[100svh] relative flex flex-col justify-center items-center text-center p-4 overflow-hidden bg-stone-900">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
            >
              <source src="/12423708_1920_1080_25fps.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40 z-10"></div> 

            <div className="z-20 text-white flex flex-col items-center w-full px-4">
              <p className="tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 text-xs md:text-sm font-light">Siete invitati al matrimonio di</p>
              
              {/* TITOLO MODIFICATO: Verticale su mobile, orizzontale su desktop */}
              <h1 className="font-serif text-5xl md:text-8xl mb-6 italic drop-shadow-lg leading-tight flex flex-col md:flex-row items-center gap-2 md:gap-6">
                <span>Krizia</span>
                <span className="text-3xl md:text-7xl opacity-80">&</span>
                <span>Davide</span>
              </h1>

              <p className="text-lg md:text-2xl font-light tracking-widest">2 Giugno 2026</p>
              <a href="#rsvp" className="mt-16 border border-white px-8 py-3 md:py-4 uppercase tracking-widest text-xs md:text-sm hover:bg-white hover:text-stone-900 transition duration-300 w-[80%] max-w-[300px] backdrop-blur-sm bg-white/10">
                Conferma Presenza
              </a>
            </div>
          </section>

          {/* 2. COUNTDOWN */}
          <section className="py-16 md:py-24 bg-white text-center px-4">
            <h2 className="font-serif text-3xl md:text-4xl mb-10 text-stone-600 italic">Mancano solo...</h2>
            <div className="flex justify-center gap-4 md:gap-8 max-w-lg mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center w-16 md:w-24">
                  <span className="text-4xl md:text-5xl font-serif text-stone-800 mb-2">{value}</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400">{unit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. FRASE ROMANTICA */}
          <section className="py-16 md:py-20 bg-[#FAF9F6] text-center px-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-10 h-[1px] bg-stone-400 mb-10"></div>
              <h2 className="font-serif text-2xl md:text-4xl italic text-stone-700 leading-relaxed md:leading-loose px-2">
                "Abbiamo deciso di percorrere insieme il viaggio della vita, e non c'è gioia più grande che condividerne l'inizio con le persone che amiamo."
              </h2>
              <div className="w-10 h-[1px] bg-stone-400 mt-10"></div>
            </div>
          </section>

          {/* 4. DETTAGLI EVENTO */}
          <section className="py-16 md:py-24 bg-white px-4">
            <div className="max-w-xl mx-auto text-center">
              <div className="p-8 md:p-12 bg-[#FAF9F6] shadow-xl shadow-stone-200/50 border border-stone-100 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#d5c5b3]"></div>
                <h3 className="font-serif text-3xl md:text-4xl mb-6 italic text-stone-800">Il Matrimonio</h3>
                <div className="mb-8">
                  <p className="text-stone-500 uppercase tracking-widest text-sm mb-1">Ore 11:00</p>
                  <p className="text-stone-400 text-xs italic">Cerimonia & Ricevimento</p>
                </div>
                <div className="mb-10">
                  <p className="font-semibold text-lg text-stone-700 mb-2">Casina di Poggio della Rota</p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Località Poggio della Rota, 2<br/>
                    01030 Bassano Romano (VT)
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <a href="https://share.google/jmGM4mhHfumAxYPBS" target="_blank" rel="noreferrer" className="w-full bg-stone-800 text-white py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest hover:bg-stone-700 transition">
                    Apri Mappa
                  </a>
                  <a href={googleCalendarLink} target="_blank" rel="noreferrer" className="w-full bg-transparent border border-stone-300 text-stone-600 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest hover:border-stone-800 hover:text-stone-800 transition">
                    Aggiungi al Calendario
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 5. LISTA NOZZE */}
          <section className="py-20 md:py-24 bg-[#ebe6df] px-6 text-center">
            <div className="max-w-xl mx-auto">
               <h2 className="font-serif text-3xl md:text-4xl italic text-stone-800 mb-6 text-center">Un pensiero per noi</h2>
               <p className="text-stone-600 font-light text-sm md:text-base mb-10 leading-relaxed text-center">
                 La vostra presenza è per noi il dono più prezioso. Se tuttavia desiderate farci un ulteriore regalo, un contributo per aiutarci a realizzare il nostro viaggio di nozze sarà immensamente gradito.
               </p>
               <div className="bg-white p-8 shadow-sm border border-stone-200 rounded-sm">
                  <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">IBAN</p>
                  <p className="font-mono text-stone-700 tracking-wider md:text-lg mb-2 break-all">IT00 0000 0000 0000 0000 0000 000</p>
                  <p className="text-xs text-stone-400 italic">Intestato a Krizia e Davide</p>
               </div>
            </div>
          </section>

          {/* 6. RSVP FORM */}
          <section id="rsvp" className="py-20 md:py-32 bg-stone-900 text-white px-6 text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 italic text-center">Ci sarai?</h2>
            <p className="mb-10 md:mb-16 text-stone-400 font-light text-sm md:text-base text-center">Ti preghiamo di confermare la tua presenza entro il 2 Maggio 2026</p>
            
            <form className="max-w-md mx-auto flex flex-col gap-6 md:gap-8 text-left">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400">Nome e Cognome</label>
                <input type="text" name="nome" required className="w-full p-4 bg-stone-800 border-none text-white focus:ring-1 focus:ring-stone-400 outline-none rounded-sm transition-all" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400">Parteciperai?</label>
                <select name="presenza" required className="w-full p-4 bg-stone-800 border-none text-white focus:ring-1 focus:ring-stone-400 outline-none rounded-sm transition-all appearance-none">
                  <option value="Sì, non vedo l'ora!">Sì, non vedo l'ora!</option>
                  <option value="Purtroppo non potrò esserci">Purtroppo non potrò esserci</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400">Allergie o Intolleranze?</label>
                <textarea name="allergie" rows="2" placeholder="Es. Celiachia, intolleranza al lattosio, menu vegetariano..." className="w-full p-4 bg-stone-800 border-none text-white focus:ring-1 focus:ring-stone-400 outline-none rounded-sm transition-all"></textarea>
              </div>
              <button type="submit" className="mt-6 bg-white text-stone-900 py-4 font-semibold uppercase tracking-[0.2em] text-sm hover:bg-stone-200 transition rounded-sm shadow-lg">
                Invia Conferma
              </button>
            </form>
          </section>
          
        </motion.div>
      )}
    </>
  );
}

export default App;