import requests  # used to make requests to Airlabs
import json  # used to parse a json to an object or vice versa after api call.
from decouple import config  # used to store secret keys in .env file

AIRLABS = config("AIRLABS", default='')
AIRLABS_BASE = config("AIRLABS_BASE", default='')
TA_BASE = config('TA_BASE', default='')


# api_result = requests.get(api_base+method, params)
# api_response = api_result.json()


def getAirportsDB():
    """
    This function gets all airports from Airlabs and adds the country names to them.
    sample output if my paramaters were {'api_key': AIRLABS, 'iata_code': 'BOS'} would be
    [{'name': 'Logan International Airport', 'iata_code': 'BOS', 'country': 'United States'}]
    :return: returns an array of json/dictionary-like elements.
    """
    params = {
        'api_key': AIRLABS
    }
    airports_api_response = requests.get(AIRLABS_BASE + 'airports', params).json()["response"]  # returns array with airport
    returned_list = []
    # country_params = params
    # country_names = {}
    for i in range(len(airports_api_response)):
        airport_elem = airports_api_response[i]
        # country_code = airport_elem['country_code']
        # if (country_code not in country_names):
        #     country_params['code'] = country_code
        #     country_elem = requests.get(api_base + 'countries', country_params).json()["response"][0]
        #     country_names[country_code] = country_elem['name']
        # else:
        #     country_elem = {'name': country_names[country_code]}
        airport_dict = {"name": airport_elem.get("name"), "iata_code": airport_elem.get('iata_code'),
                        "country_code": airport_elem.get("country_code")
                        # ,'country': airport_elem['name']
                        }
        returned_list += [airport_dict]
    return (returned_list)


def getWarningLevel(country_code):
    if (country_code and len(country_code) > 0):
        url_rest = '?countrycode=' + country_code
        result = requests.get(TA_BASE + url_rest).json()["data"]
    else:
        result = {}
    print(result)
    return result
