from flask import Flask, request, jsonify

app = Flask(__name__)

# Route for POST method
@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    try:
        # Example user details (modify as needed)
        user_details = {
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "ABCD123"
        }

        data = request.json.get('data', [])

        # Separate numbers and alphabets
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        
        # Find the highest lowercase alphabet
        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

        response = {
            "is_success": True,
            "user_id": user_details['user_id'],
            "email": user_details['email'],
            "roll_number": user_details['roll_number'],
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({
            "is_success": False,
            "message": str(e)
        }), 400


# Route for GET method
@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    return jsonify({
        "operation_code": 1
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
