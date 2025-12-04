import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Volume2, VolumeX, BookOpen, Heart, Users, Sun, Sparkles, Flower2 } from 'lucide-react';
import { getGeminiResponse } from './geminiService';

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


// Landing Page Component
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
    // Changed gradient to Saffron/Orange/Purple mix for a more "Hindu" aesthetic while keeping it modern
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-indigo-900 flex items-center justify-center font-sans">
      
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-yellow-100 opacity-30"
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
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(255, 200, 100, 0.3);
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-100 mb-2 text-center text-glow">
          What is Hinduism?
        </h1>
        <p className="text-white/70 text-lg mb-12 text-center max-w-2xl">
          Explore the facets of a tradition that spans thousands of years.
        </p>

        <div className="grid md:grid-cols-12 gap-8 w-full">
          
          {/* Navigation/Pillars (Left Side on Desktop, Top on Mobile) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            {Object.entries(content).map(([key, data]) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border text-left
                  ${activeTab === key 
                    ? 'bg-white/20 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]' 
                    : 'bg-black/20 border-transparent hover:bg-black/30 hover:border-white/10'
                  }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${activeTab === key ? 'text-yellow-300' : 'text-white/60 group-hover:text-white'}`}>
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

          {/* Display Area (Right Side) */}
          <div className="md:col-span-8">
            <div className="h-full min-h-[300px] bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              
              {/* Decorative background element inside card */}
              <div className="absolute -right-10 -bottom-10 opacity-5">
                 <Sun size={200} />
              </div>

              <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h2 className="text-yellow-400 font-medium tracking-widest uppercase text-sm mb-3">
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
          className="mt-16 group relative px-8 py-4 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-900 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1 flex items-center gap-2"
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
              Ekam Sat
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









// Interactive Map Component
const InteractiveMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<'India' | 'US' | null>(null);
  const [showConclusion, setShowConclusion] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-8 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Migration & Transformation
        </h2>

        <div className="relative bg-slate-700/50 rounded-3xl p-8 md:p-12 backdrop-blur">
          {/* Simplified Map */}
          <svg viewBox="0 0 800 400" className="w-full h-64 md:h-auto">
            {/* India */}
            <circle
              cx="600"
              cy="250"
              r="40"
              className="cursor-pointer transition-all"
              fill={hoveredLocation === 'India' ? '#f97316' : '#fb923c'}
              onMouseEnter={() => setHoveredLocation('India')}
              onMouseLeave={() => setHoveredLocation(null)}
            />
            <text x="600" y="260" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
              India
            </text>

            {/* Seattle */}
            <circle
              cx="200"
              cy="150"
              r="40"
              className="cursor-pointer transition-all"
              fill={hoveredLocation === 'US' ? '#3b82f6' : '#60a5fa'}
              onMouseEnter={() => setHoveredLocation('US')}
              onMouseLeave={() => setHoveredLocation(null)}
            />
            <text x="200" y="155" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
              Seattle
            </text>

            {/* Connection Line */}
            <line
              x1="240"
              y1="170"
              x2="560"
              y2="235"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="cursor-pointer"
              onClick={() => setShowConclusion(!showConclusion)}
            />
            
            {/* Arrow */}
            <polygon
              points="560,235 550,230 550,240"
              fill="white"
            />
          </svg>

          {/* Tooltips */}
          {hoveredLocation === 'India' && (
            <div className="mt-6 md:absolute md:top-1/2 md:right-12 bg-orange-500 text-white p-6 rounded-xl shadow-2xl max-w-xs">
              <p className="text-lg font-semibold">"Intense, strictly followed"</p>
              <p className="text-sm mt-2">Deep-rooted traditions, daily rituals, surrounded by cultural immersion</p>
            </div>
          )}

          {hoveredLocation === 'US' && (
            <div className="mt-6 md:absolute md:top-1/4 md:left-12 bg-blue-500 text-white p-6 rounded-xl shadow-2xl max-w-xs">
              <p className="text-lg font-semibold">"More free, individual choice"</p>
              <p className="text-sm mt-2">Diversified environment, personal interpretation, adapted practices</p>
            </div>
          )}

          {/* Conclusion */}
          {showConclusion && (
            <div className="mt-8 bg-purple-600 text-white p-8 rounded-2xl">
              <p className="text-2xl font-bold mb-4">Generational Drift</p>
              <p className="text-xl">
                "Rituals have gotten less... becoming more free. The environment shapes how we practice and what we choose to keep."
              </p>
            </div>
          )}

          <p className="text-white/70 text-center mt-8 text-base md:text-lg">
            Hover over locations • Click the line to reveal insight
          </p>
        </div>
      </div>
    </div>
  );
};











// Choose Your Values Component
const ChooseYourValues = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [responseString, setResponseString] = useState("");

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
      const result = await getGeminiResponse(selectedValues);
      setResponseString(result.message);
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900 flex items-center justify-center p-8 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          Does Hinduism Align With Your Beliefs? 
        </h2>
        <p className="text-lg md:text-xl text-white/80 text-center mb-12">
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
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all transform hover:scale-105 ${
                    selectedValues.includes(value)
                      ? 'bg-white text-purple-900 shadow-2xl scale-110'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  disabled={!selectedValues.includes(value) && selectedValues.length >= 3}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Selected Values Display */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
              <p className="text-white text-center text-lg mb-4">
                Selected ({selectedValues.length}/3):
              </p>
              <div className="flex flex-wrap justify-center gap-4 min-h-16 items-center">
                {selectedValues.map(value => (
                  <span key={value} className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold text-lg">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={selectedValues.length === 0 || selectedValues.length > 3}
              className={`w-full py-4 rounded-full text-xl font-bold transition-all ${
                selectedValues.length >= 1 && selectedValues.length <= 3
                  ? 'bg-white text-purple-900 hover:bg-purple-100 cursor-pointer'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              {selectedValues.length >= 1 && selectedValues.length <= 3 ? 'See Your Path' : 'Select a value.'}
            </button>
          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-white mb-6">Values:</p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {selectedValues.map(value => (
                  <span key={value} className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold text-xl">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/20 pt-8">
              <p className="text-2xl md:text-3xl text-white font-bold mb-6">
                See for yourself - 
              </p>
              <p className="text-xl md:text-2xl text-white italic mb-4">
                "{responseString}"
              </p>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-xl">
              <p className="text-base md:text-lg text-white/90">
                Hinduism isn’t a strict, fixed doctrine—it’s a diverse tradition with many beliefs and practices. Each person can follow the path that feels right to them.              
              </p>
            </div>
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