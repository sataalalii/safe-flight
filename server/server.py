import flask
from flask import Flask, jsonify, request
import api
import mongoDB
import bson.json_util as json_util
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello'


@app.route('/countriesDB', methods=["GET", "POST"])
def countriesDB():
    if ("countries" not in mongoDB.mydb.list_collection_names()):
        mycol = mongoDB.createCollection("countries")

    else:
        mycol = mongoDB.getCollection("countries")

    if request.method == 'POST':  # if the intent is to update the DB
        isRestart = request.get_json()['data']
        if (isRestart and "countries" in mongoDB.mydb.list_collection_names()):
            mycol.drop()
    else:  # if getting the database after clicking on loading tab for first time
        x = mycol.find({}, {"_id": 0})
        if (mycol.count_documents({}) > 1):  # if the database already exists, load it instead of recreating it.
            result = []
            for y in x:
                result += [y]
            response = jsonify({"data": result})
            return response

    api_result = api.getCountriesDB()
    mongoResult = mycol.insert_many(json.loads(json_util.dumps(api_result)))

    x = mycol.find({}, {"_id": 0})
    result = []
    for y in x:
        result += [y]
    response = jsonify({"data": result})
    return response


# @app.route('/warningLevel')
# def warningLevel():
#     result = api.getWarningLevel('US')
#
#     return result


@app.route("/favourites", methods=["POST"])
def favourites():
    request_data = request.get_json()["request_data"]
    country_data = request_data.get('data')
    isChecked = request_data.get('is_checked')
    if ("favourites" in mongoDB.mydb.list_collection_names()):
        mycol = mongoDB.getCollection("favourites")
    else:
        mycol = mongoDB.createCollection("favourites")

    if (isChecked):
        mycol.insert_one(country_data)
    else:
        mycol.delete_one(country_data)

    countriesCollection = mongoDB.getCollection("countries")
    countriesCollection.update_one(country_data, {"$set": {"inFavourites": isChecked}})

    return isChecked


if __name__ == '__main__':
    # app.run(host='localhost', port=5000)
    app.run(debug=True)
