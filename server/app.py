#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,session
from flask_restful import Resource
from flask_cors import CORS

# Local imports
from config import app, db, api

# Add your model imports
from models import User, SkillOffer, SkillMatch,Skill
CORS(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server WELCOME</h1>'

class UserResource(Resource):
    def get(self, id=None):
        if id:
            user = User.query.get(id)
            if user:
                return user.to_dict(), 200
            return {'error': 'User not found'}, 404
        return [user.to_dict() for user in User.query.all()], 200

class SkillResource(Resource):
    def get(self, id =None):
        if id is not None:
            skill = Skill.query.get(id)
            if skill:
                return skill.to_dict(),200
            return {"errors":"Skill not found!"}
        return [skill.to_dict() for skill in Skill.query.all()],200
    
class SkillOfferResource(Resource):
    def get(self,id=None):
        if id is not None:
            offer = SkillOffer.query.get(id)
            if offer:
                return offer.to_dict(),200
            return {"error":"Offer not found!"} 
        return [offer.to_dict() for offer in SkillOffer.query.all()],200



api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(SkillResource,'/skills','/skills/<int:id>')
api.add_resource(SkillOfferResource,'/offers','/offers/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

