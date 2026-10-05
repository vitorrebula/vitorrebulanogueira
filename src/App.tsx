import { About } from './components/About'
import { AIFocus } from './components/AIFocus'
import { Beyond } from './components/Beyond'
import { ChatWidget } from './components/ChatWidget'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { Skills } from './components/Skills'
import { ScrollProgress } from './components/ui/ScrollProgress'

function App() {
  return (
    <div className="grain relative">
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <AIFocus />
        <Skills />
        <Beyond />
      </main>
      <Contact />
      <ChatWidget />
    </div>
  )
}

export default App
