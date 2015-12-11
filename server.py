from flask import Flask, render_template, Response, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Tag, Image, CurrentImage

engine = create_engine('postgres://iosppmgkembtkc:3aDE2tskPLKGPawTz2bQpiuapA@ec2-54-83-202-64.compute-1.amazonaws.com:5432/dbsc758t7jdets')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = Flask(__name__, static_url_path='', static_folder='dist', template_folder='dist')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

@app.route('/')
def index():
    return render_template('index.html');

@app.route('/api/nextimage', methods=['GET'])
def nextimage_handler():
    if request.method == 'GET':
        last_image = session.query(Image).order_by(Image.id.desc()).first()
        last_id = last_image.serialize['id']

        current_image = session.query(CurrentImage).one()
        current_image_id = current_image.serialize['current_image_id']

        print("Current image id is {}".format(current_image_id))
        if current_image_id == last_id:
            first_image = session.query(Image).order_by(Image.id).first()
            first_id = first_image.serialize['id']
            current_image_id = first_id
        else:
            current_image_id += 1
            print("Increment image id to {}".format(current_image_id))

        current_image.current_image_id = current_image_id

        session.commit()

        image = session.query(Image).filter_by(id=current_image_id).one()
        tags = session.query(Tag).filter_by(image_id=current_image_id).all()
        image_url = image.serialize['url']
        image_name = image.serialize['name']
        tags = [i.serialize['name'] for i in tags]

        return jsonify(imageName=image_name,
                      imageURL=image_url,
                      tagNames=tags)

@app.route('/api/comments', methods=['GET', 'POST'])
def comments_handler():

    with open('comments.json', 'r') as file:
        comments = json.loads(file.read())

    if request.method == 'POST':
        newComment = request.form.to_dict()
        newComment['id'] = int(time.time() * 1000)
        comments.append(newComment)

        with open('comments.json', 'w') as file:
            file.write(json.dumps(comments, indent=4, separators=(',', ': ')))

    return Response(json.dumps(comments), mimetype='application/json', headers={'Cache-Control': 'no-cache'})

if __name__ == "__main__":
    app.debug = True
    app.run()
