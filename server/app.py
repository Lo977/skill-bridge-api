#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,session
from flask_restful import Resource
from flask_cors import CORS

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Offer,Skill
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

'''------------------------------------ CheckSession --------------------------------------'''
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(),200
        return {"error":"Not Logged in"},401
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
    
'''------------------------------------ Logout --------------------------------------'''
class LogoutResource(Resource):
    def delete(self):
        session['user_id'] = None
        return {},204


'''------------------------------------ SkillResource --------------------------------------'''
class SkillResource(Resource):
    def get(self, id =None):
        if id is not None:
            skill = Skill.query.get(id)
            if skill:
                return skill.to_dict(),200
            return {"errors":"Skill not found!"}
        return [skill.to_dict() for skill in Skill.query.all()],200

    def post(self):
        data = request.get_json()
        try:
            skill = Skill(name=data['name'])
            db.session.add(skill)   
            db.session.commit() 
            return skill.to_dict(),201
        except Exception as e:
            return {"error":str(e)},422 

'''------------------------------------ OfferResource --------------------------------------'''  
class OfferResource(Resource):
    def get(self,id=None):
        if id is not None:
            offer = Offer.query.get(id)
            if offer:
                return offer.to_dict(),200
            return {"error":"Offer not found!"} 
        return [offer.to_dict() for offer in Offer.query.all()],200
    
    def post(self):
        data = request.get_json()
        try:
            offer = Offer(
                title = data['title'],
                description = data['description'],
                user_id = data['user_id'],
                skill_id = data['skill_id']
            )
            db.session.add(offer)
            db.session.commit() 
            return offer.to_dict,201
        except Exception as e:
            return {"error":str(e)},422
        
    def patch(self,id=None):
        offer = Offer.query.filter_by(id=id).first()    
        if not offer:
            return {"error":"Offer not found!"},404
        
        data = request.get_json()
        try:
            for field in ['title','description']:
                if field in data:
                    setattr(offer,field,data[field])
            db.session.commit() 
            return offer.to_dict(),200
        except Exception as e:
            return {"error":str(e)},422
        
    def delete(self,id):
        offer = Offer.query.get(id)
        if not offer:
            return {"error":"Offer not found!"},404
        db.session.delete(offer)
        db.session.commit()
        return {},204

    

'''------------------------------------ Routes --------------------------------------''' 
api.add_resource(SkillResource,'/skills','/skills/<int:id>')
api.add_resource(OfferResource,'/offers','/offers/<int:id>')
api.add_resource(CheckSession,'/check_session')
api.add_resource(SignupResource,'/signup')
api.add_resource(LoginResource,'/login')
api.add_resource(LogoutResource,'/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

