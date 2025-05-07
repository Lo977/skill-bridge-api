#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, SkillOffer, SkillMatch


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server WELCOME</h1>'
class UserResource(Resource):
    def get(self, id=None):
        if id is not None:
            user = User.query.get(id)  
            if user: 
                return user.to_dict(),200
            return {"message":"User not Foound!"},404
        return [user.to_dict() for user in User.query.all()], 200


api.add_resource(UserResource, '/users', '/users/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

