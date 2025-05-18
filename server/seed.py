from faker import Faker
from random import choice as rc
from config import app, db
from models import User, Skill, Offer

fake = Faker()

with app.app_context():
    print("🌱 Seeding database...")

    # Clear existing data
    print("🔄 Clearing old data...")
    Offer.query.delete()
    Skill.query.delete()
    User.query.delete()
    db.session.commit()

    # Seed Skills
    print("🌟 Creating skills...")
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
    print("👤 Creating users...")
    users = []
    for _ in range(20):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        user.password_hash = "password"  # Replace with secure logic if needed
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    # Seed Offers
    print("📚 Creating offers...")
    offers = []
    for _ in range(30):
        offer = Offer(
            title=fake.catch_phrase(),
            description=fake.paragraph(nb_sentences=3),
            user_id=rc(users).id,
            skill_id=rc(skills).id
        )
        offers.append(offer)
    db.session.add_all(offers)
    db.session.commit()

    print("✅ Done seeding!")
