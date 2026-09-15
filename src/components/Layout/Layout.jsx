import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import CookieBanner from '../CookieBanner/CookieBanner'
import { LanguageProvider } from '../../i18n/LanguageContext'
import { ConsentProvider } from '../../consent/ConsentContext'

export default function Layout({ lang }) {
  return (
    <LanguageProvider lang={lang}>
      <ConsentProvider>
        <ScrollToTop />
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
        <CookieBanner />
      </ConsentProvider>
    </LanguageProvider>
  )
}
