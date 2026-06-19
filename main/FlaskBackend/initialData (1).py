from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, ClassVar
from datetime import datetime

## Details inside JWT
class UserJWT(BaseModel):
    user_id: int = Field(..., ge=0, description="userid")