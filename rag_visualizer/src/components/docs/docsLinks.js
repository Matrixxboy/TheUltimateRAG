import {
  Book,
  Code,
  Terminal,
  Layers,
  Cpu,
  Settings,
  Package,
  Database,
} from "lucide-react"

export const docsLinks = [
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
