#!/usr/bin/env python3
from flask import request, session
from flask_restful import Resource
from flask_cors import CORS

from config import app, db, api
from models import User, Offer, Skill

CORS(app)



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


api.add_resource(Singup,"/signup")



    

if __name__ == '__main__':
    app.run(port=5555, debug=True)
