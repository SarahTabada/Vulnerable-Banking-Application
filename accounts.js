import pytest
from flask import Flask
from unittest.mock import patch, MagicMock
from app.routes.auth import auth_bp
from app.utils.AuthDetails import COOKIE_NAME

## Gave up on writing this after could tell would work

# Sample test user
class User:
    def __init__(self, id):
        self.id = id

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# -----------------------
# Tests for /auth/verify
# -----------------------

def test_verify_no_cookie(client):
    """Should redirect to /login with 401 if no cookie present"""
    response = client.get("/api/auth/verify")
    assert response.status_code == 401

@patch("app.utils.AuthDetails.verify_jwt")
def test_verify_invalid_token(mock_verify_jwt, client):
    """Should redirect to /login if token invalid"""
    mock_verify_jwt.side_effect = Exception("Invalid token")
    client.set_cookie(domain="localhost", key=COOKIE_NAME, value="invalid")
    response = client.get("/api/auth/verify")
    assert response.status_code == 401
    assert "/login" in response.headers["Location"]

@patch("app.utils.AuthDetails.verify_jwt")
def test_verify_valid_token(mock_verify_jwt, client):
    """Should return 200 if token is valid"""
    client.set_cookie(domain="localhost", key=COOKIE_NAME, value="good_token") #can fill with known good later if problems
    response = client.get("/api/auth/verify")
    assert response.status_code == 200
    mock_verify_jwt.assert_called_once_with("good_token")

# -----------------------
# Tests for /auth/login
# -----------------------

# Mocking dependencies for login
@patch("app.routes.auth.authenticate_user")
@patch("app.routes.auth.create_jwt_for_user")
def test_login_success(mock_create_jwt, mock_authenticate_user, client):
    """Should return a cookie and 200 for valid credentials"""
    user = User(id=123)
    mock_authenticate_user.return_value = user
    mock_create_jwt.return_value = "fake_jwt_token"

    data = {"username": "testuser", "password": "testpass"}
    response = client.post("/api/auth/login", json=data)

    assert response.status_code == 200
    assert response.json["user_id"] == user.id
    cookie = response.headers.get("Set-Cookie")
    assert COOKIE_NAME in cookie
    assert "fake_jwt_token" in cookie

@patch("app.auth.routes.authenticate_user")
def test_login_failure(mock_authenticate_user, client):
    """Should return 401 for invalid credentials"""
    mock_authenticate_user.return_value = None
    data = {"username": "wrong", "password": "wrong"}
    response = client.post("/api/auth/login", json=data)
    assert response.status_code == 401
    assert b"Invalid username or password" in response.data
