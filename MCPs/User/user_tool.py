import getpass
import os
import platform
from langchain_core.tools import tool
from config.settings import settings

@tool
def user_mcp():
    """Returns the current system username."""
    return {"user": getpass.getuser()}

@tool
def active_app_mcp():
    """Returns the currently active application/term env variable."""
    # Getting the truly "active window" is OS-specific and complex requires libraries like pygetwindow
    # As per prompt, we use checking TERM env or similar for basic context.
    # We can also check if we are in a specific known environment
    
    return {
        "current_term": settings.TERM,
        "shell": settings.SHELL,
        "platform": platform.platform()
    }
