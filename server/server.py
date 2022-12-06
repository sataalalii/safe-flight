from flask import Flask
import api

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello'


@app.route('/airportsDB')
def airportsDB():
    result = api.getAirportsDB()
    return result
    # print(result)
    # return result


@app.route('/warningLevel')
def warningLevel():
    result = api.getWarningLevel('')
    return result


if __name__ == '__main__':
    # app.run(host='localhost', port=5000)
    app.run(debug=True)
