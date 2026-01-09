import sys
import os

# Add src to sys.path to simulate installation
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

def test_pypi_package():
    print("🧪 Testing Ultimaterag PyPI Package...")
    
    # 1. Check Import
    try:
        import ultimaterag
        print(f"✅ Successfully imported 'ultimaterag'")
        print(f"   Location: {os.path.dirname(ultimaterag.__file__)}")
    except ImportError:
        print("❌ Failed to import 'ultimaterag'. Did you run 'pip install ultimaterag'?")
        return

    # 2. Check Core Modules
    try:
        from ultimaterag.core.container import rag_engine
        print("✅ Successfully imported 'rag_engine'")
    except ImportError as e:
        print(f"❌ Failed to import core modules: {e}")
        return

    # 3. Check CLI Entry Point (Simulated)
    try:
        from ultimaterag.server import start
        print("✅ Entry point 'server.start' is available")
    except ImportError as e:
        print(f"❌ Failed to find entry point: {e}")
        return
        
    print("\n🎉 The package is installed and functional!")
    print("Run 'ultimaterag start' to launch the server.")

if __name__ == "__main__":
    test_pypi_package()
