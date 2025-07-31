import { Award, ChevronRight, Play, Star, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TradingHeader = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slogans = [
    "Trade Smart, Profit Smarter",
    "Master Markets, Master Life",
    "From Beginner to Pro Trader"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div>
      {/* Main Header Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between lg:px-12 px-6 pt-20 lg:pt-32">
        {/* Left Content */}
        <div className={`lg:w-1/2 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">#1 Trading Education Platform</span>
          </div>

          {/* Main Headline */}
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Master the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Art of Trading
              </span>
            </h1>

            {/* Dynamic Slogan */}
            <div className="h-12 flex items-center">
              <p className="text-xl lg:text-2xl text-gray-300 transition-all duration-500">
                {slogans[currentSlogan]}
              </p>
            </div>
          </div>
          

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            Join thousands of successful traders who learned to navigate financial markets with our comprehensive online courses. From basics to advanced strategies, we'll guide your trading journey.
          </p>

          {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
  <a
    href="https://www.youtube.com/@TradingProfessor-l7g"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="w-64 group bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
      <span>Start Learning Now</span>
      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </a>

  <a
    href="https://www.instagram.com/trading_professor_7/?igsh=NmN1eW1zaTlrYW04&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="w-64 group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
      <Play className="w-7 h-5" />
      <span>Watch Demo</span>
    </button>
  </a>
</div>


          {/* Stats */}
          <div className="flex space-x-8 pt-4">
            {[
              { label: "Students", value: "350+" },
              { label: "Success Rate", value: "95%" },
              { label: "Rating", value: "4.9★" }
            ].map(({ label, value }, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
           
          </div>
        </div>

        {/* Right Content */}
        <div className={`lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative">
            {/* Dashboard Card */}
            <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-semibold text-lg">Trading Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-sm font-medium">Portfolio Value</div>
                  <div className="text-white text-xl font-bold">$127,439</div>
                  <div className="text-green-400 text-sm">+12.5% ↗</div>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 text-sm font-medium">Daily P&L</div>
                  <div className="text-white text-xl font-bold">+$2,847</div>
                  <div className="text-blue-400 text-sm">+2.3% ↗</div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">BTCUSD</span>
                  <span className="text-green-400 text-sm">+5.2%</span>
                </div>
                <div className="relative h-24">
                  <svg className="w-full h-full" viewBox="0 0 300 100">
                    <path d="M 0 80 Q 50 60 100 50 T 200 30 T 300 20" stroke="#10b981" strokeWidth="2" fill="none" />
                    <path d="M 0 80 Q 50 60 100 50 T 200 30 T 300 20 L 300 100 L 0 100 Z" fill="url(#gradient)" opacity="0.2" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Positions */}
              <div className="space-y-2">
                <div className="text-gray-400 text-sm font-medium mb-2">Active Positions</div>
                <div className="flex justify-between items-center bg-gray-900/30 rounded p-2">
                  <span className="text-white text-sm">EURUSD</span>
                  <span className="text-green-400 text-sm">+0.45%</span>
                </div>
                <div className="flex justify-between items-center bg-gray-900/30 rounded p-2">
                  <span className="text-white text-sm">GOLD</span>
                  <span className="text-red-400 text-sm">-0.23%</span>
                </div>
              </div>
            </div>

            {/* Floating Tags */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
              Live Trading
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-800 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Real Results
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="relative z-10 border-t border-gray-800/50 bg-gray-900/30 backdrop-blur-sm mt-6">
        <div className="px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-gray-400 ml-2">Rated 4.9/5 by students</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
 


      </>
  );
};

export default TradingHeader;
