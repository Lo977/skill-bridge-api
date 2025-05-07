from faker import Faker
from random import choice as rc
from config import app, db
from models import User, SkillOffer, SkillMatch, Skill

fake = Faker()

with app.app_context():
    print("🌱 Seeding data...")

    # Clear existing data
    SkillMatch.query.delete()
    SkillOffer.query.delete()
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
    for _ in range(20):
        offer = SkillOffer(
            title=fake.bs().title(),
            description=fake.text(),
            experience_level=rc(['Beginner', 'Intermediate', 'Advanced']),
            skill_id=rc(skills).id,
            user_id=rc(users).id
        )
        offers.append(offer)
    db.session.add_all(offers)
    db.session.commit()

    # Seed SkillMatches
    matches = []
    for _ in range(30):
        user = rc(users)
        offer = rc(offers)
        skill = rc(skills)

        # Avoid matching a user with their own offer
        if user.id != offer.user_id:
            match = SkillMatch(
                user_id=user.id,
                skill_id = skill.id,
                offer_id=offer.id
            )
            matches.append(match)

    db.session.add_all(matches)
    db.session.commit()

    print("✅ Done seeding!")


