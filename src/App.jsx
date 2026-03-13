import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react'; 
import Envelope from './Envelope';

function App() {
  const [isSiteVisible, setIsSiteVisible] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
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
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleRSVP = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nome = formData.get('nome');
    const presenza = formData.get('presenza');
    const numeroPersone = formData.get('numeroPersone');
    const allergie = formData.get('allergie') || "Nessuna";

    const numeroWhatsApp = "393342081262"; 
    
    const messaggio = `Ciao Krizia e Davide! %0A%0A` + 
                      `Sono *${nome}* %0A` + 
                      `👉 *${presenza}* %0A` + 
                      `👨‍👩‍👧‍👦 Siamo in: *${numeroPersone}* %0A` + 
                      `⚠️ Note/Allergie: ${allergie}`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${messaggio}`, '_blank');
  };

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

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio+di+Krizia+e+Davide&dates=20260602T090000Z/20260602T180000Z&details=Vi+aspettiamo+per+festeggiare+insieme!&location=Casina+di+Poggio+della+Rota,+Bassano+Romano`;

  return (
    <>
      <audio ref={audioRef} src="/Musica matrimonio.mp3" loop preload="auto" />

      {!isSiteVisible && (
        <Envelope onOpen={() => setIsSiteVisible(true)} onPlayMusic={handleStartMusic} />
      )}

      {isSiteVisible && isMusicPlaying && (
        <button onClick={toggleMute} className="fixed bottom-6 right-6 z-50 p-4 bg-stone-800/70 text-white rounded-full shadow-lg backdrop-blur-md border border-white/20">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {isSiteVisible && (
        <motion.div className="font-sans text-stone-800 bg-[#FAF9F6] min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          
          {/* 1. HERO SECTION */}
          <section className="h-[100svh] relative flex flex-col justify-center items-center text-center p-4 overflow-hidden bg-white">
            
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.6] md:scale-100 origin-center">
              <source src="/video torta.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-white/10 z-10"></div> 
            
            <div className="z-20 flex flex-col items-center w-full max-w-lg md:max-w-4xl px-2 md:px-4">
              
              <div 
                className="w-full px-2 py-8 md:px-16 md:py-16 
                           bg-[radial-gradient(circle,rgba(255,255,255,0.7)_20%,rgba(255,255,255,0)_75%)] md:bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_80%)] 
                           backdrop-blur-[2px] md:backdrop-blur-sm 
                           text-stone-800 flex flex-col items-center cursor-default"
              >
                <p className="font-sans tracking-[0.15em] uppercase mb-4 text-xs md:text-sm font-bold text-stone-700 drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                  Vi invitiamo, insieme a partner e figli,<br className="md:hidden" /> al nostro matrimonio
                </p>
                
                <h1 className="font-serif text-6xl md:text-8xl mb-6 italic leading-tight flex flex-col md:flex-row items-center gap-1 md:gap-6 drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
                  <span>Krizia</span>
                  <span className="font-sans text-4xl md:text-7xl opacity-60 font-light">&</span>
                  <span>Davide</span>
                </h1>
                
                <p className="font-sans text-xl md:text-2xl font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                  2 Giugno 2026
                </p>
              </div>
              
              <a 
                href="#rsvp" 
                className="font-sans mt-8 md:mt-10 border border-stone-400 px-8 py-4 uppercase tracking-widest text-xs md:text-sm bg-white/70 md:bg-stone-100/20 backdrop-blur-md text-stone-800 font-bold shadow-lg transition-all duration-200 hover:bg-stone-800 hover:text-white hover:border-stone-800 active:bg-stone-800 active:text-white active:scale-95 rounded-none"
              >
                Conferma Presenza
              </a>
            </div>

            {/* INDICATORE DI SCORRIMENTO */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-stone-700 opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }} 
            >
              <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                Scorri per maggiori informazioni
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown size={20} className="drop-shadow-[0_0_8px_rgba(255,255,255,1)]" />
              </motion.div>
            </motion.div>

          </section>

          {/* 2. COUNTDOWN */}
          <section className="py-16 bg-white text-center px-4">
            <h2 className="font-serif text-3xl mb-10 text-stone-600 italic">Mancano solo...</h2>
            <div className="flex justify-center gap-4 md:gap-8 max-w-lg mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center w-16 md:w-24">
                  <span className="font-serif text-4xl md:text-5xl text-stone-800 mb-2">{value}</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-stone-400">{unit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. FRASE */}
          <section className="py-16 bg-[#FAF9F6] text-center px-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-10 h-[1px] bg-stone-400 mb-10"></div>
              <h2 className="font-serif text-2xl md:text-4xl italic text-stone-700 leading-relaxed px-2 text-center">
                "Abbiamo deciso di percorrere insieme il viaggio della vita e non c'è gioia più grande che condividerne l'inizio con le persone che amiamo."
              </h2>
              <div className="w-10 h-[1px] bg-stone-400 mt-10"></div>
            </div>
          </section>

          {/* 4. DETTAGLI EVENTO */}
          <section className="py-16 bg-white px-4 border-t border-stone-100">
            <div className="max-w-xl mx-auto text-center">
              <div className="p-8 md:p-12 bg-[#FAF9F6] shadow-xl border border-stone-100 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#d5c5b3]"></div>
                
                <h3 className="font-serif text-3xl md:text-4xl mb-4 italic text-stone-800">Il Matrimonio</h3>
                
                <div className="inline-block border-b border-t border-stone-200 py-4 my-4">
                  <p className="font-sans text-stone-700 uppercase text-xs md:text-sm tracking-[0.2em] font-bold">
                    Cerimonia & Pranzo
                  </p>
                  <p className="font-serif italic text-stone-500 text-sm md:text-base mt-2 px-4">
                    Si terranno entrambi presso la stessa location
                  </p>
                </div>

                <div className="my-8">
                  <p className="font-sans text-stone-400 uppercase text-xs tracking-widest mb-3 font-semibold">Inizio alle ore 11:00</p>
                  <p className="font-sans font-bold text-xl md:text-2xl text-stone-700 mb-2">Casina di Poggio della Rota</p>
                  <p className="font-sans text-stone-500 text-sm md:text-base tracking-wide">Bassano Romano (VT)</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <a href="https://share.google/jmGM4mhHfumAxYPBS" target="_blank" rel="noreferrer" className="font-sans w-full bg-stone-800 text-white py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest hover:bg-stone-700 active:scale-95 transition shadow-md rounded-sm">Apri Mappa</a>
                  <a href={googleCalendarLink} target="_blank" rel="noreferrer" className="font-sans w-full border border-stone-300 text-stone-600 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest hover:bg-stone-50 active:scale-95 transition shadow-sm rounded-sm">Aggiungi al Calendario</a>
                </div>
              </div>
            </div>
          </section>

          {/* 5. LISTA NOZZE */}
          <section className="py-20 bg-[#ebe6df] px-6 text-center">
            <div className="max-w-xl mx-auto">
               <h2 className="font-serif text-3xl md:text-4xl italic text-stone-800 mb-6">Un pensiero per noi</h2>
               <p className="font-serif text-stone-600 text-base md:text-lg mb-10 leading-relaxed italic">"La vostra presenza è per noi il dono più bello. Se tuttavia desiderate farci un pensiero, sarà gradito."</p>
               <div className="bg-white p-8 md:p-10 shadow-sm border border-stone-200 rounded-sm">
                  <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mb-3 font-semibold">Coordinate Bancarie</p>
                  <p className="font-mono text-stone-700 tracking-wider break-all text-sm md:text-lg mb-6 font-medium">IT46 Y032 6822 3000 5242 2747 860</p>
                  
                  <div className="flex flex-col gap-3 text-left bg-stone-50 p-4 rounded-sm">
                    <p className="font-serif text-sm md:text-base text-stone-600 italic">
                      <span className="font-sans font-bold not-italic uppercase text-[10px] md:text-xs text-stone-400 tracking-widest mr-2">Intestato a:</span> 
                      Davide Moscatelli o Krizia Piciucchi
                    </p>
                    <p className="font-serif text-sm md:text-base text-stone-600 italic">
                      <span className="font-sans font-bold not-italic uppercase text-[10px] md:text-xs text-stone-400 tracking-widest mr-2">Causale:</span> 
                      Regalo di matrimonio
                    </p>
                  </div>
               </div>
            </div>
          </section>

          {/* 6. RSVP FORM WHATSAPP */}
          <section id="rsvp" className="py-20 bg-stone-900 text-white px-6 text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 italic">Ci sarai?</h2>
            <p className="font-sans mb-10 text-stone-300 text-sm md:text-base tracking-wide leading-relaxed">
              L'invito è esteso a partner e figli.<br className="hidden md:block"/>
              Confermate la presenza via WhatsApp entro il <span className="font-bold text-white">2 Maggio 2026</span>.
            </p>
            
            <form onSubmit={handleRSVP} className="font-sans max-w-md mx-auto flex flex-col gap-6 text-left">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400 font-semibold">Nome e Cognome</label>
                <input type="text" name="nome" required className="w-full p-4 bg-stone-800 border-none text-white rounded-sm focus:ring-1 focus:ring-white/40 outline-none transition" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400 font-semibold">Parteciperai?</label>
                  <select name="presenza" className="w-full p-4 bg-stone-800 border-none text-white rounded-sm appearance-none outline-none focus:ring-1 focus:ring-white/40 transition">
                    <option value="Sì, non vedo l'ora!">Sì, non vedo l'ora!</option>
                    <option value="Purtroppo non potrò esserci">Purtroppo non potrò esserci</option>
                  </select>
                </div>
                <div className="md:w-32">
                  <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400 font-semibold">Numero partecipanti</label>
                  <input type="number" name="numeroPersone" min="1" max="10" defaultValue="1" required className="w-full p-4 bg-stone-800 border-none text-white rounded-sm outline-none focus:ring-1 focus:ring-white/40 transition" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 text-stone-400 font-semibold">Allergie o Intolleranze?</label>
                <textarea name="allergie" rows="2" placeholder="Es. Celiachia, menu vegetariano..." className="w-full p-4 bg-stone-800 border-none text-white rounded-sm outline-none focus:ring-1 focus:ring-white/40 transition"></textarea>
              </div>
              <button type="submit" className="mt-6 w-full bg-white text-stone-900 py-4 font-bold uppercase tracking-widest text-sm hover:bg-stone-200 active:scale-95 transition shadow-lg rounded-sm">
                Invia Conferma su WhatsApp
              </button>
            </form>
          </section>
          
        </motion.div>
      )}
    </>
  );
}

export default App;