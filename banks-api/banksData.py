from flask import Flask, jsonify

app = Flask(__name__)


# List of offers
banks = [
    {'id': 1, 'name': 'Mizrahi', 'sum': 460000, 'period': '6 years', 'interest': 'fixed', 'linkage': 'Linked',
     'monthlyRefund': 6327},
    {'id': 2, 'name': 'Leumi', 'sum': 450000, 'period': '13 years', 'interest': 'fixed', 'linkage': 'Not linked',
     'monthlyRefund': 4500},
    {'id': 3, 'name': 'Poalim', 'sum': 500000, 'period': '10 years', 'interest': 'Prime', 'linkage': 'Not linked',
     'monthlyRefund': 5898}
]


# Endpoint to get all banks
@app.route('/api/banks', methods=['GET'])
def get_banks():
    return jsonify({'banks': banks})


# Endpoint to get a specific bank by ID
@app.route('/api/banks/<int:bank_id>', methods=['GET'])
def get_bank(bank_id):
    bank = next((b for b in banks if b['id'] == bank_id), None)
    if bank:
        return jsonify({'bank': bank})
    else:
        return jsonify({'error': 'bank not found'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0')
