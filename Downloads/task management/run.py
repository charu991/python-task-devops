from dotenv import load_dotenv

# Load variables from .env into the environment
load_dotenv()
import os

from app import app

if __name__ == '__main__':
    app.run( port=os.getenv("PORT") ,debug=os.getenv("DEBUG") )
