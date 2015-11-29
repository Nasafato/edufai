import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Image(Base):
    __tablename__ = 'image'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    url = Column(String(1000), nullable=False)


class Tag(Base):
    __tablename__ = 'tag'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    image_id = Column(Integer, ForeignKey('image.id'))
    image = relationship(Image)

    
engine = create_engine('sqlite:///edufai_dev.db')

Base.metadata.create_all(engine)

