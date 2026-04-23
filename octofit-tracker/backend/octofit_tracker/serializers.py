from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard

class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        if obj.pk is not None:
            return str(obj.pk)
        # Djongo may return null pk for legacy records; use a stable fallback.
        return f"user-{obj.username}"

    class Meta:
        model = User
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    def get_id(self, obj):
        if obj.pk is not None:
            return str(obj.pk)
        return f"team-{obj.name}"

    def get_members(self, obj):
        try:
            members = obj.members.all()
        except Exception:
            return []
        return [str(member.pk) if member.pk is not None else f"user-{member.username}" for member in members]

    class Meta:
        model = Team
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    def get_id(self, obj):
        if obj.pk is not None:
            return str(obj.pk)
        user_part = self.get_user(obj) or 'unknown'
        date_part = str(getattr(obj, 'date', 'unknown'))
        type_part = getattr(obj, 'activity_type', 'activity')
        return f"activity-{user_part}-{type_part}-{date_part}"

    def get_user(self, obj):
        try:
            return obj.user.username if obj.user else None
        except Exception:
            return None

    def get_user_id(self, obj):
        try:
            if obj.user and obj.user.pk is not None:
                return str(obj.user.pk)
            if obj.user:
                return f"user-{obj.user.username}"
        except Exception:
            return None
        return None

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'activity_type', 'duration', 'calories_burned', 'date']

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    suggested_for = serializers.SerializerMethodField()

    def get_id(self, obj):
        if obj.pk is not None:
            return str(obj.pk)
        return f"workout-{obj.name}"

    def get_suggested_for(self, obj):
        try:
            users = obj.suggested_for.all()
        except Exception:
            return []
        return [str(user.pk) if user.pk is not None else f"user-{user.username}" for user in users]

    class Meta:
        model = Workout
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    team_id = serializers.SerializerMethodField()

    def get_id(self, obj):
        if obj.pk is not None:
            return str(obj.pk)
        team_part = self.get_team(obj) or 'unknown-team'
        return f"leaderboard-{team_part}"

    def get_team(self, obj):
        try:
            return obj.team.name if obj.team else None
        except Exception:
            return None

    def get_team_id(self, obj):
        try:
            if obj.team and obj.team.pk is not None:
                return str(obj.team.pk)
            if obj.team:
                return f"team-{obj.team.name}"
        except Exception:
            return None
        return None

    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'team_id', 'total_points', 'last_updated']
