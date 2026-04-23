from django.core.management.base import BaseCommand
from django.utils import timezone

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with consistent OctoFit test data'

    def handle(self, *args, **options):
        # Clear only valid-PK records. Corrupted legacy rows without PK are ignored.
        Leaderboard.objects.filter(pk__isnull=False).delete()
        Activity.objects.filter(pk__isnull=False).delete()
        Workout.objects.filter(pk__isnull=False).delete()
        Team.objects.filter(pk__isnull=False).delete()
        User.objects.filter(pk__isnull=False).delete()

        marvel = Team.objects.create(name='Marvel Squad')
        dc = Team.objects.create(name='DC Squad')

        users = {
            'ironman': User.objects.create(
                username='ironman',
                email='ironman@marvel-squad.com',
                first_name='Tony',
                last_name='Stark',
            ),
            'captainamerica': User.objects.create(
                username='captainamerica',
                email='cap@marvel-squad.com',
                first_name='Steve',
                last_name='Rogers',
            ),
            'spiderman': User.objects.create(
                username='spiderman',
                email='spidey@marvel-squad.com',
                first_name='Peter',
                last_name='Parker',
            ),
            'batman': User.objects.create(
                username='batman',
                email='batman@dc-squad.com',
                first_name='Bruce',
                last_name='Wayne',
            ),
            'superman': User.objects.create(
                username='superman',
                email='superman@dc-squad.com',
                first_name='Clark',
                last_name='Kent',
            ),
            'wonderwoman': User.objects.create(
                username='wonderwoman',
                email='wonderwoman@dc-squad.com',
                first_name='Diana',
                last_name='Prince',
            ),
        }

        marvel.members.add(
            users['ironman'],
            users['captainamerica'],
            users['spiderman'],
        )
        dc.members.add(
            users['batman'],
            users['superman'],
            users['wonderwoman'],
        )

        Activity.objects.create(
            user=users['ironman'],
            activity_type='Running',
            duration=30,
            calories_burned=320,
            date=timezone.now().date(),
        )
        Activity.objects.create(
            user=users['batman'],
            activity_type='Cycling',
            duration=45,
            calories_burned=460,
            date=timezone.now().date(),
        )
        Activity.objects.create(
            user=users['spiderman'],
            activity_type='Swimming',
            duration=25,
            calories_burned=280,
            date=timezone.now().date(),
        )
        Activity.objects.create(
            user=users['superman'],
            activity_type='Running',
            duration=60,
            calories_burned=700,
            date=timezone.now().date(),
        )

        pushups = Workout.objects.create(
            name='Pushups',
            description='Upper body strength routine with progressive sets.',
        )
        pullups = Workout.objects.create(
            name='Pullups',
            description='Back and arm focused routine with assisted options.',
        )
        squats = Workout.objects.create(
            name='Squats',
            description='Leg day compound movement with bodyweight or load.',
        )

        pushups.suggested_for.add(users['ironman'], users['captainamerica'])
        pullups.suggested_for.add(users['batman'], users['wonderwoman'])
        squats.suggested_for.add(users['spiderman'], users['superman'])

        Leaderboard.objects.create(team=marvel, total_points=100)
        Leaderboard.objects.create(team=dc, total_points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with valid test data.'))
