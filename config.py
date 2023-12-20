from dotenv import load_dotenv

# Load variables from .env into the environment
load_dotenv()
import os

class Config:
    SECRET_KEY = 'This si mysecretkey8717251'
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    QLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'This si mysecretkey87172517t763g76egy@665'
