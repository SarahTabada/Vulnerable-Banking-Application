"""Models package for the Flask app.

This package previously held small Pydantic models. We now expose SQLAlchemy
models via the package so callers can `from app.models import User`.
"""

from .entities import User, Account, Transaction

__all__ = ["User", "Account", "Transaction"]
