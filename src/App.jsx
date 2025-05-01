

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlight"
import Models from "./components/Models"
import * as Sentry from '@sentry/react'
import Feactures from "./components/Feactures"
import HowItWorks from "./components/HowItWorks"

const App = ()  => {
  // return <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;
  return (
    <main className="bg-black">
    <Navbar/>
    <Hero/>
    <Highlights/>
    <Models/>
    <Feactures/>
    <HowItWorks/>

    </main>
    
  )
}

export default Sentry.withProfiler(App)
