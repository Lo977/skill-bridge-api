# Phase 4 Full-Stack Application: Skill Sharing Platform

## Learning Goals

- Build and connect a Flask backend and React frontend.
- Apply RESTful routing and dynamic component rendering.
- Deploy and document a full-stack application.

---

## Introduction

This project is a skill-sharing platform where users can post skill offers and get matched with other users based on shared skills. It demonstrates a complete full-stack application using Flask for the backend and React for the frontend.

```console
$ tree -L 2
$ # the -L argument limits the depth at which we look into the directory structure
.
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    ├── seed.py
    └── routes/
```

A `migrations` folder will be added to the `server` directory in a later step.

NOTE: If you did not previously install `tree` in your environment setup, MacOS
users can install this with the command `brew install tree`. WSL and Linux users
can run `sudo apt-get install tree` to download it as well.

### Removing Existing Git Configuration

rm -rf .git .canvas

## Where Do I Start?

cd ..
Creating a GitHub Repository
Rename the directory:
mv skill-sharing-template skill-sharing-app
Reinitialize git and push to GitHub:

### Creating Your Own Git Repo

cd skill-sharing-app
git init
git add --all
git commit -m "initial commit"
git remote add origin git@github.com:<your-username>/skill-sharing-app.git
git push -u origin main

---

## Setup

### `server/`

The backend is powered by Flask and serves a RESTful API.

Key Files
app.py: Entry point for the backend app. Registers routes and resources.

config.py: Sets up the database URI, migrations, and CORS.

models.py: Defines the data models – User, Skill, and SkillOffer.

seed.py: Seeds the database with initial data.

routes/: Contains RESTful resource classes such as UserResource, SkillOfferResource, etc.

## nitial Setup

pipenv install
pipenv shell
python server/app.py
Your server will be running on http://localhost:5555.

### `client/`

The frontend is built with React and styled with basic CSS.

Key Files
App.js: Main component with centralized routing.

components/: Contains all functional UI components like SkillCard, SkillOfferForm, AddSkillForm, etc.

pages/: Includes page views like Home, Login, SkillOffers, and Skills.
To download the dependencies for the frontend client, run:

npm install --prefix client
npm start --prefix client
Runs on http://localhost:3000.

## Generating Your Database

cd server
flask db init
flask db revision -m "Initial migration"
flask db upgrade
This creates your SQLite app.db and sets up migrations using Flask-Migrate.

Type `tree -L 2` within the `server` folder to confirm the new directory
structure:

```console
.
├── app.py
├── config.py
├── instance
│   └── app.db
├── migrations
│   ├── README
│   ├── __pycache__
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions
├── models.py
└── seed.py
```

Backend Models
User
id, username, email

One-to-many relationship with SkillOffer

Skill
id, name

Many-to-many relationship with SkillOffer

SkillOffer
Contains title, description

Acts as join table with user-submittable fields

API Routes
GET /offers
Returns all skill offers.

POST /offers
Creates a new skill offer.

PATCH /offers/<id>
Updates a skill offer's title or description.

---

def patch(self, id):
offer = Offer.query.get(id)
if not offer:
return {"error": "Offer not found"}, 404
data = request.get_json()
if "title" in data:
offer.title = data["title"]
if "description" in data:
offer.description = data["description"]
db.session.commit()
return offer.to_dict(), 200

DELETE /offers/<id>
Deletes a skill offer.

## Frontend Highlights

React hooks (useEffect, useState) and Context used for global state.

Dynamic form for skill offer creation and editing.

## Matching interface with conditional rendering.

## Conclusion

This full-stack project demonstrates the principles of relational modeling, dynamic frontend rendering, RESTful APIs, and clean UI/UX design. It builds upon all the core concepts from previous phases and delivers a polished, extensible application.

Happy coding!

---

## Resources

- Flask Docs -(https://flask.palletsprojects.com/en/stable/)
- React Docs - (https://react.dev/learn)
- Flask-Migrate - (https://flask-migrate.readthedocs.io/en/latest/)
- [Setting up a respository - Atlassian](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Python Circular Imports - StackAbuse](https://stackabuse.com/python-circular-imports/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
