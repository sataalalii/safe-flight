import pymongo
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["mydatabase"]

mycountries = mydb['countries']


def createCollection(name):
    mycol = mydb[name]
    return mycol


def getCollection(name):
    if (name in mydb.list_collection_names()):
        return mydb[name]
    else:
        return None


def insert_one(mycol, data):
    x = mycol.insert_one(data)
    return x


def insert_many(mycol, data_collection):
    x = mycol.insert_many(data_collection)
    return x


def find(mycol, s, p):
    return mycol.find(s, p)


def drop(mycol):
    return mycol.drop()
