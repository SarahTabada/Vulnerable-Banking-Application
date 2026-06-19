from flask import Blueprint, jsonify, request

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/user/profile', methods=['GET'])
def user_profile():
    # Defer model import to avoid import-time circularity
    from app.models import User

    # In demo mode, accept ?userId to return that user's profile
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId required for demo profile endpoint'}), 400
    user = User.query.get_or_404(int(user_id))
    return jsonify(user.to_dict())
