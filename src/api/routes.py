"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Product
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/category', methods=['POST', 'GET'])
def get_category():

   categories = Category.query.all()
   data = [category.serialize() for category in categories]
   return jsonify(data), 200

#endpoint para añadir un nuevo producto
@api.route('/product', methods=['POST'])
def create_product():
    #esto hace referencia a los dartos que vienen del formulario
   data= request.json
   print (data)

   product = Product(name= data["name"],price= data["price"],stock= data["stock"],img= data["img"],category_id= data["category"])
   db.session.add(product)
   db.session.commit()
   return jsonify({"msj":"todo ha ido ok"}), 200


#este endpoint extrae de la tabla todos los productos, no esta implementado en el front
@api.route('/product', methods=['GET'])
def get_products():
    #buscamos todos los productos de la tabla
   categories = Product.query.all()
   data = [category.serialize() for category in categories]
   return jsonify(data), 200