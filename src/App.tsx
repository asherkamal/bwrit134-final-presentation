import { useState, useEffect, useRef } from 'react';
import { ChevronDown, BookOpen, Heart, Users, Sun, Sparkles, Flower2 } from 'lucide-react';
import { getGeminiResponse } from './geminiService';
import omImage from './assets/om.jpg'; 
import templeImage from './assets/temple.jpg';


// Types
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}


interface LandingPageProps {
  onContinue: () => void;
}
const LandingPage = ({ onContinue }: LandingPageProps) => {
  const [activeTab, setActiveTab] = useState('essence');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize Particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  const content = {
    essence: {
      title: "Sanatana Dharma",
      subtitle: "The Eternal Order",
      text: "Hinduism is a way of life just as much as it's a religious faith. It is the world's oldest living tradition, rooted in the pursuit of truth (Satya) and duty (Dharma).",
      icon: <Sun className="w-6 h-6" />
    },
    philosophy: {
      title: "The Philosophy",
      subtitle: "Karma & Reincarnation",
      text: "It teaches that every action has a consequence (Karma), and the soul (Atman) is eternal, journeying through cycles of birth and rebirth until it finds liberation.",
      icon: <BookOpen className="w-6 h-6" />
    },
    practice: {
      title: "The Practice",
      subtitle: "Ritual & Devotion",
      text: "From grand temple festivals to quiet home shrines (Pooja), faith is practiced through various rituals and traditions.",
      icon: <Heart className="w-6 h-6" />
    },
    diversity: {
      title: "The Diversity",
      subtitle: "Many Paths, One Truth",
      text: "It offers the freedom of staying true to your own values; whether one believes in one God, many forms of God, or a formless energy, all are accepted.",
      icon: <Users className="w-6 h-6" />
    }
  };

  const handleTabChange = (key: string) => {
    if (activeTab === key) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsAnimating(false);
    }, 300); // Wait for fade out
  };

  const activeContent = content[activeTab as keyof typeof content];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center font-sans">
      
      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 z-0">
        {/* 1. The Image */}
        <img 
          src={templeImage} // Uses the imported variable
          alt="Hindu Background Pattern"
          className="w-full h-full object-cover object-[10%_100%] opacity-50 " 
          // Added 'grayscale' to keep it neutral/serious. Remove if you want the image's original colors.
        />
        {/* 2. Black fade for text readability */}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white opacity-20" // Changed to white for neutral look
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float ${p.duration}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 text-center text-glow">
          What is Hinduism?
        </h1>
        <p className="text-white/70 text-lg mb-12 text-center max-w-2xl font-light">
          Explore the facets of a tradition that spans thousands of years.
        </p>

        <div className="grid md:grid-cols-12 gap-8 w-full">
          
          {/* Navigation/Pillars */}
          <div className="md:col-span-4 flex flex-col gap-3">
            {Object.entries(content).map(([key, data]) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border text-left backdrop-blur-sm
                  ${activeTab === key 
                    ? 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                    : 'bg-black/40 border-transparent hover:bg-black/60 hover:border-white/10'
                  }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${activeTab === key ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {data.icon}
                </div>
                <div>
                  <h3 className={`font-semibold text-lg transition-colors ${activeTab === key ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {data.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Display Area */}
          <div className="md:col-span-8">
            <div className="h-full min-h-[300px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden shadow-2xl">
              
              <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h2 className="text-white/60 font-medium tracking-widest uppercase text-sm mb-3">
                  {activeContent.subtitle}
                </h2>
                <h3 className="text-3xl md:text-4xl text-white font-serif mb-6 leading-tight">
                  {activeContent.title}
                </h3>
                <p className="text-xl text-white/90 leading-relaxed font-light">
                  "{activeContent.text}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <button
          onClick={onContinue}
          className="mt-16 group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 flex items-center gap-2"
        >
          Begin the Journey 
          <ChevronDown className="group-hover:translate-y-1 transition-transform" />
        </button>

      </div>
    </div>
  );
};







const SplitScreen = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;
      const scrolled = -rect.top;

      // Calculate 0 to 1 progress based on how far we've scrolled through this component
      let currentProgress = Math.max(0, Math.min(1, scrolled / totalDist));
      
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGIC: 
  // 0.0 - 0.6: The split screen stays static (user reads)
  // 0.6 - 0.9: The split screen slides out (merges)
  // 0.9 - 1.0: The final message is fully visible
  const mergeStart = 0.6;
  const mergeDuration = 0.3;
  
  // Calculate the slide value (0% to 100%)
  const slideValue = progress < mergeStart 
    ? 0 
    : Math.min(1, (progress - mergeStart) / mergeDuration);

  // Calculate opacity for the final overlay
  const overlayOpacity = slideValue;

  return (
    // 1. HEIGHT INCREASED: h-[400vh] creates a long scroll track
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      
      {/* 2. STICKY WRAPPER: Keeps the content fixed while scrolling the 400vh track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex">
        
        {/* --- LEFT: The Philosophical/Internal Path (Nirguna) --- */}
        <div 
          className="flex-1 bg-slate-900 relative flex flex-col justify-center items-center px-8 border-r border-white/10"
          style={{ 
            transform: `translateX(-${slideValue * 100}%)`,
            transition: 'transform 0.1s linear' // linear is smoother for scroll-bound anims
          }}
        >
          {/* Abstract visuals for "Formless" */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-[100px] animate-pulse" />
          </div>

          <div className="relative z-10 max-w-md text-center">
            <div className="flex justify-center mb-6 text-blue-300">
              <Sparkles size={48} strokeWidth={1} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Nirguna</h2>
            <p className="text-blue-100 text-lg md:text-xl font-light italic mb-8">
              "The Formless Absolute"
            </p>
            <div className="text-slate-300 space-y-4 text-left border-l-2 border-blue-500/50 pl-6">
              <p>Focus on <strong>Vedanta</strong> (Philosophy)</p>
              <p>God is energy, consciousness, and truth.</p>
              <p>Worship through meditation (Dhyana) and self-inquiry.</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT: The Devotional/Ritual Path (Saguna) --- */}
        <div 
          className="flex-1 bg-gradient-to-br from-orange-900 to-red-950 relative flex flex-col justify-center items-center px-8"
          style={{ 
            transform: `translateX(${slideValue * 100}%)`,
            transition: 'transform 0.1s linear'
          }}
        >
          {/* Ornamented visuals for "Form" */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay" />
          
          <div className="relative z-10 max-w-md text-center">
            <div className="flex justify-center mb-6 text-orange-300">
               <Flower2 size={48} strokeWidth={1} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Saguna</h2>
            <p className="text-orange-100 text-lg md:text-xl font-light italic mb-8">
              " The Manifested Divine"
            </p>
            <div className="text-orange-50 space-y-4 text-left border-l-2 border-orange-500/50 pl-6">
              <p>Focus on <strong>Bhakti</strong> (Devotion)</p>
              <p>God appears in infinite forms to connect with us.</p>
              <p>Worship through ritual (Pooja), chanting, and festivals.</p>
            </div>
          </div>
        </div>

        {/* --- CENTER MERGE: The Synthesis --- */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: overlayOpacity }}
        >
          <div className="absolute inset-0 bg-indigo-950" /> {/* Solid background cover */}
          <div className="relative z-20 text-center max-w-3xl px-6">
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 mb-8">
              Ekam sat vipra bahudha vadanti 
            </h2>
            <h3 className="text-2xl text-white font-light mb-8">
              "Truth is One, though the wise call it by many names."
            </h3>
            <p className="text-lg text-indigo-200 leading-relaxed">
              Hinduism is not a choice between these two, but a bridge between them. 
              Whether through abstract meditation or vibrant ritual, the destination remains the same.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};








const InteractiveMap = () => {
  const [activeLocation, setActiveLocation] = useState<'India' | 'Seattle' | null>(null);
  const [showMigrationEffect, setShowMigrationEffect] = useState(false);

  // Data for the popup cards
  const locationData = {
    India: {
      title: "India",
      context: "Religion is woven into daily life",
      factors: [
        "Religion is more intense",
        "Much larger communiy",
        "Engrained in the culture",
        "Holidays have massive celebrations"
      ],
      result: "People practice it often without even thinking about it."
    },
    Seattle: {
      title: "America",
      context: "Religion is a more of a choice; requires  effort from the community.",
      factors: [
        "Diverisfied",
        "Religion(Hinduism) is separate from cutlure",
        "Newer generations grow up around different culture - they dont understand why they're hindu"
        
      ],
      result: "Practice either takes more effort or becomes \"more free\" as people and generations gradually assimilate."
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 md:p-12 font-sans">
      
      <div className="max-w-6xl w-full mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Geography Shapes Faith
        </h2>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
          How does moving 8,000 miles change the Hindu experience?
          <br/>
          <span className="text-sm opacity-70">(click the flight path)</span>
        </p>
      </div>

      <div className="relative w-full aspect-[16/9] bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
        
        {/* === THE MAP === */}
        <svg viewBox="0 0 1000 500" className="w-full h-full bg-[#1e3a8a]">
          {/* 1. Ocean Pattern (Subtle waves) */}
          <pattern id="waves" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
             <path d="M0 25 Q 12.5 15, 25 25 T 50 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves)" />

         {/* 2. REALISTIC CONTINENTS (High-Fidelity Paths) */}
          <g fill="#127221" stroke="#dce4ad" strokeWidth="1" opacity="0.8">
            {/* Asia*/}
            <path d="M 670,160 L 730,150 L 800,155 L 870,140 L 930,150 L 960,200 L 910,230 L 900,280 L 915,320 L 890,330 L 850,300 L 810,380 L 780,360 L 750,300 L 700,280 L 660,250 L 630,200 L 610,170 L 650,175 Z" /> 
            <path d="M 50,200 L 80,180 L 120,190 L 150,150 L 200,140 L 250,130 L 350,100 L 420,120 L 440,180 L 420,220 L 380,240 L 350,280 L 320,320 L 280,310 L 250,280 L 230,260 L 220,280 L 200,270 L 180,230 L 150,220 L 100,240 L 50,220 Z" />          
          </g>

          {/* 3. Connection Line (The Migration) */}
          {/* Dashed background line */}
          <path 
            d="M 300,250 Q 450,50 660,185"
            fill="none" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="3" 
            strokeDasharray="5,5" 
          />
          
          {/* Animated Flight Path - Clickable */}
          <path 
            id="flightPath"
            d="M 300,250 Q 450,50 660,185" 
            fill="none" 
            stroke={showMigrationEffect ? "#fbbf24" : "rgba(255,255,255,0.5)"}
            strokeWidth="4" 
            className="cursor-pointer hover:stroke-yellow-400 transition-colors duration-300"
            onClick={() => setShowMigrationEffect(!showMigrationEffect)}
          />

          {/* 4. Interactive Pins */}
          
          {/* Seattle Pin */}
          <g 
            className="cursor-pointer hover:opacity-100 transition-all duration-300"
            onMouseEnter={() => setActiveLocation('Seattle')}
            onMouseLeave={() => setActiveLocation(null)}
          >
            <circle cx="660" cy="185" r="15" fill="#60a5fa" className="opacity-40 animate-ping" />
            <circle cx="660" cy="185" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
            <text x="695" y="205" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">Seattle</text>
          </g>

          {/* India Pin */}
          <g 
            className="cursor-pointer hover:opacity-100 transition-all duration-300"
            onMouseEnter={() => setActiveLocation('India')}
            onMouseLeave={() => setActiveLocation(null)}
          >
            <circle cx="300" cy="250" r="15" fill="#f97316" className="opacity-40 animate-ping" />
            <circle cx="300" cy="250" r="8" fill="#ea580c" stroke="white" strokeWidth="2" />
            <text x="285" y="275" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">India</text>
          </g>


          {/* 5. THE PLANE (NATIVE SVG) */}
          {/* This group is LAST, so it sits ON TOP of everything. No foreignObject needed. */}
          <g 
            onClick={() => setShowMigrationEffect(!showMigrationEffect)}
            className="cursor-pointer hover:scale-110 transition-transform"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
             {/* White Circle Background */}
             <circle cx="0" cy="0" r="24" fill="white" filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.3))" />
             
             {/* Plane Icon Path */}
             <path 
               transform="translate(-12, -12)" 
               d="M2 12h20M15 5l7 7-7 7" // Simple arrow/plane shape
               stroke="#0f172a" 
               strokeWidth="2.5" 
               fill="none" 
               strokeLinecap="round" 
               strokeLinejoin="round"
             />

             {/* Animation Logic */}
             <animateMotion 
                dur="6s" 
                repeatCount="indefinite" 
                path="M 300,250 Q 450,50 660,185"
                rotate="auto" // This makes the plane point in the direction of travel
             />
          </g>

        </svg>

        {/* === OVERLAYS === */}

        {/* 1. Location Details Overlay */}
        {activeLocation && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-20 transition-all pointer-events-none">
            <div className={`max-w-md w-full bg-white text-slate-900 rounded-2xl p-8 shadow-2xl transform transition-all border-l-8 ${activeLocation === 'India' ? 'border-orange-500' : 'border-blue-500'}`}>
              <h3 className="text-2xl font-bold mb-1">{locationData[activeLocation].title}</h3>              
              <p className="italic text-lg mb-6 text-slate-700">"{locationData[activeLocation].context}"</p>
              
              <ul className="space-y-3 mb-6">
                {locationData[activeLocation].factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`mt-1.5 min-w-[6px] h-[6px] rounded-full ${activeLocation === 'India' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                    <span className="text-slate-600">{factor}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="font-semibold text-slate-800">Result:</p>
                <p className="text-slate-600">{locationData[activeLocation].result}</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Migration Effect (Conclusion) Overlay */}
        {showMigrationEffect && !activeLocation && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-8 md:p-12 text-center z-10">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block bg-yellow-500 text-black font-bold px-4 py-1 rounded-full text-sm mb-4">
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                The Effect of Migration
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                When the environment is stripped away, the religion must be reconstructed intellectually. 
                New environments comes with many require a more conscious understanding and commitment to religion.
                <br />
                <span className="text-yellow-400">(Hover over locations)</span>
              </p>
              <button 
                onClick={() => setShowMigrationEffect(false)}
                className="text-white underline opacity-50 hover:opacity-100"
              >
                Close Insight
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};









const ChooseYourValues = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [responseString, setResponseString] = useState("");
  // I kept this state as it's useful for the UI, but you can remove it if you prefer
  const [isLoading, setIsLoading] = useState(false); 

  const values = ['Community', 'Ritual', 'God', 'Family', 'Food', 'Service', 'Freedom'];

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else if (selectedValues.length < 3) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSubmit = async () => {
    if (selectedValues.length >= 1 && selectedValues.length <= 3) {
      setIsLoading(true);
      try {
        // YOUR ORIGINAL LOGIC RESTORED
        const result = await getGeminiResponse(selectedValues);
        setResponseString(result.message);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching response:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center p-8 py-20 font-sans">
      
      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 z-0">
        <img 
          src={omImage} 
          alt="Hindu Background Pattern"
          className="w-full h-full object-cover opacity-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* === CONTENT LAYER === */}
      <div className="relative z-10 max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Does Hinduism Align With Your Beliefs? 
        </h2>
        <p className="text-lg md:text-xl text-white/80 text-center mb-12 font-light">
          Choose up to 3 values that resonate with you
        </p>

        {!showResult ? (
          <>
            {/* Value Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
              {values.map(value => (
                <button
                  key={value}
                  onClick={() => toggleValue(value)}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all transform hover:scale-105 border backdrop-blur-sm ${
                    selectedValues.includes(value)
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110'
                      : 'bg-black/40 text-white border-white/10 hover:bg-white/10'
                  }`}
                  disabled={!selectedValues.includes(value) && selectedValues.length >= 3}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Selected Values Display */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 shadow-2xl">
              <p className="text-white/60 text-center text-sm uppercase tracking-widest mb-4">
                Selected ({selectedValues.length}/3)
              </p>
              <div className="flex flex-wrap justify-center gap-4 min-h-[60px] items-center">
                {selectedValues.length === 0 && (
                   <span className="text-white/30 italic">Select values above...</span>
                )}
                {selectedValues.map(value => (
                  <span key={value} className="bg-white text-black px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={selectedValues.length === 0 || selectedValues.length > 3 || isLoading}
              className={`w-full py-4 rounded-full text-xl font-bold transition-all flex items-center justify-center gap-2 ${
                selectedValues.length >= 1 && selectedValues.length <= 3 && !isLoading
                  ? 'bg-white text-black hover:bg-gray-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                 <span className="animate-pulse">Consulting Wisdom...</span>
              ) : (
                 selectedValues.length >= 1 ? 'See Your Path' : 'Select a value'
              )}
            </button>
          </>
        ) : (
          /* RESULT VIEW */
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
            <div className="mb-8">
              <p className="text-white/60 uppercase tracking-widest text-sm mb-6">Your Values</p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {selectedValues.map(value => (
                  <span key={value} className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-bold text-xl">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-2xl md:text-3xl text-white font-serif italic mb-6">
                "Alignment Found"
              </p>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-4">
                "{responseString}"
              </p>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/5">
              <p className="text-base md:text-lg text-white/70">
                Hinduism isn’t a strict, fixed doctrine—it’s a diverse tradition with many beliefs and practices. Each person can follow the path that feels right to them.
              </p>
            </div>

            <button 
                onClick={() => setShowResult(false)}
                className="mt-8 text-white/50 hover:text-white underline transition-colors"
            >
                Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};











// Main App Component
export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const handleContinue = () => {
    setShowNav(true);
    setCurrentSection(1);
  };

  useEffect(() => {
    const sectionElements = document.querySelectorAll('[data-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(entry.target.getAttribute('data-section') || '0');
            setCurrentSection(sectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showNav]);

  const scrollToSection = (sectionId: number) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (currentSection > 0) {
      scrollToSection(currentSection);
    }
  }, [currentSection]);

  return (
    <div className="font-sans">      
      <div data-section="0">
        <LandingPage onContinue={handleContinue} />
      </div>
      
      {showNav && (
        <>
          <div data-section="1">
            <SplitScreen />
          </div>
          <div data-section="2">
            <InteractiveMap />
          </div>
          <div data-section="3">
            <ChooseYourValues />
          </div>
        </>
      )}
    </div>
  );
}