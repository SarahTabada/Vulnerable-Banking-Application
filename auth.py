from datetime import datetime

from app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # For demo only; hash in prod
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(30))
    user_type = db.Column(db.String(30), default='personal')
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    accounts = db.relationship('Account', backref='owner', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'userType': self.user_type,
            'isAdmin': self.is_admin
        }


class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(50))
    nickname = db.Column(db.String(80))
    balance = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    transactions = db.relationship('Transaction', backref='account', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'type': self.type,
            'nickname': self.nickname,
            'balance': self.balance
        }


class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.String(255))
    amount = db.Column(db.Float)
    type = db.Column(db.String(20))
    category = db.Column(db.String(80))
    status = db.Column(db.String(50), default='completed')

    def to_dict(self):
        return {
            'id': self.id,
            'accountId': self.account_id,
            'date': self.date.strftime('%Y-%m-%d'),
            'description': self.description,
            'amount': self.amount,
            'type': self.type,
            'category': self.category,
            'status': self.status
        }

class Payee(db.Model):
    __tablename__ = "payee"
    id = db.Column("payee_id", db.Integer, primary_key=True)
    customer_id = db.Column(db.String(36), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    payee_type = db.Column(db.String(100))
    account_number = db.Column(db.String(255))
    average_amount = db.Column(db.Float)
    last_payment = db.Column(db.Date)

    def to_dict(self):
        return {
            "id": self.id,
            "customerId": self.customer_id,
            "name": self.name,
            "type": self.payee_type,
            "accountNumber": self.account_number,
            "averageAmount": self.average_amount,
            "lastPayment": self.last_payment.strftime("%Y-%m-%d") if self.last_payment else None
        }

class Payment(db.Model):
    __tablename__ = "payment"
    id = db.Column("payment_id", db.Integer, primary_key=True)
    customer_id = db.Column(db.String(36))
    payee_id = db.Column(db.Integer, db.ForeignKey("payee.payee_id"))
    from_account = db.Column(db.Integer, db.ForeignKey("accounts.id"))
    amount = db.Column(db.Float)
    payment_date = db.Column(db.Date)
    memo = db.Column(db.String(255))
    frequency = db.Column(db.String(50))
    status = db.Column(db.String(50))
    payee = db.relationship("Payee", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "customerId": self.customer_id,
            "payeeId": self.payee_id,
            "payeeName": self.payee.name if self.payee else None,
            "fromAccount": self.from_account,
            "amount": self.amount,
            "date": self.payment_date.strftime("%Y-%m-%d") if self.payment_date else None,
            "memo": self.memo,
            "frequency": self.frequency,
            "status": self.status
        }

class Transfer(db.Model):
    __tablename__ = "transfer"
    id = db.Column("transfer_id", db.Integer, primary_key=True)
    customer_id = db.Column(db.String(36))
    from_account = db.Column(db.Integer, db.ForeignKey("accounts.id"))
    to_account = db.Column(db.Integer, db.ForeignKey("accounts.id"))
    external_account = db.Column(db.String(255))
    amount = db.Column(db.Float)
    transfer_date = db.Column(db.Date)
    memo = db.Column(db.String(255))
    frequency = db.Column(db.String(50))
    type = db.Column(db.String(50))
    status = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id,
            "customerId": self.customer_id,
            "fromAccount": self.from_account,
            "toAccount": self.to_account,
            "externalAccount": self.external_account,
            "amount": self.amount,
            "date": self.transfer_date.strftime("%Y-%m-%d") if self.transfer_date else None,
            "memo": self.memo,
            "frequency": self.frequency,
            "type": self.type,
            "status": self.status
        }
