from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Base, Tag, Image 

engine = create_engine('sqlite:///edufai_dev.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

Image1 = Image(name='tajmahal', url='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taj_Mahal_in_March_2004.jpg/200px-Taj_Mahal_in_March_2004.jpg')

Image2 = Image(name='forest', url='http://www.vccd.org/new%20bridge%20(640x425).jpg')

session.add(Image1)
session.add(Image2)
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
    


