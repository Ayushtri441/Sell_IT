# -*- coding: utf-8 -*-
"""
Created on Thu Aug  3 15:21:55 2023

@author: ayush tripathi
"""

# 1. Library imports
import uvicorn
from fastapi import FastAPI
from ProductName import ProductName
import numpy as np
import pickle
import difflib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
# 2. Create the app object
app = FastAPI()
pickle_in = open("product_suggestions.pkl","rb")
classifier=pickle.load(pickle_in)
list_of_all_products = classifier['list_of_all_products']
similarity = classifier['similarity']
products_data = classifier['products_data']

# adding cors urls

origins = [
    'http://localhost:3000'
]

# add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

#print(classifier)
# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere


# 3. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted Bank Note with the confidence
@app.post('/recomand')
def recommand_product(data:ProductName):
    data = data.dict()
    product_name=data['name']
    list_of_all_products = products_data['car_name'].tolist()
    a=[]
    find_close_match = difflib.get_close_matches(product_name, list_of_all_products)
    if not find_close_match:
        return {
            "data":a
            }

    close_match = find_close_match[0]
    index_of_the_product = products_data.loc[products_data.car_name.str.contains(close_match)].index[0]
    similarity_score = list(enumerate(similarity[index_of_the_product]))
    sorted_similar_product = sorted(similarity_score, key = lambda x:x[1], reverse = True)
    
    i = 1
    
    for product in sorted_similar_product:
        index = product[0]
        car_from_index = products_data[products_data.index==index]['car_name'].values[0]
        if (i<30):
            a.append(car_from_index)
            i+=1
    print(a)
    return {
        "data":a
        }


# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
    
#uvicorn app:app --reload