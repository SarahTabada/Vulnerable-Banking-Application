from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import List, Optional, ClassVar, Literal
from datetime import datetime, date

## User details
class Address(BaseModel):
    street: str = Field(..., min_length=1, max_length=200, description="Street address")
    city: str = Field(..., min_length=1, max_length=100, description="City")
    state: str = Field(..., min_length=2, max_length=2, description="State abbreviation")
    zipCode: str = Field(..., min_length=3, max_length=10, description="ZIP or postal code")


class User(BaseModel):
    id: int = Field(..., ge=0, description="Unique user ID")
    
    firstName: str = Field(..., min_length=1, max_length=100, description="User's first name")
    lastName: str = Field(..., min_length=1, max_length=100, description="User's last name")
    
    email: EmailStr = Field(..., description="User's email address")
    phone: str = Field(..., min_length=1, max_length=20, description="User's phone number")

    address: Address = Field(..., description="User's address details")

    memberSince: date = Field(..., description="Date when the user joined")


## Accounts page
class Account(BaseModel):
    id: int = Field(..., ge=0, description="Unique account ID")
    type: str = Field(..., min_length=1, description="Account type, e.g. Checking, Savings, Credit Card")
    
    accountNumber: str = Field(..., min_length=1, max_length=50, description="Account number")
    nickname: Optional[str] = Field(None, max_length=100, description="User-defined account label")
    
    balance: float = Field(..., description="Current account balance")
    
    # Only applies to credit cards
    availableBalance: Optional[float] = Field(
        None,
        description="Available credit for Credit Card accounts"
    )
    creditLimit: Optional[float] = Field(
        None,
        description="Total credit limit for Credit Card accounts"
    )


class Transaction(BaseModel):
    id: int = Field(..., ge=0, description="Transaction ID")
    
    accountId: int = Field(..., ge=0, description="Associated account ID")
    
    date: datetime = Field(..., description="Date the transaction occurred")
    description: str = Field(..., min_length=1, max_length=200, description="Transaction description")
    
    amount: float = Field(..., description="Transaction amount (negative for debits, positive for credits)")
    category: Optional[str] = Field(None, description="Spending category if applicable")
    
    balanceAfter: Optional[float] = Field(
        None,
        description="Account balance after the transaction was applied"
    )

## Login Page
class LoginRequest(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=3)

## Transfer Page
class Transfer(BaseModel):
    id: int = Field(..., ge=0, description="Unique transfer ID")

    fromAccountId: int = Field(
        ..., ge=0, description="ID of the account the transfer is sent from"
    )
    toAccountId: int = Field(
        ..., ge=0, description="ID of the account the transfer is sent to"
    )

    date: datetime = Field(..., description="Timestamp of the transfer")

    type: str = Field(
        ..., min_length=1,
        description="Transfer type (e.g., INTERNAL, EXTERNAL, WIRE, ACH)"
    )

    amount: float = Field(
        ..., ge=0,
        description="Amount transferred"
    )

    status: Literal["pending", "completed", "failed"] = Field(
        ..., description="Current status of the transfer"
    )