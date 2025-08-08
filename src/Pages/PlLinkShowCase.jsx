import React, { useState } from 'react';
import { ExternalLink, TrendingUp, Calendar, DollarSign, BarChart3, Target, Zap, Send } from 'lucide-react';
import SimpleImageCarousel from './SimpleImageCarousel';

const PlLinkShowcase = () => {
  // Fixed: Using tradingCardsData instead of allPnlData
  const tradingCardsData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/Y4iRBLQym7M3FM?fbclid=PAQ0xDSwLsNfRleHRuA2FlbQIxMAABp9Dhl304Ooees-ZT1M9C2JJ1q5xOvkitZ659cVmwAZidVzQ9GZl2Pv86YSvR_aem_bZGWlmz80xMzjqiAiPh_bQ",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/6HwbpJTLEKzwPD?fbclid=PAQ0xDSwLsNkhleHRuA2FlbQIxMAABpxzIezkDx06BLrrtwfysb-rTq3uLcx6Z99hIEvN2EVqlkiT5ytRWujjsvwpR_aem_14tCVQLLKTzzQhzIsfeDUA",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/ZIW0lFPMdrLvf4?fbclid=PAQ0xDSwLsNlhleHRuA2FlbQIxMAABp1pyGK7xqnyH9K8XgWEoXf-2HW2U4ZwrhMB0uOyRBo5XUotO_zc2DjWZux1b_aem_Dbyw2M7Amp_PSbpqcmX0ZQ",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/harebrained-wolf/yjSAdQqMHH7xFk?fbclid=PAQ0xDSwLsNohleHRuA2FlbQIxMAABpxLbWT8DYIjITDpG-McExUPJB7gYBy9TguhYlW3zG5Fan29ilQniO3kn3-R4_aem_B8F56xDAO9KKGhZM13NVsA",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/harebrained-wolf/3kz5rFl1JgjPZn?fbclid=PAQ0xDSwLsNq5leHRuA2FlbQIxMAABp5NZuCXJUYugLitkTmpj0-thNXCLPOUVgVU1G5etEU4f6CxeznSAnqNhi8uy_aem_S3C3NaeP_RQ-9GFyhkvyWQ",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/Y4iRBLQym7M3FM?fbclid=PAQ0xDSwLsNslleHRuA2FlbQIxMAABp5snQYEnF9X-5Khq80CiKB3RG2MEUpKbG6qiL-Zscj6kMAL8uCxtdtxYJJJN_aem_upLi8fkfmdtsLV3aLnEzRw",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/smallcap/77MNO345"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/Y4iRBLQym7M3FM?fbclid=PAQ0xDSwLsNslleHRuA2FlbQIxMAABp5snQYEnF9X-5Khq80CiKB3RG2MEUpKbG6qiL-Zscj6kMAL8uCxtdtxYJJJN_aem_upLi8fkfmdtsLV3aLnEzRw"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/harebrained-wolf/live-positions?fbclid=PAQ0xDSwLsNuFleHRuA2FlbQIxMAABp5NZuCXJUYugLitkTmpj0-thNXCLPOUVgVU1G5etEU4f6CxeznSAnqNhi8uy_aem_S3C3NaeP_RQ-9GFyhkvyWQ",
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/6HwbpJTLEKzwPD?fbclid=PAQ0xDSwLsNwdleHRuA2FlbQIxMAABp9Dhl304Ooees-ZT1M9C2JJ1q5xOvkitZ659cVmwAZidVzQ9GZl2Pv86YSvR_aem_bZGWlmz80xMzjqiAiPh_bQ      ",
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/FQsiyT1xcz7LRZ?fbclid=PAQ0xDSwLsNy5leHRuA2FlbQIxMAABpxzIezkDx06BLrrtwfysb-rTq3uLcx6Z99hIEvN2EVqlkiT5ytRWujjsvwpR_aem_14tCVQLLKTzzQhzIsfeDUA",
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=250&fit=crop&auto=format",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/ZIW0lFPMdrLvf4?fbclid=PAQ0xDSwLsN2FleHRuA2FlbQIxMAABpxLbWT8DYIjITDpG-McExUPJB7gYBy9TguhYlW3zG5Fan29ilQniO3kn3-R4_aem_B8F56xDAO9KKGhZM13NVsA",
    }
  ];

  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-gray-600 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Verified P&L 
            <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent"> Results</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Real trading results from our proven strategies. Each link shows verified profit & loss statements.
          </p>

          {/* Stats Overview */}
          
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all','high-profit'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === filterType
                  ? 'bg-gradient-to-r from-blue-500 to-gray-600 text-white shadow-lg'
                  : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50 border border-gray-600/30'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* P&L Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tradingCardsData.map((card, index) => (
            <div
              key={card.id}
              className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                hoveredCard === card.id ? 'z-10' : ''
              }`}
              onClick={() => handleCardClick(card.url)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Image */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={`Trading Strategy ${card.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <ExternalLink className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                  {/* <div className="absolute bottom-3 left-3">
                    <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">Strategy #{card.id}</span>
                    </div>
                  </div> */}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="text-center">
                    <div className="text-gray-300 text-sm mb-2">Verified P&L Report</div>
                    <div className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-medium">View Results</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

<SimpleImageCarousel/>
        {/* Call to Action */}
        <div className="text-center mt-16">
      <div className="bg-gradient-to-r from-gray-800/60 to-blue-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 max-w-4xl mx-auto">
        <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Trading?</h3>
        <p className="text-gray-300 mb-6">Join our academy and learn the strategies behind these verified results.</p>
        
        <a
          href="https://t.me/tpkgiytd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto transform hover:scale-105 shadow-lg">
            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Join Our Telegram</span>
          </button>
        </a>
      </div>
    </div>
      </div>
    </div>
  );
};

export default PlLinkShowcase;