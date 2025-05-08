from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt
from sqlalchemy.orm import validates

# Models go here!
'''---------------------------------User------------------------------------------'''
class User(db.Model, SerializerMixin):
    __tablename__ = "users" 

    id = db.Column(db.Integer, primary_key=True)    
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    skill_offers = db.relationship('SkillOffer', back_populates='user',cascade="all, delete-orphan")
    skill_matches = db.relationship('SkillMatch', back_populates='user',cascade="all,delete-orphan")

    matched_skill_offers = association_proxy('skill_matches', 'skill_offer')

    # serialize_rules = (
    # '-_password_hash',
    # '-skill_offers.user',
    # '-skill_matches.user',
    # '-matched_skill_offers.user',
    # '-matched_skill_offers.matches',
    # )
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "matched_offers": [
                    {
                        "username": offer.user.username,
                        "title": offer.title
                    }
                    for offer in self.matched_skill_offers
                ]
        }
    
    @validates("username")
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be empty")
        elif User.query.filter_by(username=username).first():
            raise ValueError(f"User with username '{username}' already exists")
        return username
    
    
    @property
    def password_hash(self):
        return self._password_hash  
    
    @password_hash.setter
    def password_hash(self,password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash, password)
    

'''-------------------------------Skill--------------------------------------------'''
class Skill(db.Model,SerializerMixin):
    __tablename__ = 'skills'  

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45),nullable=False,unique=True)  

    offers = db.relationship('SkillOffer',back_populates='skill',cascade="all,delete-orphan")

    # serialize_rules=('-offers.skill',)
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "offers": [
                {
                    "id": offer.id,
                    "title": offer.title,
                    "description": offer.description,
                    "experience_level": offer.experience_level,
                    "user": {
                        "id": offer.user.id,
                        "username": offer.user.username
                    }
                }
                for offer in self.offers
            ]
        }

'''---------------------------------SkillOffer------------------------------------------'''
class SkillOffer(db.Model,SerializerMixin):
    __tablename__ = 'skill_offers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(45), nullable=False)
    description = db.Column(db.String(45), nullable=False)
    experience_level = db.Column(db.String,nullable=False)

    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='skill_offers')

    skill = db.relationship('Skill',back_populates='offers')
    matches = db.relationship('SkillMatch',back_populates='skill_offer',cascade="all,delete-orphan")

    serialize_rules = ('-user.skill_offers','-skill.offers','-matches.skill_offer')
    def to_dict(self):
        return {
            "id":self.id,
            "title":self.title,
            "description":self.description,
            "experience_level":self.experience_level,
            "user":
                {
                 "id":self.user.id,
                 "username":self.user.username
                } if self.user else None,
            "skill":{
                "id":self.skill.id,
                "name":self.skill.name
                }   
            

        }

'''-----------------------------------SkillMatch----------------------------------------'''
class SkillMatch(db.Model,SerializerMixin):
    __tablename__= 'skill_matches'  

    id = db.Column(db.Integer, primary_key=True)
    

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'),nullable=False) 
    offer_id = db.Column(db.Integer, db.ForeignKey('skill_offers.id'),nullable=False)

    user = db.relationship('User', back_populates='skill_matches')
    skill_offer = db.relationship('SkillOffer', back_populates='matches')


    serialize_rules=('-user.skill_matches','-skill_offer.matches')
