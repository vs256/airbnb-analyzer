from flask import Flask, render_template, request, jsonify
from flask_script import Manager
from forms import predictForm
import pandas as pd
import numpy as np
import gc
import re
import datetime
from collections import defaultdict
from sklearn.feature_extraction import DictVectorizer
from sklearn import linear_model
from scipy import sparse
from sklearn.linear_model import Lasso
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = 's3cr3t'
manager = Manager(app)


def generateModelForAirBNB():
    print("Generating AirBnB Model")
    price_raw = readCSV('dataset/old_airbnb_class.csv') #classes
    print("Read class values")
    prices = removeDollar(price_raw, 'price')
    print("Read features")
    data_features = readCSV('dataset/old_preprocessed.csv')
    vec, data_features_csr = createMatrix(data_features)
    print("Matrix created!!!")
    reg = lassoRegression(data_features_csr, prices)
    app.config['vec'] = vec
    app.config['reg'] = reg
    print("AirBnB model generated")
    # return vec, reg


@manager.command
def runserver():
    generateModelForAirBNB()
    # app.run(debug=False)
    app.run(host='0.0.0.0', port=5000, debug=False)


@app.route('/', methods=['GET', 'POST'])
def index():
    form = predictForm()
    predictValues = {
        'accommodates': 2.0,
        'availability_30': 24,
        'availability_365': 170,
        'availability_60': 54,
        'availability_90': 80,
        'bathrooms': 2.0,
        'bed_type': 'Real Bed',
        'bedrooms': 2.0,
        'beds': 2.0,
        'cancellation_policy': 'moderate',
        'city': 'Bronx',
        'cleaning_fee': '$50.00',
        'extra_people': '$20.00',
        'guests_included': 1,
        'host_identity_verified': 't',
        'host_neighbourhood': 'City Island',
        'neighbourhood': 'City Island',
        'number_of_reviews': 25,
        'property_type': 'House',
        'review_scores_accuracy': 10.0,
        'review_scores_checkin': 10.0,
        'review_scores_cleanliness': 10.0,
        'review_scores_communication': 10.0,
        'review_scores_location': 10.0,
        'review_scores_rating': 100.0,
        'review_scores_value': 10.0,
        'room_type': 'Private room',
        'security_deposit': '$100.00',
        'square_feet': 718.1781305110001,
        'zipcode': '10464'
    }
    if request.method == 'POST':
        print('In post else')
        print("Default values"), predictValues
        vec = app.config['vec']
        reg = app.config['reg']
        
        neighbourhood = form.neighbourhood.data
        guests = form.guests.data
        bathrooms = form.bathrooms.data
        accommodates = form.accommodates.data
        bedrooms = form.bedrooms.data
        beds = form.beds.data
        cancellation_policy = form.cancellation_policy.data
        property_type = form.property_type.data
        room_type = form.room_type.data     

        print("\n\n") 
        print("\n\n****DEBUGG***neighbourhood:", neighbourhood)
        print("\n\n****DEBUGG***room_type:", room_type)    
        print("\n\n****DEBUGG***beds:", beds)  
        print("\n\n")

        predictValues = putValue(predictValues, 'host_neighbourhood', neighbourhood)
        predictValues = putValue(predictValues, 'neighbourhood', neighbourhood)
        predictValues = putValue(predictValues, 'city', neighbourhood)
        predictValues = putValue(predictValues, 'guests_included', guests)
        predictValues = putValue(predictValues, 'bathrooms', bathrooms)
        predictValues = putValue(predictValues, 'accommodates', accommodates)
        predictValues = putValue(predictValues, 'bedrooms', bedrooms)
        predictValues = putValue(predictValues, 'beds', beds)
        predictValues = putValue(predictValues, 'cancellation_policy', cancellation_policy)
        predictValues = putValue(predictValues, 'property_type', property_type)
        predictValues = putValue(predictValues, 'room_type', room_type)

        predictList = [predictValues]
        print ("Changed values", predictList)
        predictArray = vec.transform(predictList)
        print ("Array: ", predictArray.toarray())
        predict = reg.predict(predictArray.toarray())
        print ("Predicted value is:-->", predict)
        price = str(predict[0])
        response = jsonify({'price': price})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        response = jsonify({'price': "-1"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


def readCSV(path):
    # preprocessed_data / preprocessed.csv
    return pd.read_csv(path)


def putValue(predictValues, key, value):
    if value != None:
        predictValues[key] = value
    return predictValues


def removeDollar(data_values, col):
    prices = []
    for i in range(len(data_values[col])):
        price = data_values['price'][i]
        price = re.sub('[,$]', '', price)
        prices.append(float(price))
    print (prices[0:3], len(prices))
    return prices


def createMatrix(data_features):
    dd = defaultdict(list)
    dict_data_features = data_features.to_dict('records')
    vec = DictVectorizer()
    gc.collect()
    data_features_csr = sparse.csr_matrix(vec.fit_transform(dict_data_features))
    print (data_features_csr.shape)
    return vec, data_features_csr


def lassoRegression(data_features_csr, prices):
    # reg = linear_model.LassoLars(alpha=0.06)
    reg = Lasso(alpha=0.06)
    start = datetime.datetime.now()
    reg.fit(data_features_csr, prices)
    end = datetime.datetime.now()
    print ("Time taken to run the model: ", end - start)
    return reg



if __name__ == '__main__':
    manager.run()


