import React, { useState, useEffect } from 'react';

const AnimatedBackground = () => {
  // const [particles, setParticles] = useState([]);

  // // Generate random particles
  // useEffect(() => {
  //   const generateParticles = () => {
  //     const newParticles = [];
  //     for (let i = 0; i < 50; i++) {
  //       newParticles.push({
  //         id: i,
  //         x: Math.random() * 100,
  //         y: Math.random() * 100,
  //         size: Math.random() * 3 + 1,
  //         speedX: (Math.random() - 0.5) * 0.5,
  //         speedY: (Math.random() - 0.5) * 0.5,
  //         opacity: Math.random() * 0.5 + 0.3
  //       });
  //     }
  //     setParticles(newParticles);
  //   };

  //   generateParticles();
  // }, []);

  // // Animate particles
  // useEffect(() => {
  //   const animateParticles = () => {
  //     setParticles(prevParticles => 
  //       prevParticles.map(particle => ({
  //         ...particle,
  //         x: (particle.x + particle.speedX + 100) % 100,
  //         y: (particle.y + particle.speedY + 100) % 100
  //       }))
  //     );
  //   };

  //   const interval = setInterval(animateParticles, 50);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Particle System */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transition: 'all 0.05s linear'
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      {/* Fixed Navbar */}
     {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white tracking-wider" style={{fontFamily: 'Inter, system-ui, -apple-system, sans-serif'}}>
                Keerthana Duraisamy
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <div key={item} className="relative group">
                  <button className="px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 font-medium relative overflow-hidden">
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                    
                    {/* Glowing border on hover */}
                    <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>
                    
                    <span className="relative z-10">{item}</span>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Keerthana Duraisamy
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Frontend Developer & UI/UX Designer
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Passionate about creating beautiful, functional, and user-friendly digital experiences. 
            Specialized in modern web technologies and intuitive design.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
              View My Work
            </button>
            <button className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              Download CV
            </button>
          </div>
        </div>
      </section>

    

      {/* Projects Section */}
      
            {/* Skills Section - Very Different Design */}
      <section id="skills" className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Interactive skill visualization with real-time animations
            </p>
          </div>

          {/* Hexagonal Skills Grid */}
          <div className="relative">
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-blue-400/30 animate-pulse">
              <div className="text-center">
                <div className="text-white font-bold text-lg">Skills</div>
                <div className="text-blue-200 text-sm">Hub</div>
              </div>
            </div>

            {/* Orbiting Skills */}
            <div className="relative w-96 h-96 mx-auto">
              {[
                { name: 'React', level: 90, color: 'from-cyan-400 to-blue-500', angle: 0 },
                { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-orange-500', angle: 60 },
                { name: 'CSS/SCSS', level: 88, color: 'from-pink-400 to-purple-500', angle: 120 },
                { name: 'Node.js', level: 75, color: 'from-green-400 to-emerald-500', angle: 180 },
                { name: 'UI/UX', level: 82, color: 'from-purple-400 to-pink-500', angle: 240 },
                { name: 'MongoDB', level: 70, color: 'from-emerald-400 to-green-500', angle: 300 }
              ].map((skill, index) => {
                const radius = 140;
                const x = Math.cos((skill.angle * Math.PI) / 180) * radius;
                const y = Math.sin((skill.angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={skill.name}
                    className="absolute w-24 h-24 group cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px - 48px)`,
                      top: `calc(50% + ${y}px - 48px)`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    {/* Skill Circle */}
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${skill.color} p-1 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-700"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.level / 100)}`}
                            className="text-blue-400 transition-all duration-1000"
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Skill Content */}
                        <div className="text-center z-10">
                          <div className="text-white font-bold text-xs">{skill.name}</div>
                          <div className="text-blue-400 text-xs">{skill.level}%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connecting Line */}
                    <div 
                      className="absolute w-0.5 bg-gradient-to-r from-blue-400/50 to-purple-400/50"
                      style={{
                        height: `${radius - 48}px`,
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'top',
                        transform: `rotate(${skill.angle + 180}deg)`
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Skills Categories */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Frontend', 
                skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
                icon: '🎨'
              },
              { 
                title: 'Backend', 
                skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
                icon: '⚙️'
              },
              { 
                title: 'Tools', 
                skills: ['Git', 'Webpack', 'Figma', 'Docker', 'AWS'],
                icon: '🛠️'
              }
            ].map((category, index) => (
              <div key={category.title} className="group">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-gray-300">{skill}</span>
                        <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Let's work together to create something amazing. I'm always excited to take on new challenges!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Let's Connect!</h3>
                <p className="text-gray-300 mb-8">
                  I'm always open to discussing new opportunities, creative projects, or just having a friendly chat about technology and design.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'keerthana@example.com', color: 'from-blue-400 to-cyan-400' },
                  { icon: '📱', label: 'Phone', value: '+91 98765 43210', color: 'from-purple-400 to-pink-400' },
                  { icon: '📍', label: 'Location', value: 'Chennai, Tamil Nadu', color: 'from-green-400 to-emerald-400' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/keerthana', color: 'from-blue-400 to-purple-400' }
                ].map((contact, index) => (
                  <div key={contact.label} className="group">
                    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center text-xl`}>
                          {contact.icon}
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">{contact.label}</div>
                          <div className="text-white font-semibold">{contact.value}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea 
                    rows="5" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> 
      </div>
  );
};

export default AnimatedBackground;