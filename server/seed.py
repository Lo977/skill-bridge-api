from faker import Faker
from random import choice as rc
from config import app, db
from models import User, Skill, Offer

fake = Faker()

with app.app_context():
    print("🌱 Seeding database...")

    # Clear existing data
    Offer.query.delete()
    Skill.query.delete()
    User.query.delete()

    # Seed Skills
    skill_names = [
        'Web Development', 'Data Science', 'UI/UX Design', 'Marketing',
        'DevOps', 'Cybersecurity', 'Cloud Computing', 'AI/ML',
        'Mobile Development', 'Game Development', 'Product Management',
        'Project Management', 'Technical Writing', 'Salesforce', 'SEO',
        'E-Commerce', 'Video Editing', 'Content Writing', 'Graphic Design', 'Blockchain'
    ]
    skills = [Skill(name=name) for name in skill_names]
    db.session.add_all(skills)
    db.session.commit()

    # Seed Users
    users = []
    for _ in range(20):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password()
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    # Seed SkillOffers
    offers = []
    for _ in range(30):
        offer = Offer(
            title=fake.catch_phrase(),
            description=fake.text(),
            user_id=rc(users).id,
            skill_id=rc(skills).id
        )
        offers.append(offer)
    db.session.add_all(offers)
    db.session.commit()

    print("✅ Done seeding!")
