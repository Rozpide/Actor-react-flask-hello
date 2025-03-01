"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Actor
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/actor', methods=['GET'])
def get_actors():
    actors = Actor.query.all()
    return jsonify([actor.serialize() for actor in actors]), 200

@api.route('/actor', methods=['POST'])
def create_actor():
    body = request.json
    if not body or 'name' not in body or 'nationality' not in body:
        return jsonify({"error": "Missing data"}), 400
    
    new_actor = Actor(name=body['name'], nationality=body['nationality'])
    db.session.add(new_actor)
    db.session.commit()
    return jsonify(new_actor.serialize()), 201

@api.route('/actor/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):
    actor = Actor.query.get(actor_id)
    if not actor:
        return jsonify({"error": "Actor not found"}), 404
    
    db.session.delete(actor)
    db.session.commit()
    return jsonify({"message": "Actor deleted"}), 200
