import React from "react"

const DocSection = ({ id, title, description, children }) => {
  return (
    <div id={id} className="mb-16 scroll-mt-28">
      <div className="mb-8 border-b border-slate-200/60 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  )
}

export default DocSection
