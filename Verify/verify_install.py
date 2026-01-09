try:
    import ultimaterag
    from ultimaterag.core.vector_store import VectorManager
    from ultimaterag.config.settings import settings
    print(f"Success! Package {theultimaterag.__name__} installed.")
    print(f"Settings loaded: {settings.APP_NAME}")
except ImportError as e:
    print(f"Import failed: {e}")
    exit(1)
except Exception as e:
    print(f"Error: {e}")
    exit(1)
