from flask import Blueprint, jsonify

testing_connection_bp = Blueprint("testing_connection_bp", __name__)

@testing_connection_bp.route("/testing_connection", methods=["GET"])
def home_route():
    return jsonify({"message": "Flask backend running!"})
