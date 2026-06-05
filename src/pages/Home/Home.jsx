import './Home.css'

import Hero from '../Hero/Hero'
import AboutUs from '../AboutUs/AboutUs'
import Services from '../Services/Services'
import Packages from '../Packages/Packages'
import WhyUs from '../WhyUs/WhyUs'
import FAQ from '../Faq/Faq'
import CTA from '../Cta/Cta'

function Home() {

  return (
    <>
        <Hero/>
        <AboutUs/>
        <Services/>
        <Packages/>
        <WhyUs/>
        <FAQ/>
        <CTA/>
    </>
  )
}

export default Home
