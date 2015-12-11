from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Base, Tag, Image, CurrentImage 
import json
from pprint import pprint

engine = create_engine('postgres://iosppmgkembtkc:3aDE2tskPLKGPawTz2bQpiuapA@ec2-54-83-202-64.compute-1.amazonaws.com:5432/dbsc758t7jdets')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

session.query(Tag).delete()
session.query(CurrentImage).delete()
session.query(Image).delete()
session.commit()



def add_image(image):
    new_image = Image(
        name = image['name'],
        url = image['url'],
    )

    session.add(new_image)
    session.commit()

    for tag_name in image['tags']:
        new_tag = Tag(
            name = tag_name,
            image_id = session.query(Image).filter_by(url=image['url']).one().serialize['id']
        )
        session.add(new_tag)
    session.commit()

with open('images.json') as data_file:
    data = json.load(data_file)['images']
    for image in data:
        add_image(image)

first_image = session.query(Image).first()

current_image = CurrentImage(current_image_id=first_image.serialize['id'])
session.add(current_image)
session.commit()

'''

Image1 = Image(name='tajmahal', url='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taj_Mahal_in_March_2004.jpg/200px-Taj_Mahal_in_March_2004.jpg')

Image2 = Image(name='forest', url='http://www.vccd.org/new%20bridge%20(640x425).jpg')

session.add(Image1)
session.add(Image2)
session.commit()

CurrentImage1 = CurrentImage(current_image_id=1)

session.add(CurrentImage1)
session.commit()

tagNames1 = [
        'bridge',
        'people',
        'monument',
        'architecture'
    ]

tagNames2 = [
        'nature',
        'forest',
        'trees',
        'wildlife'
    ]

new_tags = []
for tag in tagNames1:
    new_tags.append(Tag(name=tag, image_id=1))
for tag in tagNames2:
    new_tags.append(Tag(name=tag, image_id=2))

for tagObject in new_tags:
    session.add(tagObject)

session.commit()
    

'''
