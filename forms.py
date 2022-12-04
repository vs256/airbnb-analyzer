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
        ('San Jose', 'San Jose'),
        ('Saratoga', 'Saratoga'),
        ('Los Gatos', 'Los Gatos')
    ])

    submit = SubmitField('Predict')