import './App.css'
import Header from './components/Header/Header'
import Hero from './pages/Hero/Hero'
import AboutUs from './pages/AboutUs/AboutUs'
import Services from './pages/Services/Services'
import Packages from './pages/Packages/Packages'
import WhyUs from './pages/WhyUs/WhyUs'
import FAQ from './pages/Faq/Faq'
import CTA from './pages/Cta/Cta'
import Footer from './components/Footer/Footer'
import Contact from './pages/Contact/Contact'
import Home from './pages/Home/Home'
import ScheduleCall from './pages/ScheduleCall/ScheduleCall'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <ScrollToTop />

      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/zakazi-call" element={<ScheduleCall />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
