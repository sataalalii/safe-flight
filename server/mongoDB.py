import pymongo
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["mydatabase"]

mycol = mydb['airports']

def createCollection():
    mycol = mydb['airports']


def insert_one(data):
    x = mycol.insert_one(data)
    return x


def insert_many(data_collection):
    x = mycol.insert_many(data_collection)
    return x


def find(s, p):
    return mycol.find(s, p)
