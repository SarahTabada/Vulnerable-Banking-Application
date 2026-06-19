## no longer used

# import random
# from datetime import date, timedelta
# import uuid
# from app.schemas.database.db import Customer, Branch, Account, Loan, TransactionLog
# from app.depends import get_db_session
# import bcrypt
# from sqlalchemy import select
# from app.schemas.database.db import Customer

# ACCOUNT_TYPES = ['checking', 'savings', 'money_market', 'cd']
# ACCOUNT_STATUS = ['active', 'closed', 'frozen', 'dormant']
# LOAN_STATUS = ['active', 'closed', 'defaulted', 'pending']
# TRANSACTION_TYPES = ['deposit','withdrawal','transfer_in','transfer_out','fee','interest']

# def seed_customers():
    
#     dummy_customers = [
#         {
#             "password": "password123",
#             "name": "John Doe",
#             "street": "123 Elm Street",
#             "city": "Springfield",
#             "state": "IL",
#             "phone": "555-123-4567",
#             "email": "john.doe@example.com",
#             "date_of_birth": "1985-05-12",
#         },
#         {
#             "password": "securepass",
#             "name": "Jane Smith",
#             "street": "88 Oak Ave",
#             "city": "Denver",
#             "state": "CO",
#             "phone": "555-987-6543",
#             "email": "jane.smith@example.com",
#             "date_of_birth": "1990-02-20",
#         },
#         {
#             "password": "hello_world",
#             "name": "Alice Johnson",
#             "street": "44 Pine Blvd",
#             "city": "Austin",
#             "state": "TX",
#             "phone": "555-321-7654",
#             "email": "alice.j@example.com",
#             "date_of_birth": "1993-10-01",
#         },
#     ]

#     with get_db_session() as db:
#         for data in dummy_customers:

#             # Check if customer already exists by unique email
#             existing = db.execute(
#                 select(Customer).where(Customer.email == data["email"])
#             ).scalar_one_or_none()

#             if existing:
#                 print(f"Skipping {data['email']} — already exists")
#                 continue

#             # Hash password
#             hashed_pw = bcrypt.hashpw(
#                 data["password"].encode("utf-8"),
#                 bcrypt.gensalt()
#             ).decode("utf-8")

#             # Create new user
#             customer = Customer(
#                 password=hashed_pw,
#                 name=data["name"],
#                 street=data.get("street"),
#                 city=data.get("city"),
#                 state=data.get("state"),
#                 phone=data.get("phone"),
#                 email=data.get("email"),
#                 date_of_birth=data.get("date_of_birth"),
#             )

#             db.add(customer)
#             print(f"Inserted {data['email']}")

#         print("Customer seeding completed.")

# def seed_branches():
#     branch_data = [
#         {"name": "Main Branch", "street": "1 Bank St", "city": "Springfield", "state": "IL", "phone": "555-111-2222", "manager_name": "Alice Manager"},
#         {"name": "Downtown Branch", "street": "123 Elm Street", "city": "Denver", "state": "CO", "phone": "555-333-4444", "manager_name": "Bob Manager"},
#         # Add more branches as needed
#     ]

#     with get_db_session() as db:
#         for data in branch_data:
#             exists = db.query(Branch).filter_by(name=data["name"]).first()
#             if exists:
#                 continue
#             branch = Branch(**data)
#             db.add(branch)
#         db.flush()
#         print("Branches seeded successfully.")

# def seed_accounts_loans_transactions_uuid():
#     with get_db_session() as db:

#         customers = db.query(Customer).all()
#         branches = db.query(Branch).all()

#         # ------------------------
#         # Accounts
#         # ------------------------
#         for customer in customers:
#             for _ in range(random.randint(1,3)):
#                 branch = random.choice(branches)
#                 acct_type = random.choice(ACCOUNT_TYPES)
#                 status = random.choice(ACCOUNT_STATUS)
#                 opening_date = date.today() - timedelta(days=random.randint(30, 365*5))
#                 balance = round(random.uniform(100, 10000), 2)

#                 exists = db.query(Account).filter_by(
#                     customer_id=customer.customer_id,
#                     branch_id=branch.branch_id,
#                     account_type=acct_type
#                 ).first()
#                 if exists:
#                     continue

#                 account = Account(
#                     #account_id=str(uuid.uuid4()),  # UUID for account
#                     customer_id=customer.customer_id,
#                     branch_id=branch.branch_id,
#                     account_type=acct_type,
#                     balance=balance,
#                     opening_date=opening_date,
#                     status=status
#                 )
#                 db.add(account)
#         db.flush()

#         accounts = db.query(Account).all()

#         # ------------------------
#         # Loans
#         # ------------------------
#         for customer in customers:
#             for _ in range(random.randint(0,2)):
#                 branch = random.choice(branches)
#                 amount = round(random.uniform(5000, 50000), 2)
#                 interest_rate = round(random.uniform(0.01, 0.10), 3)
#                 start_date = date.today() - timedelta(days=random.randint(30, 365*3))
#                 end_date = start_date + timedelta(days=365*random.randint(1,5))
#                 status = random.choice(LOAN_STATUS)

#                 exists = db.query(Loan).filter_by(
#                     customer_id=customer.customer_id,
#                     branch_id=branch.branch_id,
#                     amount=amount,
#                     start_date=start_date
#                 ).first()
#                 if exists:
#                     continue

#                 loan = Loan(
#                     #loan_id=str(uuid.uuid4()),  # UUID for loan
#                     customer_id=customer.customer_id,
#                     branch_id=branch.branch_id,
#                     amount=amount,
#                     interest_rate=interest_rate,
#                     start_date=start_date,
#                     end_date=end_date,
#                     status=status
#                 )
#                 db.add(loan)

#         db.flush()

#         # ------------------------
#         # Transactions
#         # ------------------------
#         for account in accounts:
#             for _ in range(random.randint(5, 15)):
#                 t_type = random.choice(TRANSACTION_TYPES)
#                 amount = round(random.uniform(10, 2000), 2)
#                 t_date = date.today() - timedelta(days=random.randint(0, 365))
#                 description = f"Mock {t_type} transaction"

#                 transaction = TransactionLog(
#                     #transaction_id=str(uuid.uuid4()),  # UUID if your PK is CHAR(36)
#                     account_id=account.account_id,
#                     transaction_type=t_type,
#                     amount=amount,
#                     transaction_date=t_date,
#                     description=description
#                 )
#                 db.add(transaction)

#         print("Accounts, loans, and transactions seeded successfully (UUIDs used).")
