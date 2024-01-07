import random
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

Fixed = [
    {"id": 1, "sum": 250000, "interest": 1.5, "years": 30, "monthlyFee": 980},
    {"id": 2, "sum": 250000, "interest": 1.6, "years": 25, "monthlyFee": 1005},
    {"id": 3, "sum": 250000, "interest": 1.7, "years": 25, "monthlyFee": 1075},
    {"id": 4, "sum": 250000, "interest": 1.8, "years": 23, "monthlyFee": 1084},
    {"id": 5, "sum": 250000, "interest": 1.9, "years": 21, "monthlyFee": 1099},
]

Prime = [
    {"id": 1, "sum": 370000, "interest": 2.1, "years": 15, "monthlyFee": 1621},
    {"id": 2, "sum": 370000, "interest": 2.4, "years": 10, "monthlyFee": 1833},
    {"id": 3, "sum": 370000, "interest": 2.7, "years": 15, "monthlyFee": 1743},
    {"id": 4, "sum": 370000, "interest": 2.8, "years": 8, "monthlyFee": 1999},
    {"id": 5, "sum": 370000, "interest": 2.9, "years": 6, "monthlyFee": 1992},
]

changesEvery5 = [
    {"id": 1, "sum": 380000, "interest": 1.8, "years": 15, "monthlyFee": 1690},
    {"id": 2, "sum": 380000, "interest": 1.9, "years": 10, "monthlyFee": 1856},
    {"id": 3, "sum": 380000, "interest": 2, "years": 15, "monthlyFee": 1799},
    {"id": 4, "sum": 380000, "interest": 2.1, "years": 12 , "monthlyFee": 1772},
    {"id": 5, "sum": 380000, "interest": 2.2, "years": 11, "monthlyFee": 1921},
]


#
@app.route("/random_bank", methods=["GET"])
def get_random_offer():
    # Randomize a bank
    random_bank = random.randint(0, 4)
    # Randomize a fixed offer
    random_id_fixed = random.randint(0, 4)
    random_id_prime = random.randint(0, 4)
    random_id_changes = random.randint(0, 4)

    def get_years(random_id_fixed, random_id_prime, random_id_changes):
        totayears = 0
        for entry in Fixed:
            if int(entry["id"]) == int(random_id_fixed + 1):
                totayears += int(entry["years"])
                print(totayears)
                break
        for entry1 in Prime:
            if int(entry1["id"]) == int(random_id_prime + 1):
                totayears += int(entry1["years"])
                print(totayears)
                break
        for entry2 in changesEvery5:
            if int(entry2["id"]) == int(random_id_changes + 1):
                totayears += int(entry2["years"])
                print(totayears)
                break
        return totayears

    def get_monthly_payment(random_id_fixed, random_id_prime, random_id_changes):
        totalpay = 0
        for entry in Fixed:
            if int(entry["id"]) == int(random_id_fixed + 1):
                totalpay += int(entry["monthlyFee"])
                print(totalpay)
                break
        for entry1 in Prime:
            if int(entry1["id"]) == int(random_id_prime + 1):
                totalpay += int(entry1["monthlyFee"])
                print(totalpay)
                break
        for entry2 in changesEvery5:
            if int(entry2["id"]) == int(random_id_changes + 1):
                totalpay += int(entry2["monthlyFee"])
                print(totalpay)
                break
        return totalpay

    response_data = {
        "fixed": Fixed[random_id_fixed],
        "prime": Prime[random_id_prime],
        "changes_every_5_years_offer": changesEvery5[random_id_changes],
        "monthly_payment:": get_monthly_payment(
            random_id_fixed, random_id_prime, random_id_changes
        ),
    }
    return jsonify(response_data)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
