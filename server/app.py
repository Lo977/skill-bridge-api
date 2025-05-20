#!/usr/bin/env python3
from flask import request, session
from flask_restful import Resource
from flask_cors import CORS

from config import app, db, api
from models import User, Offer, Skill

CORS(app)


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error":"Not logged in "},401
        user = db.session.get(User,user_id)
        return user.to_dict(),200
    
    
class Singup(Resource):
    def post(self):
        data = request.get_json()   
        if User.query.filter_by(username=data['username']).first():
            return {"error":"Username already exists"},400
        user = User(
            username =data['username'],
            email=data['email'] 
        )
        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user.to_dict(),201

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()  
        if user and user.authenticate(data['password']):
            session['user_id']=user.id  
            return user.to_dict(),200
        return {"error":"Invalid username or password"},401


class Logout(Resource):
    def delete(self):
        session["user_id"]=None
        return {},204
    
class SkillResource(Resource):
    def get(self):
        return [skill.to_dict() for skill in Skill.query.all()],200
class OfferResource(Resource):
    # def get(self,id=None):
    #     if id in None:
    #         offers = Offer.query.all()
    #         return[offer.to_dict() for offer in offers],200
    #     else:
    #         offer = Offer.query.filter_by(id=id).first()    
    #         return offer.to_dict(),200
        
    def delete(self,id):
        offer = Offer.query.get(id) 
        db.session.delete(offer)
        db.session.commit()
        return {},204
    
    def patch(self, id):
        offer = Offer.query.get_or_404(id)
        data = request.get_json()
        for attr in ['title', 'description']:
            if attr in data:
                setattr(offer, attr, data[attr])
        db.session.commit()
        return offer.to_dict(), 200
api.add_resource(CheckSession,"/check_session")
api.add_resource(Singup,"/signup")
api.add_resource(Login,"/login")
api.add_resource(Logout,"/logout")
api.add_resource(SkillResource,"/skills")
api.add_resource(OfferResource,"/offers","/offers/<int:id>")


    

if __name__ == '__main__':
    app.run(port=5555, debug=True)
