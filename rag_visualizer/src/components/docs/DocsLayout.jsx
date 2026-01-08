import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const DocsLayout = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}

export default DocsLayout
