# Frontend Guide
### Quick Guide to the interworkings of the backend

This is a simple Flask backend that uses
- Pydantic for schema validation
- SQLAlchemy for ORM models (which also autocreates the tables if they don't exist)
- Pytest for tests

### Extra notes
- Yes all the __init__.py files are needed even when they don't contain anything. This is because python APIs are weird.
- This organization will allow everyone to work independently and only see what they need to

## Folder Structure

### app/schemas 
/frontend IS WHERE FRONT END SEES THEIR OBJECTS <br>
/database IS WHERE THE BACKEND OBJECTS REQUIRED FOR DB FUNCTIONS OCCURS <br>
This is the folder containing pydantic objects (returns and responses only) <br>
Example pydantic objects:
```py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr

class UserSearch(BaseModel):
    email: EmailStr
```

### app/models
THIS IS WHERE SQL PEOPLE SHOULD DO SCHEMA STUFF <br>
This contains all of the SQLAlchemy Models. Aka all of the DB structure. <br>
Yes we can autocreate the SQL structure with these (I will do that later though) <br>
Example SQL Alchemy model
```py
from app import db
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, Integer

class User(db.Model):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

### app/dbfunctions
All the select, etc. Statements that work from the db pydantic objects in Schemas and 
the ORM models in models. <br>
Example:
```py
from app.models.user import User
from app import db

def create_user(username: str, email: str) -> User:
    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()
    return user
```

### app/routes
This actually combines everything together and actually handles the API calls <br>
Example:
```py
from flask import Blueprint, request
from app.schemas.user import UserCreate, UserRead
from app.services.user_service import create_user

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/", methods=["POST"])
def create_user_route():
    user_in = UserCreate(**request.json)  # Validate request with Pydantic
    user_out: UserRead = create_user(user_in)  # Returns Pydantic object
    return user_out.json(), 201
```

### app/utils
This gives common functions and global variables needed to carry out other functionality of the backend <br>
This may need to be cross checked with the front end but infrequentlu <br>
For example getting the time (since we need to use a common timezone) will be here. <br>


### /tests
This will contain Pytest stuff to test full scope of apis <br>
For example:
```py
@pytest.fixture
def app():
    # Create a Flask app instance for testing
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",  # In-memory DB
    })
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()
@pytest.fixture
def client(app):
    return app.test_client()
def test_create_user(client):
    # Input data as Pydantic model
    user_in = UserCreate(username="testuser", email="test@example.com")
    
    # Make POST request using dict representation
    response = client.post("/users/", json=user_in.dict())
    
    # Assert HTTP status code
    assert response.status_code == 201
    
    # Parse response JSON into Pydantic model
    user_out = UserRead.parse_raw(response.data)
    
    # Assert response data
    assert user_out.username == user_in.username
    assert user_out.email == user_in.email
    assert user_out.id is not None
    assert user_out.created_at is not None
```

## Other important Files/Functions
A couple individual files are important

### Requirements.txt
This is where you will place any python libraries you want installed. If you want your code editor
to see the python stuff you should also create a .venv folder in the my_flask_app directory. Steps to do this <br>
Go into my_flask_app directory. Then.
```
python -m venv .venv
.\.venv\Scripts\Activate.ps1 OR IF NOT ON WINDOWS (NO THE CAPS IS NOT PART OF THE COMMAND) source .venv/bin/activate
pip install -r requirements.txt
```

### config.py
Important configuration details like the DB connection will go here

### __init__.py
Configures and initializes everything to start

### app.py
This is the entrypoint of everything
