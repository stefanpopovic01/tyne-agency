import './Home.css'

import Hero from '../Hero/Hero'
import AboutUs from '../AboutUs/AboutUs'
import Services from '../Services/Services'
import Packages from '../Packages/Packages'
import WhyUs from '../WhyUs/WhyUs'
import FAQ from '../Faq/Faq'
import CTA from '../Cta/Cta'
import { useSEO } from '../../hooks/useSEO'
import { useLanguage } from '../../i18n/LanguageContext'

function Home() {
  const { t } = useLanguage()
  useSEO(t.seo.home)

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
