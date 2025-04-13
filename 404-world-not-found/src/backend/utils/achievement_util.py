# src/backend/utils/achievement_utils.py
from schemas.user import User
from schemas.achievement import Achievement

def unlock_achievement_for_user(user, achievement_name):
    achievement = Achievement.objects(name=achievement_name).first()
    if not achievement:
        raise ValueError("Achievement not found.")

    if achievement in user.achievements:
        return  # already unlocked

    user.achievements.append(achievement)
    user.save()
