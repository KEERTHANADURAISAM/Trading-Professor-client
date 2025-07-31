import React from 'react'

const Contact = () => {
  return (
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
  )
}

export default Contact