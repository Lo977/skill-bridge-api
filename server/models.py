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

    offers = db.relationship("Offer", back_populates="user", cascade="all, delete-orphan")
    skills = association_proxy("offers", "skill",
                               creator=lambda skill: Offer(skill=skill))

    # serialize_rules = ("-_password_hash", "-offers.user")

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates("username")
    def validate_username(self, key, value):
        if not value:
            raise ValueError("Username is required")
        return value
    
    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "username": self.username,
    #         "email": self.email,
    #         # "offers": [offer.to_dict(include_user=True) for offer in self.offers],
    #         "skills": [
    #           {
    #                 "id": offer.skill.id,
    #                 "name": offer.skill.name,
    #                 "offers": [
    #                     o.to_dict()
    #                     for o in offer.skill.offers
    #                     if o.user_id == self.id
    #                 ]
    #             } for offer in self.offers ]
    #     }
        # return {
        #     "id": self.id,
        #     "username": self.username,
        #     "email": self.email,
        #     # "offers": [offer.to_dict(include_user=True) for offer in self.offers],
        #     "skills": list({
        #         offer.skill.id: {
        #             "id": offer.skill.id,
        #             "name": offer.skill.name,
        #             "offers": [
        #                 o.to_dict()
        #                 for o in offer.skill.offers
        #                 if o.user_id == self.id
        #             ]
        #         } for offer in self.offers if offer.skill
        #     }.values())
        # }
    def to_dict(self):
        skill_ids = []
        skills = []

        for offer in self.offers:
            skill = offer.skill

            if skill.id not in skill_ids:
                skill_ids.append(skill.id)

                skills.append({
                    "id": skill.id,
                    "name": skill.name,
                    "offers": [
                        o.to_dict()
                        for o in skill.offers
                        if o.user_id == self.id
                    ]
                })

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "skills": skills
    }


    def __repr__(self):
        return f'Username: {self.username}, Email:{self.email} Id : {self.id}'
# ------------------ Skill ------------------
class Skill(db.Model, SerializerMixin):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False, unique=True)

    offers = db.relationship("Offer", back_populates="skill", cascade="all, delete-orphan")
    

    # serialize_rules = ("-offers.skill",)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return f'Skill Name : {self.name} Id :{self.id}'
# ------------------ Offer (Association Model) ------------------
class Offer(db.Model, SerializerMixin):
    __tablename__ = "offers"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)

    user = db.relationship("User", back_populates="offers")
    skill = db.relationship("Skill", back_populates="offers")

    # serialize_rules = ("-user.offers", "-skill.offers")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "skill_id": self.skill_id,
            "user_id": self.user_id,
        }

        # if self.skill:
        #     data["skill"] = {
        #         "id": self.skill.id,
        #         "name": self.skill.name
        #     }

        # if include_user and self.user:
        #     data["user"] = {
        #         "id": self.user.id,
        #         "username": self.user.username,
        #         "email": self.user.email
        #     }

        # return data

    def __repr__(self):
        return f'Title : {self.title} Description : {self.description} Id : {self.id}'
