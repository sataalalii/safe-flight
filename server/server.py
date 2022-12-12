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
        x = mycol.find({})
        if (mycol.count_documents({}) > 1):  # if the database already exists, load it instead of recreating it.
            result = []
            for y in x:
                result += [y]
            response = jsonify({"data": result})
            return response

    api_result = api.getCountriesDB()
    mongoResult = mycol.insert_many(json.loads(json_util.dumps(api_result)))

    x = mycol.find({})
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


@app.route("/addFavourites", methods=["POST"])
def addFavourites():
    request_data = request.get_json()["request_data"]
    country_data = json.loads(request_data.get('data'))
    isChecked = request_data.get("isChecked")

    if ("favourites" in mongoDB.mydb.list_collection_names()):
        mycol = mongoDB.getCollection("favourites")
    else:
        mycol = mongoDB.createCollection("favourites")

    if (isChecked):
        mycol.insert_one(json.loads(json_util.dumps(country_data)))
    else:
        mycol.delete_one({"_id": country_data["_id"]})

    countriesCollection = mongoDB.getCollection("countries")
    countriesCollection.update_one(country_data, {"$unset": {"inFavourites": 1}})

    return {}

@app.route("/resetFavourites", methods = ["POST"])
def resetFavourites():
    if ("favourites" in mongoDB.mydb.list_collection_names()):
        mycol = mongoDB.getCollection("favourites")
        countriesCollection = mongoDB.getCollection("countries")
        documents = mycol.find({})
        countriesCollection.update_many({"inFavourite": "true"}, {"$unset": {"inFavourite": 1}})
        mycol.drop()

    return {}

@app.route("/favouritesDB")
def favouritesDB():
    result = {}
    if ("favourites" in mongoDB.mydb.list_collection_names()):
        result = []
        mycol = mongoDB.getCollection("favourites")
        x = mycol.find({})
        for y in x:
            result += [y]
        result = jsonify({"data": result})
    return result


if __name__ == '__main__':
    # app.run(host='localhost', port=5000)
    app.run(debug=True)
