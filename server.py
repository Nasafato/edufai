from flask import Flask, render_template
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Tag, Image 

engine = create_engine('sqlite:///edufai_dev.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = Flask(__name__, static_url_path='', static_folder='dist', template_folder='dist')
# not sure what this do: app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

@app.route('/')
def index():
    return render_template('index.html');

if __name__ == "__main__":
    app.debug = True
    app.run()
