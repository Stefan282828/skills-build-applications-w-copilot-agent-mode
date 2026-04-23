from djongo import models

# User model
class User(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_joined = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.username

# Team model
class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100, unique=True)
    members = models.ManyToManyField(User, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

# Activity model
class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    calories_burned = models.PositiveIntegerField()
    date = models.DateField()
    def __str__(self):
        return f"{self.user.username} - {self.activity_type} on {self.date}"

# Workout model
class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.ManyToManyField(User, related_name='suggested_workouts', blank=True)
    def __str__(self):
        return self.name

# Leaderboard model
class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    team = models.OneToOneField(Team, on_delete=models.CASCADE)
    total_points = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"Leaderboard for {self.team.name}"