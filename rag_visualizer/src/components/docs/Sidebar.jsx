import React from "react"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import {
  Book,
  Code,
  Terminal,
  Layers,
  Cpu,
  Settings,
  Package,
  Database,
  Menu,
  X,
} from "lucide-react"

const Sidebar = () => {
  const links = [
    { id: "intro", label: "Introduction", icon: Book },
    { id: "cli-reference", label: "CLI Reference", icon: Terminal },
    { id: "architecture", label: "Architecture", icon: Cpu },
    { id: "env-setup", label: "Environment Setup", icon: Settings },
    { id: "features", label: "Core Features", icon: Layers },
    { id: "memory", label: "Memory System", icon: Database },
    { id: "advanced", label: "Advanced RAG", icon: Package },
    { id: "api", label: "API Reference", icon: Code },
    { id: "integration", label: "Integration", icon: Terminal },
  ]
  const [open, setOpen] = useState(false)
  return (
    <>
      <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4 border-r border-slate-200/60">
        <nav className="space-y-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Guide
          </h3>
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={`/docs/${link.id}`}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={18}
                    className={isActive ? "text-indigo-600" : "text-slate-400"}
                  />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Mobile Menu Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="mobile-menu-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={() => setOpen(true)}
            className="
        md:hidden fixed bottom-14 right-8 z-50
        flex items-center justify-center
        rounded-full px-4 py-4
        bg-purple-300/30
        backdrop-blur-md
        border border-purple-300/40
        shadow-lg shadow-purple-500/20
      "
          >
            <Menu size={26} className="text-purple-900" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 p-4 md:hidden shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Guide
                </h3>
                <button onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <nav className="space-y-1">
                {links.map((link) => (
                  <NavLink
                    key={link.id}
                    to={`/docs/${link.id}`}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <link.icon
                          size={18}
                          className={
                            isActive ? "text-indigo-600" : "text-slate-400"
                          }
                        />
                        {link.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
export default Sidebar
