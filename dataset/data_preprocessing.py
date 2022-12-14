import re
import geopy
import pandas as pd

pd.set_option('display.width', 500)
pd.set_option('display.max_columns', 25)


def get_zip_code(x):
    location = geolocator.reverse("{}, {}".format(x['latitude'], x['longitude']))

    if 'postcode' in location.raw['address']:
        return location.raw['address']['postcode']
    else:
        return ""


if __name__ == '__main__':
    dollar_sign = re.compile('$')

    geolocator = geopy.Nominatim(user_agent="check_1")

    df = pd.read_csv("C:/Users/vidas/Git Projects/airbnb-analyzer/dataset/santa_clara_raw.csv")

    # insert city column, take values from host location. Then drop host location
    df['city'] = df['host_location']
    df = df.drop(['host_location'], axis=1)

    # insert column zipcode
    df['zipcode'] = 00000

    # convert price $100.5 to 100.5
    if dollar_sign.search(str(df['price'])) != None:
        df['price'] = df['price'].str.replace('$', '').replace(",", '')

    # replace bathrooms NaN with 1
    df['bathrooms'] = df['bathrooms'].fillna(1)

    # replace bedrooms NaN with 1
    df['bedrooms'] = df['bedrooms'].fillna(1)

    # replace beds NaN with 1
    df['beds'] = df['beds'].fillna(1)

    # convert floats (default) to int
    df['zipcode'] = df['zipcode'].astype(int)
    df['accommodates'] = df['accommodates'].astype(int)
    df['bathrooms'] = df['bathrooms'].astype(int)
    df['bedrooms'] = df['bedrooms'].astype(int)
    df['beds'] = df['beds'].astype(int)

    # fill review NaN with mean
    df['review_scores_rating'].fillna(value=df['review_scores_rating'].mean(), inplace=True)
    df['review_scores_accuracy'].fillna(value=df['review_scores_accuracy'].mean(), inplace=True)
    df['review_scores_cleanliness'].fillna(value=df['review_scores_cleanliness'].mean(), inplace=True)
    df['review_scores_checkin'].fillna(value=df['review_scores_checkin'].mean(), inplace=True)
    df['review_scores_communication'].fillna(value=df['review_scores_communication'].mean(), inplace=True)
    df['review_scores_location'].fillna(value=df['review_scores_location'].mean(), inplace=True)
    df['review_scores_value'].fillna(value=df['review_scores_value'].mean(), inplace=True)

    # Get zip code based on longitude and latitude
    df['zipcode'] = df.head().apply(lambda x: get_zip_code(x), axis=1)


    # select columns
    df = df[['host_neighbourhood', 'host_identity_verified', 'neighbourhood', 'city', 'zipcode', 'property_type',
             'room_type', 'accommodates', 'bathrooms', 'bedrooms', 'beds', 'availability_30',
             'availability_60', 'availability_90', 'availability_365', 'number_of_reviews', 'review_scores_rating',
             'review_scores_accuracy', 'review_scores_cleanliness', 'review_scores_checkin',
             'review_scores_communication', 'review_scores_location', 'review_scores_value', 'price']]

    #remove extra information after comma
    df['host_neighbourhood'] = df['host_neighbourhood'].replace(",[^,]*$", "", regex=True)
    df['neighbourhood'] = df['neighbourhood'].replace(",[^,]*$", "", regex=True)
    df['neighbourhood'] = df['neighbourhood'].replace(",[^,]*$", "", regex=True)
    df['city'] = df['city'].replace(",[^,]*$", "", regex=True)
    df['city'] = df['city'].replace(",[^,]*$", "", regex=True)

    #fill blanks for city with neighbourhood
    df['city'].fillna(value=df['host_neighbourhood'], inplace=True)
    df['city'].fillna(value=df['neighbourhood'], inplace=True)

    #fill blanks for host_neighbourhood & neighbourhood with city
    df['host_neighbourhood'].fillna(value=df['city'], inplace=True)
    df['neighbourhood'].fillna(value=df['city'], inplace=True)

    #add $
    df['price'] = df['price'].replace('"','')
    df['price'] = df['price'].replace(',','')
    df['price'] = "$"+df['price']

    #If there are still blanks left, just fill in with San Jose city for now.
    df['city'].fillna(value="San Jose", inplace=True)
    df['neighbourhood'].fillna(value="San Jose", inplace=True)
    df['host_neighbourhood'].fillna(value="San Jose", inplace=True)

    #Rest of blanks get filled with -1
    df.fillna(value="-1",inplace=True)

    df_price = df['price']

    df.drop('price', axis=1, inplace=True)
    df.to_csv('C:/Users/vidas/Git Projects/airbnb-analyzer/dataset/final_dataset.csv', index=False)

    df_price.to_csv('C:/Users/vidas/Git Projects/airbnb-analyzer/dataset/final_price_dataset.csv', index=False)
