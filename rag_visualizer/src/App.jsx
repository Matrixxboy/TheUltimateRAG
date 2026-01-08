import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import RAGDemo from "./pages/RAGDemo"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Docs from "./pages/Docs"
import { ServerStatusProvider } from "./context/ServerStatusProvider"
import MaintenanceScreen from "./components/MaintenanceScreen"

import SmoothScroll from "./components/SmoothScroll"

import Intro from "./components/docs/sections/Intro"
import EnvSetup from "./components/docs/sections/EnvSetup"
import ApiReference from "./components/docs/sections/ApiReference"
import Features from "./components/docs/sections/Features"
import Architecture from "./components/docs/sections/Architecture"
import MemoryDeepDive from "./components/docs/sections/MemoryDeepDive"
import AdvancedRAG from "./components/docs/sections/AdvancedRAG"
import Integration from "./components/docs/sections/Integration"
import { Navigate } from "react-router-dom"

function App() {
  return (
    <ServerStatusProvider>
      <Router>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<RAGDemo />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/docs" element={<Docs />}>
                <Route index element={<Navigate to="intro" replace />} />
                <Route path="intro" element={<Intro />} />
                <Route path="architecture" element={<Architecture />} />
                <Route path="env-setup" element={<EnvSetup />} />
                <Route path="features" element={<Features />} />
                <Route path="memory" element={<MemoryDeepDive />} />
                <Route path="advanced" element={<AdvancedRAG />} />
                <Route path="api" element={<ApiReference />} />
                <Route path="integration" element={<Integration />} />
              </Route>
            </Routes>
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </ServerStatusProvider>
  )
}

export default App
