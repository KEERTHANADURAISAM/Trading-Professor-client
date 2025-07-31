import React from 'react'
import AnimatedGridBackground from './AnimatedGridBackground'
import Navbar from './Navbar'
import TradingHeader from './TradingHeader'
import About from './About'
import TradingCourseModule from './TradingCourseModules'
import PlLinkShowcase from './PlLinkShowCase'
import SimpleImageCarousel from './SimpleImageCarousel'

const ClientPage = () => {
  return (
    <AnimatedGridBackground>
      <Navbar/>
      <TradingHeader/>
      <About/>
       <PlLinkShowcase/>
         {/* <SimpleImageCarousel/> */}
      <TradingCourseModule/>
     
    
    </AnimatedGridBackground>
  )
}

export default ClientPage