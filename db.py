from flask import Blueprint, jsonify, request
from app import db

accounts_bp = Blueprint('accounts_bp', __name__)


@accounts_bp.route('/accounts', methods=['GET'])
def list_accounts():
    # Defer importing models until runtime to avoid import-time circularity
    from app.models import Account

    # For demo: if ?userId provided, filter; otherwise return all (admin behavior)
    user_id = request.args.get('userId')
    if user_id:
        accounts = Account.query.filter_by(user_id=int(user_id)).all()
    else:
        accounts = Account.query.all()
    return jsonify([a.to_dict() for a in accounts])


@accounts_bp.route('/accounts/<int:account_id>', methods=['GET'])
def account_detail(account_id):
    from app.models import Account

    account = Account.query.get_or_404(account_id)
    return jsonify(account.to_dict())
