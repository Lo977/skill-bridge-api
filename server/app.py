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
@app.before_request
def check_if_logged_in():
    public_routes=["/login","/signup","/check_session"]
    if request.path not in public_routes and not session.get("user_id"):
        return {"error":"Unauthorized"},401
# @app.route('/')
# def index():
#     return '<h1>Project Server WELCOME</h1>'
'''------------------------------------ Signup --------------------------------------'''
class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username = data['username']).first():
            return {"error":"Username already exists"},401
        user = User(
            username = data['username'],
            email = data['email']
        )
        user.password_hash = data['password']
        try:
            db.session.add(user)
            db.session.commit() 
            return user.to_dict(),201
        except Exception:
            return {"error":"422 Unprocessable Entity"}, 422
'''------------------------------------ Login --------------------------------------'''
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()  
        if user and user.authenticate(data['password']):
            session['user_id'] = user.id
            return user.to_dict(),200
        return {"error":"Invalid credentials"}, 401
'''------------------------------------ UserResource --------------------------------------'''
class UserResource(Resource):
    def get(self, id=None):
        if id:
            user = User.query.get(id)
            if user:
                return user.to_dict(), 200
            return {'error': 'User not found'}, 404
        return [user.to_dict() for user in User.query.all()], 200
    

'''------------------------------------ SkillResource --------------------------------------'''
class SkillResource(Resource):
    def get(self, id =None):
        if id is not None:
            skill = Skill.query.get(id)
            if skill:
                return skill.to_dict(),200
            return {"errors":"Skill not found!"}
        return [skill.to_dict() for skill in Skill.query.all()],200

'''------------------------------------ OfferResource --------------------------------------'''  
class OfferResource(Resource):
    def get(self,id=None):
        if id is not None:
            offer = SkillOffer.query.get(id)
            if offer:
                return offer.to_dict(),200
            return {"error":"Offer not found!"} 
        return [offer.to_dict() for offer in SkillOffer.query.all()],200
    

'''------------------------------------ MatchResource --------------------------------------'''  
class MatchResource(Resource):
    def get(self,id=None):
        if id is not None:
            match = SkillMatch.query.get(id)
            if match:
                return match.to_dict(),200
            return {"error":"Match not found!"} 
        return [match.to_dict() for match in SkillMatch.query.all()],200
    

'''------------------------------------ Routes --------------------------------------'''  
api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(SkillResource,'/skills','/skills/<int:id>')
api.add_resource(OfferResource,'/offers','/offers/<int:id>')
api.add_resource(MatchResource,'/matches','/matches/<int:id>')
api.add_resource(SignupResource,'/signup')
api.add_resource(LoginResource,'/login')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

