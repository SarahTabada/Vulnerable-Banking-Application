from flask import Blueprint, jsonify, request
from app import db
from app.models.entities import Payee, Payment, Account
from datetime import datetime
from app.depends import get_insecure_raw_connection
import os

INSECURE = os.getenv("INSECURE", "false").lower() in ("1", "true", "yes", "on")

billing_bp = Blueprint("billing", __name__)


@billing_bp.get("/payees")
def get_payees():
    payees = Payee.query.all()
    return jsonify({
        "payees": [
            {
                "id": p.id,
                "name": p.name,
                "type": p.payee_type,
                "accountNumber": p.account_number,
                "averageAmount": p.average_amount,
                "lastPayment": p.last_payment.isoformat() if p.last_payment else None
            } for p in payees
        ]
    })

@billing_bp.post("/payees/create")
def create_payee():
    data = request.json
    payee = Payee(
        name=data["name"],
        payee_type=data["type"],
        account_number=data["accountNumber"],
        average_amount=0
    )
    db.session.add(payee)
    db.session.commit()
    return jsonify({"success": True, "id": payee.id})


def create_payment_secure():
    data = request.json
    payee_id = data.get("payeeId")

    # If creating a new payee
    if data.get("newPayee"):
        p = data["newPayee"]
        new_p = Payee(
            name=p["name"],
            payee_type=p["type"],
            account_number=p["accountNumber"]
        )
        db.session.add(new_p)
        db.session.commit()
        payee_id = new_p.id

    from_account = Account.query.get(data["fromAccount"])
    if not from_account:
        return jsonify({"success": False, "error": "From account not found"}), 404

    customer_id = str(from_account.user_id)
    amount = float(data["amount"])
    if from_account.balance < amount:
        return jsonify({"success": False, "error": "Insufficient funds"}), 400

    # Deduct money from the account
    from_account.balance -= amount

    payment = Payment(
        customer_id=customer_id,
        payee_id=payee_id,
        from_account=data["fromAccount"],
        amount=data["amount"],
        payment_date=datetime.fromisoformat(data["date"]),
        memo=data.get("memo"),
        frequency=data["frequency"],
        status="scheduled"
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({"success": True, "paymentId": payment.id})

def create_payment_insecure():
    """
    Intentionally vulnerable SQL EXECUTION.
    Demonstrates how SQL injection works by executing raw,
    unsanitized SQL statements.
    """

    data = request.json
    payee_id = data.get("payeeId")

    from_acct = data.get("fromAccount")
    amount = data.get("amount")
    memo = (data.get("memo") or "").replace("'", "''")
    date = data.get("date")
    freq = data.get("frequency", "Once").lower()

    with get_insecure_raw_connection() as raw:
        cur = raw.cursor()

        cur.execute(f"SELECT id FROM accounts WHERE id = {from_acct};")
        acct = cur.fetchone()
        if not acct:
            return jsonify({"success": False, "error": "From account not found"}), 404
        
        if data.get("newPayee"):
            p = data["newPayee"]

            new_payee_sql = (
                "INSERT INTO payee (name, payee_type, account_number) "
                f"VALUES ('{p['name']}', '{p['type']}', '{p['accountNumber']}');"
            )

            print("INSECURE PAYMENT SQL:", new_payee_sql)
            cur.execute(new_payee_sql)
            raw.commit()
            # get last inserted id
            payee_id = cur.lastrowid
        else:
            new_payee_sql = None

        debit_sql = (
            "UPDATE accounts SET balance = balance - "
            f"{amount} WHERE id = {from_acct};"
        )

        print("INSECURE PAYMENT SQL:", debit_sql)
        cur.execute(debit_sql)

        insert_sql = f"""
            INSERT INTO payment
                (customer_id, payee_id, from_account, amount,
                 payment_date, memo, frequency, status)
            VALUES
                ('demo', {payee_id}, {from_acct}, {amount},
                 '{date}', '{memo}', '{freq}', 'scheduled');
        """

        print("INSECURE PAYMENT SQL:", insert_sql)
        cur.execute(insert_sql)

        # flush stacked results
        while cur.nextset() is not None:
            pass

        raw.commit()
        cur.close()

    return jsonify({
        "success": True,
        "message": "Insecure payment executed",
        "debugExecutedSQL": {
            "insertPayeeSQL": new_payee_sql,
            "debitSQL": debit_sql,
            "insertPaymentSQL": insert_sql.strip()
        }
    })

@billing_bp.post("/payments/create")
def create_payments():
    if(INSECURE):
        return create_payment_insecure()
    else:
        return create_payment_secure()

@billing_bp.get("/payments/history")
def payment_history():
    payments = Payment.query.order_by(Payment.payment_date.desc()).limit(25).all()
    return jsonify({
        "payments": [
            {
                "id": p.id,
                "amount": p.amount,
                "date": p.payment_date.isoformat(),
                "payeeName": p.payee.name if p.payee else None,
                "status": p.status
            } for p in payments
        ]
    })
