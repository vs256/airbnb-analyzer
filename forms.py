from flask_wtf import Form
from wtforms import StringField, PasswordField, SubmitField, SelectField, FloatField
from wtforms.validators import DataRequired


class predictForm(Form):
    accommodates = FloatField('Accomodates')
    bathrooms = FloatField('bathrooms')
    bedrooms = FloatField('bedrooms')
    beds = FloatField('beds')
    cancellation_policy = SelectField('cancellation_policy', choices=[('Choose Cancellation Policy', 'Choose Cancellation Policy'), ('flexible', 'flexible'), ('moderate', 'moderate'), ('strict', 'strict')])
    property_type = SelectField('property_type', choices=[('Choose Property Type', 'Choose Property Type'),('Apartment', 'Apartment'),('House', 'House'),('Boat', 'Boat'), ('Loft', 'Loft')])
    room_type = SelectField('room_type', choices=[('Choose Room Type','Choose Room Type'), ('Private room', 'Private room'), ('Entire home/apt', 'Entire home/apt')])
    guests = FloatField('guests')
    neighbourhood = SelectField('Neighbourhood',
        choices=[ ('Choose a Neighborhood', 'Choose a Neighborhood'),
        ('City Island', 'City Island'),
        ('Williamsburg', 'Williamsburg'),
        ('Allerton', 'Allerton'),
        ('Baychester', 'Brooklyn'),
        ('Bronxdale', 'Bronxdale'),
        ('Ditmars / Steinway', 'Ditmars / Steinway'),
        ('Astoria', 'Astoria'),
        ('Greenwood Heights', 'Greenwood Heights'),
        ('Queens', 'Queens'),
        ('Crown Heights', 'Crown Heights'),
        ('Silver Lake', 'Silver Lake'),
        ('Gerritsen Beach', 'Gerritsen Beach'),
        ('Soundview', 'Soundview'),
        ('Ozone Park', 'Ozone Park'),
        ('Woodhaven', 'Woodhaven'),
        ('East New York', 'East New York'),
        ('South Ozone Park', 'South Ozone Park'),
        ('Richmond Hill', 'Richmond Hill'),
        ('Tremont', 'Tremont'),
        ('Bedford Park', 'Bedford Park'),
        ('Fordham', 'Fordham'),
        ('Whitestone', 'Whitestone'),
        ('Eltingville', 'Eltingville'),
        ('South Beach', 'South Beach'),
        ('Grasmere', 'Grasmere'),
        ('The Rockaways', 'The Rockaways'),
        ('Bushwick', 'Bushwick'),
        ('Midtown East', 'Midtown East'),
        ('Copacabana', 'Copacabana'),
        ('Old West Austin', 'Old West Austin'),
        ('Columbia Street Waterfront', 'Columbia Street Waterfront'),
        ('Comercio', 'Comercio'),
        ('Long Island City', 'Long Island City'),
        ('East Harlem', 'East Harlem'),
        ('Bath Beach', 'Bath Beach'),
        ('Bayside', 'Bayside'),
        ('Woodside', 'Woodside'),
        ('Upper East Side', 'Upper East Side'),
        ('Battery Park City', 'Battery Park City'),
        ('Financial District', 'Financial District'),
        ('Rittenhouse Square', 'Rittenhouse Square'),
        ('Tribeca', 'Tribeca'),
        ('Bay Ridge', 'Bay Ridge'),
        ('Upper West Side', 'Upper West Side'),
        ('Sunset Park', 'Sunset Park'),
        ('Great Kills', 'Great Kills'),
        ('Studio City', 'Studio City'),
        ('Bedford-Stuyvesant', 'Bedford-Stuyvesant'),
        ('Washington Heights', 'Washington Heights'),
        ('Clinton Hill', 'Clinton Hill'),
        ('Stuyvesant Heights', 'Stuyvesant Heights'),
        ('Lefferts Garden', 'Lefferts Garden'),
        ('Harlem', 'Harlem'),
        ('El Born', 'El Born'),
        ('West Village', 'West Village'),
        ('East Flatbush', 'East Flatbush'),
        ('Boerum Hill', 'Boerum Hill')
    ])

    submit = SubmitField('Predict')