"""Seed script to create demo users, accounts, and transactions."""
from datetime import datetime, timedelta
from app import create_app, db
from app.models.entities import User, Account, Transaction, Transfer, Payee, Payment
import bcrypt

def seed():
    app = create_app()
    with app.app_context():
        db.create_all()

        # Clear existing data
        Payment.query.delete()
        db.session.commit()
        Payee.query.delete()
        db.session.commit()
        Transfer.query.delete()
        db.session.commit()
        Transaction.query.delete()
        Account.query.delete()
        db.session.commit()
        User.query.delete()
        db.session.commit()

        
        # Create demo users
        admin = User(
            username='admin',
            password=bcrypt.hashpw("admin123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
            first_name='Admin',
            last_name='User',
            email='admin@example.com',
            phone='(555) 000-0000',
            user_type='admin',
            is_admin=True
        )

        john = User(
            username='john.doe',
            password=bcrypt.hashpw("password123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
            first_name='John',
            last_name='Doe',
            email='john.doe@example.com',
            phone='(555) 123-4567',
            user_type='personal'
        )

        jane = User(
            username='jane.smith',
            password=bcrypt.hashpw("business456".encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
            first_name='Jane',
            last_name='Smith',
            email='jane.smith@business.com',
            phone='(555) 234-5678',
            user_type='business'
        )

        db.session.add_all([admin, john, jane])
        db.session.commit()

        # Create accounts for John
        a1 = Account(user_id=john.id, type='Checking', nickname='Primary Checking', balance=2547.83)
        a2 = Account(user_id=john.id, type='Savings', nickname='Emergency Fund', balance=15420.50)
        db.session.add_all([a1, a2])
        db.session.commit()

        # Create a transaction
        t1 = Transaction(account_id=a1.id, date=datetime.utcnow(), description='Direct Deposit - Salary', amount=3500.00, type='credit', category='Income')
        t2 = Transaction(account_id=a1.id, date=datetime.utcnow(), description='Target Store', amount=-89.47, type='debit', category='Shopping')
        db.session.add_all([t1, t2])
        db.session.commit()

        # Accounts for Jane
        b1 = Account(user_id=jane.id, type='Business Checking', nickname='Main Business', balance=45890.25)
        b2 = Account(user_id=jane.id, type='Business Savings', nickname='Reserve Fund', balance=78432.10)
        db.session.add_all([b1, b2])
        db.session.commit()

        transfers = [
            Transfer(
                customer_id=str(john.id),
                from_account=a1.id,
                to_account=a2.id,
                external_account=None,
                amount=200.00,
                transfer_date=datetime.utcnow() - timedelta(days=2),
                memo='Monthly savings',
                frequency='Monthly',
                type='internal',
                status='completed'
            ),
            Transfer(
                customer_id=str(john.id),
                from_account=a1.id,
                to_account=None,
                external_account='9876543210',
                amount=150.00,
                transfer_date=datetime.utcnow() - timedelta(days=1),
                memo='External transfer to friend',
                frequency='Once',
                type='external',
                status='completed'
            ),
            Transfer(
                customer_id=str(jane.id),
                from_account=b1.id,
                to_account=b2.id,
                external_account=None,
                amount=5000.00,
                transfer_date=datetime.utcnow(),
                memo='Quarterly reserve transfer',
                frequency='Quarterly',
                type='internal',
                status='pending'
            ),
            Transfer(
                customer_id=str(jane.id),
                from_account=b1.id,
                to_account=None,
                external_account='1234567890',
                amount=1200.00,
                transfer_date=datetime.utcnow(),
                memo='Payment to supplier',
                frequency='Once',
                type='external',
                status='completed'
            ),
        ]

        db.session.add_all(transfers)
        db.session.commit()

        payees = [
            Payee(customer_id=str(john.id), name='Electric Company', payee_type='Utility', account_number='111222333', average_amount=120.00, last_payment=datetime.utcnow() - timedelta(days=30)),
            Payee(customer_id=str(john.id), name='Water Utility', payee_type='Utility', account_number='444555666', average_amount=45.50, last_payment=datetime.utcnow() - timedelta(days=15)),
            Payee(customer_id=str(jane.id), name='Office Supplies Co.', payee_type='Vendor', account_number='777888999', average_amount=800.00, last_payment=datetime.utcnow() - timedelta(days=20)),
            Payee(customer_id=str(jane.id), name='Payroll Service', payee_type='Service', account_number='000111222', average_amount=2500.00, last_payment=datetime.utcnow() - timedelta(days=10)),
        ]
        db.session.add_all(payees)
        db.session.commit()

        # -------------------- Payments --------------------
        payments = [
            Payment(
                customer_id=str(john.id),
                payee_id=payees[0].id,
                from_account=a1.id,
                amount=125.00,
                payment_date=datetime.utcnow() - timedelta(days=5),
                memo='Electric bill November',
                frequency='Monthly',
                status='completed'
            ),
            Payment(
                customer_id=str(john.id),
                payee_id=payees[1].id,
                from_account=a1.id,
                amount=48.00,
                payment_date=datetime.utcnow() - timedelta(days=3),
                memo='Water bill November',
                frequency='Monthly',
                status='completed'
            ),
            Payment(
                customer_id=str(jane.id),
                payee_id=payees[2].id,
                from_account=b1.id,
                amount=850.00,
                payment_date=datetime.utcnow() - timedelta(days=2),
                memo='Office supplies purchase',
                frequency='Once',
                status='completed'
            ),
            Payment(
                customer_id=str(jane.id),
                payee_id=payees[3].id,
                from_account=b1.id,
                amount=2500.00,
                payment_date=datetime.utcnow(),
                memo='Payroll service fee',
                frequency='Monthly',
                status='completed'
            ),
        ]
        db.session.add_all(payments)
        db.session.commit()

        print('Database seeded with demo users, accounts, and transactions')


if __name__ == '__main__':
    seed()
