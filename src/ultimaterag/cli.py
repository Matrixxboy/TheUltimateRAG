import typer
import uvicorn
from datetime import datetime
from ultimaterag.config.settings import settings

app = typer.Typer(
    name="ultimaterag",
    help="🚀 UltimateRAG — A powerful Retrieval-Augmented Generation CLI",
    add_completion=False,
)

# -------------------------
# Helpers
# -------------------------

def get_version():
    return "0.1.1"


def divider(char="═", length=48):
    return char * length


# -------------------------
# Commands
# -------------------------

@app.command()
def start(
    host: str = typer.Option("0.0.0.0", help="Host to bind the server to."),
    port: int = typer.Option(8000, help="Port to bind the server to."),
    reload: bool = typer.Option(True, help="Enable auto-reload."),
):
    """
    Start the UltimateRAG server.
    """
    typer.secho(divider(), fg=typer.colors.BRIGHT_BLUE)
    typer.secho(f"🚀 Starting {settings.APP_NAME}", fg=typer.colors.GREEN, bold=True)
    typer.secho(f"🌐 URL     : http://{host}:{port}", fg=typer.colors.CYAN)
    typer.secho(f"🔁 Reload  : {'ON' if reload else 'OFF'}", fg=typer.colors.YELLOW)
    typer.secho(divider(), fg=typer.colors.BRIGHT_BLUE)

    uvicorn.run(
        "ultimaterag.server:app",
        host=host,
        port=port,
        reload=reload,
    )


@app.command()
def version():
    """
    Show the version of UltimateRAG.
    """
    typer.secho(divider(), fg=typer.colors.MAGENTA)
    typer.secho(
        f"📦 UltimateRAG v{get_version()}",
        fg=typer.colors.BRIGHT_WHITE,
        bold=True,
    )
    typer.secho(divider(), fg=typer.colors.MAGENTA)


@app.command()
def about():
    """
    Show information about UltimateRAG.
    """
    typer.secho(divider(), fg=typer.colors.BRIGHT_GREEN)
    typer.secho(f"ℹ️  {settings.APP_NAME}", bold=True, fg=typer.colors.GREEN)
    typer.echo()
    typer.secho(
        "A modular, production-ready Retrieval-Augmented Generation (RAG) platform.",
        fg=typer.colors.WHITE,
    )
    typer.secho("👨‍💻 Developer : Utsav Lankapati", fg=typer.colors.CYAN)
    typer.secho(
        "🌍 Website   : https://ultimaterag.vercel.app/",
        fg=typer.colors.BLUE,
    )
    typer.secho(divider(), fg=typer.colors.BRIGHT_GREEN)


@app.command()
def license():
    """
    Display project license information.
    """
    year = datetime.now().year

    typer.secho(divider(), fg=typer.colors.BRIGHT_YELLOW)
    typer.secho("📜 MIT LICENSE", bold=True, fg=typer.colors.YELLOW)
    typer.secho(divider(), fg=typer.colors.BRIGHT_YELLOW)
    typer.echo()

    typer.secho(f"© {year} Utsav Lankapati", fg=typer.colors.WHITE)
    typer.echo()

    typer.secho("✔ Permissions:", fg=typer.colors.GREEN, bold=True)
    typer.secho("  • Use the software", fg=typer.colors.GREEN)
    typer.secho("  • Copy and modify", fg=typer.colors.GREEN)
    typer.secho("  • Merge and distribute", fg=typer.colors.GREEN)
    typer.secho("  • Use commercially", fg=typer.colors.GREEN)

    typer.echo()
    typer.secho("⚠ Conditions:", fg=typer.colors.YELLOW, bold=True)
    typer.secho(
        "  • Include original copyright and license notice",
        fg=typer.colors.YELLOW,
    )

    typer.echo()
    typer.secho("❗ Disclaimer:", fg=typer.colors.RED, bold=True)
    typer.secho(
        '  • Provided "AS IS", without warranty of any kind',
        fg=typer.colors.RED,
    )

    typer.echo()
    typer.secho("🔗 GitHub:", fg=typer.colors.CYAN, bold=True)
    typer.secho(
        "  https://github.com/Matrixxboy/",
        fg=typer.colors.BLUE,
        underline=True,
    )

    typer.secho(divider(), fg=typer.colors.BRIGHT_YELLOW)


@app.command()
def help():
    """
    Show a comprehensive UltimateRAG usage guide:
    CLI, API, Architecture, Integration, and Best Practices.
    """
    typer.secho(divider(), fg=typer.colors.BRIGHT_CYAN)
    typer.secho("📚 UltimateRAG — Complete Usage Guide", bold=True, fg=typer.colors.CYAN)
    typer.secho(divider(), fg=typer.colors.BRIGHT_CYAN)
    typer.echo()

    # =====================================================
    # INTRO
    # =====================================================
    typer.secho("🔍 What is UltimateRAG?", bold=True, fg=typer.colors.WHITE)
    typer.echo(
        "UltimateRAG is a modular, production-ready Retrieval-Augmented Generation (RAG) platform\n"
        "designed to help you build AI systems with memory, context, and knowledge grounding."
    )
    typer.echo(
        "It supports document ingestion, vector databases, conversational memory,\n"
        "and seamless API + Python integration."
    )
    typer.echo()

    # =====================================================
    # CLI USAGE
    # =====================================================
    typer.secho("💻 CLI Usage", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.secho("Use the CLI to manage and run UltimateRAG locally or in production.", fg=typer.colors.WHITE)
    typer.echo()

    typer.secho("Common Commands:", bold=True)
    typer.echo("  ▶ Start Server")
    typer.echo("    " + typer.style("ultimaterag start --host 0.0.0.0 --port 8000", fg=typer.colors.GREEN))
    typer.echo()

    typer.echo("  ▶ View App Info")
    typer.echo("    " + typer.style("ultimaterag about", fg=typer.colors.GREEN))

    typer.echo("  ▶ Check Version")
    typer.echo("    " + typer.style("ultimaterag version", fg=typer.colors.GREEN))

    typer.echo("  ▶ View License")
    typer.echo("    " + typer.style("ultimaterag license", fg=typer.colors.GREEN))

    typer.echo()

    # =====================================================
    # SERVER & API
    # =====================================================
    typer.secho("🌐 API & Server Usage", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.echo(
        "When the server is running, UltimateRAG exposes REST APIs\n"
        "for chat, ingestion, memory, and system operations."
    )
    typer.echo()

    typer.secho("Base URL:", bold=True)
    typer.secho("  http://localhost:8000", fg=typer.colors.CYAN)

    typer.echo()
    typer.secho("Interactive API Docs:", bold=True)
    typer.secho("  http://localhost:8000/docs", fg=typer.colors.BLUE)

    typer.echo()
    typer.secho("Core Endpoints (v1):", bold=True)
    typer.echo("  • POST /api/v1/chat        → Chat with memory + context")
    typer.echo("  • POST /api/v1/ingest     → Ingest files / text into vector store")
    typer.echo("  • GET  /api/v1/memory/{session_id} → Retrieve conversation memory")
    typer.echo("  • DELETE /api/v1/memory/{session_id} → Clear memory")

    typer.echo()

    typer.secho("Enviornmental Var need to be used", bold=True, fg=typer.colors.BRIGHT_WHITE)
    
    typer.echo("  • APP_NAME")
    typer.echo("  • APP_ENV")
    typer.echo("  • DEBUG")
    typer.echo("  • LLM_PROVIDER")
    typer.echo("  • EMBEDDING_PROVIDER")
    typer.echo("  • MODEL_NAME")
    typer.echo("  • OPENAI_API_KEY")
    typer.echo("  • ANTHROPIC_API_KEY")
    typer.echo("  • OLLAMA_BASE_URL")
    typer.echo("  • POSTGRES_HOST")
    typer.echo("  • POSTGRES_DB")
    typer.echo("  • POSTGRES_USER")
    typer.echo("  • POSTGRES_PASSWORD")
    typer.echo("  • POSTGRES_PORT")
    typer.echo("  • REDIS_HOST")
    typer.echo("  • REDIS_PORT")
    typer.echo("  • REDIS_PASSWORD")
    typer.echo("  • REDIS_USER")
    typer.echo("  • REDIS_DB")

    # =====================================================
    # PYTHON INTEGRATION
    # =====================================================
    typer.secho("🐍 Python Integration", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.echo(
        "UltimateRAG can be embedded directly inside Python applications\n"
        "without using the HTTP API."
    )
    typer.echo()

    typer.secho("Import Core Engine:", bold=True)
    typer.secho(
        "  from ultimaterag.core.container import rag_engine",
        fg=typer.colors.YELLOW,
    )

    typer.echo()
    typer.secho("Example Usage:", bold=True)
    typer.secho(
        "  response = await rag_engine.chat(\n"
        "      prompt=\"Explain RAG in simple terms\",\n"
        "      session_id=\"user-123\"\n"
        "  )",
        fg=typer.colors.YELLOW,
    )

    typer.echo(
        "This is ideal for:\n"
        "  • Backend services\n"
        "  • Agents\n"
        "  • Chatbots\n"
        "  • Custom pipelines"
    )
    typer.echo()

    # =====================================================
    # ARCHITECTURE
    # =====================================================
    typer.secho("🏗 Architecture Overview", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.echo(
        "UltimateRAG follows a clean, modular architecture:\n"
    )
    typer.echo(
        "  • Ingestion Layer    → Handles files, text, chunking\n"
        "  • Embedding Layer    → Converts data into vectors\n"
        "  • Vector Store       → Chroma, Postgres, etc.\n"
        "  • Memory Manager     → Short & long-term memory\n"
        "  • RAG Engine         → Retrieval + Generation\n"
        "  • API / CLI Layer    → User interaction"
    )
    typer.echo()

    # =====================================================
    # FEATURES
    # =====================================================
    typer.secho("✨ Key Features", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.echo(
        "  • " + typer.style("Pluggable Vector Databases", fg=typer.colors.MAGENTA)
        + " (Chroma, PostgreSQL, future-ready)"
    )
    typer.echo(
        "  • " + typer.style("Advanced Memory Management", fg=typer.colors.MAGENTA)
        + " (session-based, persistent)"
    )
    typer.echo(
        "  • " + typer.style("Fully Modular Design", fg=typer.colors.MAGENTA)
        + " (swap models, stores, logic easily)"
    )
    typer.echo(
        "  • " + typer.style("Async & Scalable", fg=typer.colors.MAGENTA)
        + " (FastAPI + async pipelines)"
    )
    typer.echo(
        "  • " + typer.style("Production Ready", fg=typer.colors.MAGENTA)
        + " (logging, config, extensibility)"
    )
    typer.echo()

    # =====================================================
    # BEST PRACTICES
    # =====================================================
    typer.secho("✅ Best Practices", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.echo(
        "  • Use meaningful session IDs for memory tracking\n"
        "  • Chunk documents properly during ingestion\n"
        "  • Persist vector stores in production\n"
        "  • Use environment variables for secrets\n"
        "  • Monitor latency for large document sets"
    )
    typer.echo()

    # =====================================================
    # LEARNING PATH
    # =====================================================
    typer.secho("🧭 Recommended Learning Path", bold=True, fg=typer.colors.BRIGHT_WHITE)
    typer.echo(
        " 1️⃣ Start the server and explore /docs\n"
        " 2️⃣ Ingest sample documents\n"
        " 3️⃣ Chat using session memory\n"
        " 4️⃣ Integrate via Python\n"
        " 5️⃣ Customize modules for your use case"
    )
    typer.echo()

    typer.secho(divider(), fg=typer.colors.BRIGHT_CYAN)

# -------------------------
# Entry
# -------------------------

def main():
    app()


if __name__ == "__main__":
    main()
