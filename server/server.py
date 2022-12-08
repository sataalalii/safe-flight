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


@app.route('/airportsDB', methods=["GET", "POST"])
def airportsDB():
    if request.method == 'POST':
        isRestart = request.get_json()['params']['data']
        if (isRestart):
            mongoDB.mycol.drop()

    api_result = api.getAirportsDB()

    if ("airports" not in mongoDB.mydb.list_collection_names()):
        mongoDB.createCollection()
        mongoResult = mongoDB.insert_many(json.loads(json_util.dumps(api_result)))

    x = mongoDB.find({}, {"_id": 0})
    result = []
    for y in x:
        result += [y]
    response = jsonify({"data": result})
    print(response)
    return response


@app.route('/warningLevel')
def warningLevel():
    result = api.getWarningLevel('US')

    return result


if __name__ == '__main__':
    # app.run(host='localhost', port=5000)
    app.run(debug=True)
