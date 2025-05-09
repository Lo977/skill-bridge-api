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

    skill_offers = db.relationship("Offer", back_populates="user", cascade="all, delete-orphan")

    serialize_rules = ("-_password_hash", "-skill_offers.user")

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
        return bcrypt.check_password_hash(self._password_hash, password)
    

'''-------------------------------Skill--------------------------------------------'''
class Skill(db.Model, SerializerMixin):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False, unique=True)

    offers = db.relationship("Offer", back_populates="skill", cascade="all, delete-orphan")

    serialize_rules = ("-offers.skill",)


'''---------------------------------SkillOffer------------------------------------------'''
class Offer(db.Model, SerializerMixin):
    __tablename__ = "offers"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="skill_offers")

    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)
    skill = db.relationship("Skill", back_populates="offers")

    serialize_rules = ("-user.skill_offers", "-skill.offers")