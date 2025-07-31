import React, { useState, useEffect } from 'react';
import { ChevronDown, TrendingUp, Target, Award, Clock, BookOpen, Phone, MessageCircle } from 'lucide-react';

const TradingHomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    students: 0,
    profit: 0,
    success: 0,
    experience: 0
  });

  useEffect(() => {
    setIsVisible(true);
    const targets = { students: 5000, profit: 95, success: 98, experience: 8 };
    const increment = { students: 50, profit: 1, success: 1, experience: 1 };

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(targets).forEach(key => {
          if (prev[key] < targets[key]) {
            newCounters[key] = Math.min(prev[key] + increment[key], targets[key]);
            allComplete = false;
          } else {
            newCounters[key] = targets[key];
          }
        });

        if (allComplete) clearInterval(timer);
        return newCounters;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-300/50 rounded-full text-sm text-blue-200 font-medium animate-pulse">
                  🎯 Master The Markets
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Unlock
      <div className="w-full flex justify-center items-center py-8">
  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-pulse">
    Trading
  </h1>
</div>
                <span className="block text-4xl md:text-5xl">Secrets</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Learn the <strong className="text-purple-400">"Formation and Timing"</strong> secret formula
                from Trading Professor. Transform your trading journey with our proven strategies
                and achieve <strong className="text-blue-400">consistent profits</strong>.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, text: "95% Success Rate" },
                { icon: Clock, text: "Time-Based Formula" },
                { icon: TrendingUp, text: "Magical Formation" },
                { icon: Award, text: "Expert Guidance" }
              ].map(({ icon: Icon, text }, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-900" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Enroll Now - ₹19,999
                </span>
              </button>

              <button className="px-8 py-4 border-2 border-purple-400 rounded-full text-purple-300 font-semibold hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: +91 9363238386
                </span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span>WhatsApp: +91 9363238386</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span>Limited Slots Available</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Course Stats</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-400 font-medium">LIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{counters.students.toLocaleString()}+</div>
                    <div className="text-sm text-gray-300">Students Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{counters.profit}%</div>
                    <div className="text-sm text-gray-300">Avg. Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{counters.success}%</div>
                    <div className="text-sm text-gray-300">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{counters.experience}+</div>
                    <div className="text-sm text-gray-300">Years Experience</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">What You'll Learn:</h4>
                  <div className="space-y-2">
                    {[
                      "Time-Based Formula & Magical Formation",
                      "Option Buying & Advanced Tricks",
                      "Psychology & Mindset Change",
                      "Live Trading Sessions"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Price Cards */}
            <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white text-center transform -rotate-6 hover:rotate-0 transition-transform duration-300 shadow-lg">
              <div className="text-sm font-medium">Starting From</div>
              <div className="text-2xl font-bold">₹19,999</div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white text-center transform rotate-6 hover:rotate-0 transition-transform duration-300 shadow-lg">
              <div className="text-sm font-medium">Special Offer</div>
              <div className="text-2xl font-bold">35% OFF</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </section>

      {/* Quick Info Banner */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Next Batch: Aug 27th | Limited Seats
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingHomePage;
