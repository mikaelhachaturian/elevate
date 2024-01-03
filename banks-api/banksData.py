import random
from flask import Flask, jsonify

app = Flask(__name__)

# List of offers
banks = ["Leumi", "Mizrahi", "Poalim"]
Fixed = [
    {"id": 1, "sum": 250000, "interest": 1.5, "years": 30, "monthlyFee": 980},
    {"id": 2, "sum": 250000, "interest": 1.6, "years": 25, "monthlyFee": 1005},
    {"id": 3, "sum": 250000, "interest": 1.7, "years": 25, "monthlyFee": 1075},
]

Prime = [
    {"id": 1, "sum": 370000, "interest": 2.1, "years": 15, "monthlyFee": 1621},
    {"id": 2, "sum": 370000, "interest": 2.4, "years": 10, "monthlyFee": 1833},
    {"id": 3, "sum": 370000, "interest": 2.7, "years": 15, "monthlyFee": 1743},
]
changesEvery5 = [
    {"id": 1, "sum": 380000, "interest": 1.8, "years": 15, "monthlyFee": 1690},
    {"id": 2, "sum": 380000, "interest": 1.9, "years": 10, "monthlyFee": 1856},
    {"id": 3, "sum": 380000, "interest": 2, "years": 15, "monthlyFee": 1799},
]


#
@app.route("/random_bank", methods=["GET"])
def get_random_offer():
    # Randomize a bank
    random_bank = random.randint(0, 2)
    # Randomize a fixed offer
    random_id_fixed = random.randint(0, 2)
    random_id_prime = random.randint(0, 2)
    random_id_changes = random.randint(0, 2)

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
        "bank_name": banks[random_bank],
        "Fixed offer": Fixed[random_id_fixed],
        "Prime offer": Prime[random_id_prime],
        "Changes every 5 years offer": changesEvery5[random_id_changes],
        "Total years": get_years(random_id_fixed, random_id_prime, random_id_changes),
        "Monthly payment:": get_monthly_payment(
            random_id_fixed, random_id_prime, random_id_changes
        ),
    }
    return jsonify({"result": response_data})


if __name__ == "__main__":
    app.run(host="0.0.0.0")
