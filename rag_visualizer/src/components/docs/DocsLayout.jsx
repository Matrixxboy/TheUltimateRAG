import React, { useState, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Sidebar from "./Sidebar"
import { docsLinks } from "./docsLinks"

const DocsLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const currentPath = pathname.split("/").pop()

  const currentIndex = docsLinks.findIndex((link) => link.id === currentPath)
  const prevSection =
    currentIndex !== -1 && currentIndex > 0 ? docsLinks[currentIndex - 1] : null

  const nextSection =
    currentIndex !== -1 && currentIndex < docsLinks.length - 1
      ? docsLinks[currentIndex + 1]
      : null

  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!nextSection) return

      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const buffer = 50 // Trigger when 50px from bottom

      if (scrollPosition >= documentHeight - buffer) {
        setShowHint(true)
      } else {
        setShowHint(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [nextSection])

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12 relative min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        {/* Previous Section Button */}
        {prevSection && (
          <button
            onClick={() => {
              window.scrollTo(0, 0)
              navigate(`/docs/${prevSection.id}`)
            }}
            className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 rotate-180 transition-colors" />
            </div>
            <span>Back to {prevSection.label}</span>
          </button>
        )}

        <Outlet />

        {/* Next Section Block at the very end of content */}
        {nextSection && (
          <div className="mt-24 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider">
              Up Next
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0)
                navigate(`/docs/${nextSection.id}`)
              }}
              className="group flex items-center justify-between w-full md:w-auto p-6 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl transition-all hover:shadow-md text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white border border-slate-200 rounded-lg group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                  <nextSection.icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                    {nextSection.label}
                  </h4>
                  <p className="text-sm text-slate-500">
                    Continue to the next section
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        )}
      </main>

      {/* Floating Scroll Hint */}
      <AnimatePresence>
        {showHint && nextSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() => {
              window.scrollTo(0, 0)
              navigate(`/docs/${nextSection.id}`)
            }}
          >
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                Next Section
              </span>
              <span className="font-bold text-white whitespace-nowrap">
                {nextSection.label}
              </span>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DocsLayout
