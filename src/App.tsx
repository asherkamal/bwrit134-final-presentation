import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
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
  const [sliderValue, setSliderValue] = useState(50);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  const getQuote = () => {
    if (sliderValue < 50) {
      return {
        text: "I just think there's an external force... I don't really perform a lot of rituals.",
        author: "— Saba"
      };
    } else {
      return {
        text: "I have to do a Pooja every day.",
        author: "— Kumbhar"
      };
    }
  };

  const quote = getQuote();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white opacity-20"
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          What defines faith?
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Slider Labels */}
          <div className="flex justify-between mb-4 text-white font-semibold">
            <span className={`transition-all ${sliderValue < 50 ? 'text-2xl' : 'text-lg opacity-60'}`}>
              Internal Belief
            </span>
            <span className={`transition-all ${sliderValue >= 50 ? 'text-2xl' : 'text-lg opacity-60'}`}>
              Practice
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer mb-8"
            style={{
              background: `linear-gradient(to right, #60a5fa ${sliderValue}%, rgba(255,255,255,0.2) ${sliderValue}%)`
            }}
          />

          {/* Quote Display */}
          <div className="min-h-32 flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-white italic mb-4 transition-all duration-500">
              "{quote.text}"
            </p>
            <p className="text-lg text-white/80 transition-all duration-500">
              {quote.author}
            </p>
          </div>

          <p className="text-white/70 mt-8 text-lg">
            Move the slider to explore the spectrum of Hindu religious identity
          </p>
        </div>

        <button
          onClick={onContinue}
          className="mt-12 px-8 py-4 bg-white text-purple-900 rounded-full font-bold text-lg hover:bg-purple-100 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
        >
          Continue Journey <ChevronDown />
        </button>
      </div>
    </div>
  );
};








// Split Screen Component
const SplitScreen = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mergeProgress = scrollProgress > 0.7 ? (scrollProgress - 0.7) / 0.3 : 0;

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-900 relative">
      <div className="h-screen flex sticky top-0">
        {/* Left Column - Saba (Modern/Abstract) */}
        <div
          className="flex-1 bg-gradient-to-br from-blue-500 to-cyan-400 p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden"
          style={{
            transform: `translateX(-${mergeProgress * 50}%)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${Math.random() * 3 + 2}s infinite`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Individual Path</h2>
            <p className="text-lg md:text-xl mb-4">"It's more about internal belief and cultural connection"</p>
            <div className="space-y-3 text-base md:text-lg">
              <p>✦ Personal spirituality</p>
              <p>✦ Flexible interpretation</p>
              <p>✦ Modern adaptation</p>
            </div>
          </div>
        </div>

        {/* Right Column - Kumbhar (Traditional/Structured) */}
        <div
          className="flex-1 bg-gradient-to-br from-orange-600 to-red-500 p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden"
          style={{
            transform: `translateX(${mergeProgress * 50}%)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {[...Array(10)].map((_, i) => (
                <circle key={i} cx="50" cy="50" r={10 + i * 8} fill="none" stroke="white" strokeWidth="0.5" />
              ))}
            </svg>
          </div>

          <div className="relative z-10 max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Traditional Path</h2>
            <p className="text-lg md:text-xl mb-4">"Daily Pooja, following rituals, honoring traditions"</p>
            <div className="space-y-3 text-base md:text-lg">
              <p>🕉 Daily practices</p>
              <p>🕉 Ritual devotion</p>
              <p>🕉 Ancestral customs</p>
            </div>
          </div>
        </div>

        {/* Convergence Overlay */}
        {mergeProgress > 0 && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 z-20"
            style={{ opacity: mergeProgress }}
          >
            <div className="text-center text-white px-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">One Community</h2>
              <p className="text-xl md:text-2xl max-w-2xl">
                Despite different paths, we converge as a united community—at temples, celebrations, and shared moments of cultural pride.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="h-96"></div>
    </div>
  );
};











// Diwali Atmosphere Component
const DiwaliAtmosphere = () => {
  const [location, setLocation] = useState<'india' | 'usa'>('usa');
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 flex items-center justify-center ${
      location === 'india' 
        ? 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600' 
        : 'bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900'
    }`}>
      <div className="max-w-4xl px-8 text-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The Sound of Celebration</h2>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Toggle Switch */}
          <div className="flex justify-center items-center gap-4 md:gap-6 mb-12">
            <button
              onClick={() => setLocation('india')}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl transition-all ${
                location === 'india'
                  ? 'bg-white text-orange-600 scale-110'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              India
            </button>
            <button
              onClick={() => setLocation('usa')}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl transition-all ${
                location === 'usa'
                  ? 'bg-white text-amber-800 scale-110'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              USA
            </button>
          </div>

          {/* Description */}
          <div className="text-white space-y-6">
            {location === 'india' ? (
              <>
                <p className="text-xl md:text-2xl font-semibold">🎆 Vibrant. Loud. Unrestricted.</p>
                <p className="text-lg md:text-xl">Firecrackers echo through the streets. Families gather in large celebrations. The night sky explodes with color. No school tomorrow—just pure celebration.</p>
              </>
            ) : (
              <>
                <p className="text-xl md:text-2xl font-semibold">🏠 Quieter. Intimate. Constrained.</p>
                <p className="text-lg md:text-xl">The celebration moves indoors. Gentle conversation, the clinking of plates. School the next day. A different kind of warmth, shaped by a new environment.</p>
              </>
            )}
          </div>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className="mt-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center gap-3 mx-auto transition-all"
          >
            {audioPlaying ? <Volume2 /> : <VolumeX />}
            {audioPlaying ? 'Sound On' : 'Sound Off'}
          </button>

          <p className="text-white/70 mt-8 italic">
            "The atmosphere changes based on where you are... it's quieter here."
          </p>
        </div>
      </div>
    </div>
  );
};









// Interactive Map Component
const InteractiveMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<'india' | 'seattle' | null>(null);
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
              fill={hoveredLocation === 'india' ? '#f97316' : '#fb923c'}
              onMouseEnter={() => setHoveredLocation('india')}
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
              fill={hoveredLocation === 'seattle' ? '#3b82f6' : '#60a5fa'}
              onMouseEnter={() => setHoveredLocation('seattle')}
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
          {hoveredLocation === 'india' && (
            <div className="mt-6 md:absolute md:top-1/2 md:right-12 bg-orange-500 text-white p-6 rounded-xl shadow-2xl max-w-xs">
              <p className="text-lg font-semibold">"Intense, strictly followed"</p>
              <p className="text-sm mt-2">Deep-rooted traditions, daily rituals, surrounded by cultural immersion</p>
            </div>
          )}

          {hoveredLocation === 'seattle' && (
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
          Construct Your Definition
        </h2>
        <p className="text-lg md:text-xl text-white/80 text-center mb-12">
          Choose 3 values that resonate with you
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
                Your chosen values ({selectedValues.length}/3):
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
              {selectedValues.length >= 1 && selectedValues.length <= 3 ? 'See Your Path' : 'Select up to 3 values.'}
            </button>
          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-white mb-6">Your chosen path includes:</p>
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
                And that's perfectly valid.
              </p>
              <p className="text-xl md:text-2xl text-white italic mb-4">
                "{responseString}"
                "There's a lot of variations… you can really choose what you want to believe."
              </p>
              <p className="text-xl text-white/80">— Kumbhar</p>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-xl">
              <p className="text-base md:text-lg text-white/90">
                Hinduism is not a fixed doctrine—it's a living, breathing spectrum of practices, beliefs, and values. Your path is yours to define.
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
            <DiwaliAtmosphere />
          </div>
          <div data-section="3">
            <InteractiveMap />
          </div>
          <div data-section="4">
            <ChooseYourValues />
          </div>
        </>
      )}
    </div>
  );
}