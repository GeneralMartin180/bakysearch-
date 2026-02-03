
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Download, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Instagram,
  Monitor, 
  Smartphone,
  Search,
  ChevronRight,
  Sparkles,
  X,
  Check,
  Loader2,
  Lock,
  ShieldAlert,
  CheckCircle2,
  Shield,
  Activity,
  FileSearch,
  LockKeyhole
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Reusable Reveal Wrapper Component
const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const SecurityBadge = ({ text, icon: Icon }: { text: string, icon: any }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
    <Icon className="text-emerald-400" size={14} />
    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{text}</span>
  </div>
);

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [downloadStep, setDownloadStep] = useState<'idle' | 'scanning' | 'ready'>('idle');

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!hasAccepted) return;
    
    setDownloadStep('scanning');
    
    // Simulácia bezpečnostného skenu pred samotným sťahovaním
    setTimeout(() => {
      setDownloadStep('ready');
      setTimeout(() => {
        // Najnovší odkaz na priečinok
        window.open("https://drive.google.com/drive/folders/1w90P84XQBcWdVuXQX5i1OwLY_hvlFx3_?usp=drive_link", "_blank");
        setDownloadStep('idle');
        onClose();
      }, 500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-blue-500/30 shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-400" />
        </button>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={32} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-3xl font-bold">Bezpečnostná Garancia</h3>
              <p className="text-emerald-400 text-sm font-medium">Baky Search Shield v2.4 aktívny</p>
            </div>
          </div>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-emerald-500/10">
                <span className="text-sm font-semibold">Status inštalátora:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} /> 100% BEZPEČNÝ
                </span>
              </div>
              <p className="text-sm italic">
                "Preverili sme každý riadok kódu. Baky Search neobsahuje vírusy, spyware ani žiadny škodlivý kód. Tvoj počítač je v úplnom bezpečí."
              </p>
            </div>

            <section>
              <h4 className="text-lg font-bold text-blue-400 mb-2">Súkromie nadovšetko</h4>
              <p className="text-sm">Baky Search nezbiera žiadne tvoje dáta. To, čo vyhľadávaš, je tvoja vec. Aplikácia je súkromný projekt a nikdy nebude zneužitá na sledovanie.</p>
            </section>

            <section>
              <h4 className="text-lg font-bold text-blue-400 mb-2">Žiadne tretie strany</h4>
              <p className="text-sm">Tvoje údaje nikomu nepredávame. Bodka. Sme tu pre komunitu, nie pre korporáty.</p>
            </section>
          </div>

          <div className="mt-10 mb-8">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div 
                onClick={() => setHasAccepted(!hasAccepted)}
                className={`w-7 h-7 border-2 rounded-xl flex items-center justify-center transition-all duration-300 ${hasAccepted ? 'bg-blue-600 border-blue-600' : 'bg-white/5 border-white/20'}`}
              >
                {hasAccepted && <Check className="text-white" size={16} strokeWidth={3} />}
              </div>
              <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                Chápem a chcem sťahovať bezpečne
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleDownload}
              disabled={!hasAccepted || downloadStep !== 'idle'}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${
                hasAccepted 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20' 
                  : 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed'
              }`}
            >
              {downloadStep === 'scanning' ? (
                <>
                  <Loader2 size={20} className="animate-spin text-emerald-400" />
                  <span className="text-emerald-400 uppercase tracking-widest text-xs">Skenujem bezpečnosť...</span>
                </>
              ) : downloadStep === 'ready' ? (
                <>
                  <Check size={20} className="text-emerald-400" />
                  <span>Sťahovanie spustené!</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>Súhlasím a sťahujem</span>
                </>
              )}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-4 glass hover:bg-white/10 text-white rounded-2xl font-bold transition-all active:scale-95"
            >
              Zrušiť
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => (
  <Reveal delay={index * 150}>
    <div className="glass p-8 rounded-3xl hover:border-blue-500/50 transition-all duration-500 group h-full">
      <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/20">
        <Icon className="text-blue-400 group-hover:text-white transition-colors" size={32} />
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{description}</p>
    </div>
  </Reveal>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const runAiDemo = async () => {
    if (!query) return;
    setIsTyping(true);
    setAiResponse("");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Si asistent v prehliadači Baky Search. Krátko a cool odpovedz na: ${query}`,
      });
      setAiResponse(response.text || "Baky Search je pripravený!");
    } catch (error) {
      setAiResponse("Baky Search AI je momentálne v cloude, ale prehliadač funguje bleskovo!");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <div className="hero-glow" />

      {/* Privacy Modal */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Search className="text-white" size={20} />
            </div>
            <span className="text-2xl font-extrabold tracking-tighter">BAKY<span className="text-blue-400">SEARCH</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Funkcie</a>
            <a href="#security" className="hover:text-white transition-colors">Bezpečnosť</a>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="px-6 py-2.5 bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold shadow-xl hover:shadow-blue-500/20"
            >
              Stiahnuť
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Reveal>
            <div className="flex justify-center gap-4 mb-8">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-emerald-500/30 text-emerald-400 text-sm font-bold">
                <ShieldCheck size={16} />
                <span>Verified Clean: 0 Viruses Found</span>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-none">
              Najrýchlejší prehliadač.<br />
              <span className="gradient-text tracking-tighter">Bezpečný od základu.</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Baky Search spája brutálny výkon s neprekonateľnou bezpečnosťou. Žiadne sledovanie, žiadne vírusy, len čistá rýchlosť.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col gap-6 justify-center items-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95"
                >
                  <Download size={24} /> Stiahnuť Baky Search
                </button>
                <button className="w-full sm:w-auto px-10 py-5 glass hover:bg-white/10 text-white rounded-2xl font-bold transition-all active:scale-95">
                  Viac o bezpečnosti
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <SecurityBadge text="No Malware" icon={CheckCircle2} />
                <SecurityBadge text="Spyware Free" icon={LockKeyhole} />
                <SecurityBadge text="Sandbox Verified" icon={Shield} />
              </div>
            </div>
          </Reveal>

          {/* Browser Mockup */}
          <Reveal delay={800}>
            <div className="mt-24 relative max-w-5xl mx-auto float">
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
              <div className="glass rounded-t-3xl p-4 flex items-center gap-3 border-b-0">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/40" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/40" />
                </div>
                <div className="mx-auto bg-white/5 rounded-xl px-5 py-2 text-xs text-gray-400 w-2/3 md:w-1/2 flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-2">
                    <Search size={12} className="text-blue-400" />
                    <span>bakyserach://novy-vesmir</span>
                  </div>
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
              </div>
              <div className="glass aspect-video rounded-b-3xl overflow-hidden relative border-t-0 bg-black/40">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />
                 <div className="relative h-full flex items-center justify-center flex-col p-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tighter">Budúcnosť je čistá.</h2>
                    <div className="w-full max-w-lg relative group">
                      <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <input 
                        type="text" 
                        placeholder="Nájdi čokoľvek bezpečne..." 
                        className="relative w-full bg-black/40 border border-white/10 rounded-2xl px-7 py-5 focus:outline-none focus:border-blue-500 transition-all text-lg shadow-2xl"
                        readOnly
                      />
                      <Search className="absolute right-6 top-6 text-gray-500" size={24} />
                    </div>
                 </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Security Scan Section */}
      <section id="security" className="py-32 px-6">
        <div className="container mx-auto">
          <Reveal>
            <div className="glass p-10 md:p-20 rounded-[3.5rem] border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
              <div className="scanline opacity-20" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <ShieldCheck className="text-emerald-400" size={24} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Security Scan Report</h2>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tighter">
                    Viac ako len <span className="text-emerald-400">prehliadač.</span><br />
                    Tvoj digitálny štít.
                  </h3>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-10">
                    Každá verzia Baky Search je pred zverejnením testovaná v izolovanom prostredí (sandbox). Garantujeme absolútnu čistotu kódu a nulovú prítomnosť malvéru.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                      <Activity className="text-emerald-400 mb-4" size={24} />
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Dnešný sken</p>
                      <p className="text-xl font-bold">100% Čistý</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                      <FileSearch className="text-emerald-400 mb-4" size={24} />
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Vírusy</p>
                      <p className="text-xl font-bold">Nenájdené (0)</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="glass rounded-[3rem] p-10 border-emerald-500/20 bg-black/60 shadow-2xl relative">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xs font-mono text-gray-500 tracking-tighter">ANALYZING SYSTEM INTEGRITY...</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    
                    <div className="space-y-6">
                      {[
                        { label: "Malware Check", status: "PASS", val: "100%" },
                        { label: "Privacy Shield", status: "PASS", val: "ACTIVE" },
                        { label: "Tracking Prevention", status: "PASS", val: "ENABLED" },
                        { label: "Script Sanitizer", status: "PASS", val: "STABLE" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group/item">
                          <span className="text-gray-400 font-medium group-hover/item:text-white transition-colors">{item.label}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{item.status}</span>
                            <span className="font-mono text-emerald-400 text-sm">{item.val}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                       <CheckCircle2 className="text-emerald-400 shrink-0" size={32} />
                       <p className="text-sm font-medium leading-tight">
                         Aplikácia bola certifikovaná ako bezpečná systémom Baky Search Shield 2.4.
                       </p>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 p-4 glass rounded-2xl border-emerald-500/30 shadow-2xl shadow-emerald-500/10 animate-bounce delay-700">
                    <ShieldCheck className="text-emerald-400" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-[#030303]">
        <div className="container mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Postavené pre <span className="text-blue-400">tvoj výkon.</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">Každý riadok kódu Baky Search sme písali s ohľadom na bezpečnosť a rýchlosť.</p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              index={0}
              icon={Zap} 
              title="Hyper-rýchlosť" 
              description="Renderovací engine optimalizovaný pre moderný hardvér. Žiadne sekanie, len plynulý zážitok."
            />
            <FeatureCard 
              index={1}
              icon={ShieldCheck} 
              title="Anti-Tracking" 
              description="Tvoj digitálny odtlačok ostáva neviditeľný. Blokujeme tisíce trackerov v reálnom čase."
            />
            <FeatureCard 
              index={2}
              icon={Cpu} 
              title="AI Asistent" 
              description="Priamo v prehliadači máš zabudovanú Baky AI, ktorá ti pomôže s každou úlohou."
            />
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section id="demo" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="glass p-1 md:p-12 rounded-[3.5rem] border-purple-500/20 relative overflow-hidden bg-purple-500/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <div className="p-10">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/10">
                    <Cpu className="text-purple-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight">Vyskúšaj Baky AI</h3>
                    <p className="text-purple-400 font-medium">Súkromná a bezpečná inteligencia</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && runAiDemo()}
                      type="text" 
                      placeholder="Spýtaj sa Baky AI..." 
                      className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-7 py-5 focus:outline-none focus:border-purple-500 transition-all text-lg shadow-inner"
                    />
                    <button 
                      onClick={runAiDemo}
                      disabled={isTyping}
                      className="px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold disabled:opacity-50 transition-all shadow-xl shadow-purple-600/20 active:scale-95 whitespace-nowrap"
                    >
                      {isTyping ? <Loader2 className="animate-spin" /> : "Analyzovať"}
                    </button>
                  </div>

                  {aiResponse && (
                    <div className="glass bg-white/5 p-8 rounded-3xl border-purple-500/30 animate-in fade-in slide-in-from-bottom-6 duration-700">
                      <p className="text-gray-200 leading-relaxed text-lg italic">"{aiResponse}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final Download Section */}
      <section id="download" className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-20 tracking-tight">Pripravený na <span className="text-blue-400">skutočnú slobodu?</span></h2>
          </Reveal>
          
          <div className="max-w-md mx-auto">
            <Reveal delay={100}>
              <div className="glass p-10 rounded-[3rem] group hover:bg-blue-500/5 transition-all duration-500 border border-blue-500/30 shadow-2xl">
                <Monitor className="mx-auto mb-8 text-blue-400 group-hover:scale-110 transition-all duration-500" size={64} />
                <h4 className="text-2xl font-bold mb-3">Windows Edition</h4>
                <p className="text-gray-400 mb-10 text-base italic">100% Virus Free & Secure</p>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setIsPrivacyOpen(true)}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all duration-300 font-bold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 text-lg"
                  >
                    <Download size={22} /> Stiahnuť Baky Search
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 py-3 rounded-2xl border border-emerald-500/20">
                    <ShieldCheck size={14} /> Security Scan: Clean (0 Threats)
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-[#030303]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Search className="text-white" size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Baky Search</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg">
               <ShieldCheck size={12} className="text-emerald-400" />
               <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Secured by Baky Shield</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm max-w-sm text-center md:text-left leading-relaxed">
            © 2025 Baky Os Corporation. Softvér bol vyvinutý s maximálnym dôrazom na bezpečnosť používateľa a integritu systému.
          </p>
          
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/baky_os/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 glass rounded-2xl text-gray-400 hover:text-white hover:bg-pink-500/20 transition-all duration-300"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
