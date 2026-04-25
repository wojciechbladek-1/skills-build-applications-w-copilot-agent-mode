from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import connection
from djongo import models

from octofit_tracker import settings

from django.apps import apps

from django.conf import settings as django_settings

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Połączenie z MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Usuń istniejące dane
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Dane przykładowe
        users = [
            {"name": "Superman", "email": "superman@dc.com", "team": "dc"},
            {"name": "Batman", "email": "batman@dc.com", "team": "dc"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "dc"},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "marvel"},
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "marvel"},
        ]
        db.users.insert_many(users)

        db.users.create_index([("email", 1)], unique=True)

        teams = [
            {"name": "marvel", "members": ["ironman@marvel.com", "cap@marvel.com", "spiderman@marvel.com"]},
            {"name": "dc", "members": ["superman@dc.com", "batman@dc.com", "wonderwoman@dc.com"]},
        ]
        db.teams.insert_many(teams)

        activities = [
            {"user": "superman@dc.com", "activity": "run", "distance": 10},
            {"user": "batman@dc.com", "activity": "cycle", "distance": 20},
            {"user": "ironman@marvel.com", "activity": "swim", "distance": 5},
        ]
        db.activities.insert_many(activities)

        leaderboard = [
            {"user": "superman@dc.com", "points": 100},
            {"user": "ironman@marvel.com", "points": 90},
        ]
        db.leaderboard.insert_many(leaderboard)

        workouts = [
            {"user": "spiderman@marvel.com", "workout": "pushups", "reps": 50},
            {"user": "wonderwoman@dc.com", "workout": "squats", "reps": 60},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))
