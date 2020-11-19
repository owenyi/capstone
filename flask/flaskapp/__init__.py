from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flaskapp.config.dbConnection import db

app = Flask(__name__)
app.debug = True
app.config["MONGO_URI"] = "mongodb://%s:%s@%s:%s/%s"%(db.userName, db.passwd, db.host, db.port, db.dbName)
mongo = PyMongo(app)

@app.route("/")
def helloworld():
    return "Hello Flask World!"

@app.route("/db/", methods=['GET'])
def dbHello():
    cursor = mongo.db.tb_diets.find({}, {'_id': 0})
    list_cur = list(cursor)
    return jsonify(list_cur)

# host:port/parameter?argument='argument'
@app.route("/parameter", methods=['GET'])
def dbKeyword():
    argument = request.args.get('argument')
    cursor = mongo.db.tb_diets.find({}, {'_id': 0})
    list_cur = list(cursor)
    print(argument)
    return jsonify(list_cur)