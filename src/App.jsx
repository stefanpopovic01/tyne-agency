import './App.css'
import Layout from './components/Layout/Layout'

import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import ScheduleCall from './pages/ScheduleCall/ScheduleCall'
import Portfolio from './pages/Portfolio/Portfolio'
import NotFound from './components/NotFound/Notfound'
import Success from './pages/Success/Success'
import Uspeh from './pages/Uspeh/Uspeh'
import ContactSuccess from './pages/ContactSuccess/ContactSuccess'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import BlogIndex from './pages/Blog/BlogIndex'
import BlogPost from './pages/Blog/BlogPost'
import { blogSlugs } from './blog/posts'

const pageChildren = () => [
  { index: true, Component: Home },
  { path: 'kontakt', Component: Contact },
  { path: 'zakazi-call', Component: ScheduleCall },
  { path: 'portfolio', Component: Portfolio },
  { path: 'blog', Component: BlogIndex },
  { path: 'blog/:slug', Component: BlogPost, getStaticPaths: () => blogSlugs.map((slug) => `blog/${slug}`) },
  { path: 'zakazi-call/uspesno', Component: Success },
  { path: 'uspeh', Component: Uspeh },
  { path: 'kontakt/uspesno', Component: ContactSuccess },
  { path: 'politika-privatnosti', Component: PrivacyPolicy },
  { path: '*', Component: NotFound },
]

export const routes = [
  {
    path: '/',
    element: <Layout lang="sr" />,
    children: [{ path: '404', Component: NotFound }, ...pageChildren()],
  },
  {
    path: '/en',
    element: <Layout lang="en" />,
    children: [{ path: '404', Component: NotFound }, ...pageChildren()],
  },
]
