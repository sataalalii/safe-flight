import requests  # used to make requests to Airlabs
import json  # used to parse a json to an object or vice versa after api call.
from decouple import config  # used to store secret keys in .env file

AIRLABS = config("AIRLABS", default='')
AIRLABS_BASE = config("AIRLABS_BASE", default='')
TA_BASE = config('TA_BASE', default='')


# api_result = requests.get(api_base+method, params)
# api_response = api_result.json()
def getStatus(current_advisory):
    currentWarningLevel = current_advisory['advisory']['score']
    if (currentWarningLevel < 2.5):
        country_status = 'Low Risk'
    elif (currentWarningLevel < 3.5):
        country_status = 'Medium Risk'
    elif (currentWarningLevel < 4.5):
        country_status = 'High Risk'
    else:  # (currentWarningLevel >= 4.5):
        country_status = 'Extreme Warning'
    return country_status


def getCountriesDB():
    """
    :return: returns an array of json/dictionary-like elements.
    """
    params = {
        'api_key': AIRLABS
    }
    api_response = requests.get(AIRLABS_BASE + 'countries', params).json()["response"]  # returns array with airport
    returned_list = []
    countryAdvisoryInfo = {}
    for i in range(len(api_response)):
        country_elem = api_response[i]
        country_code = country_elem.get("code")
        country_name = country_elem.get("name")
        if (country_code in countryAdvisoryInfo):
            country_status = countryAdvisoryInfo[country_code]['status']
        else:
            country_status = "Unknown"
            currentAdvisory = getWarningLevel(country_code)
            if (currentAdvisory):
                country_status = getStatus(currentAdvisory)

        country_dict = {"country_name": country_name, "_id": country_code, "country_status": country_status}
        returned_list += [country_dict]
    return (returned_list)


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
    api_response = requests.get(AIRLABS_BASE + 'airports', params).json()["response"]  # returns array with airport
    returned_list = []
    countryAdvisoryInfo = {}
    for i in range(len(api_response)):
        airport_elem = api_response[i]
        current_country_code = airport_elem.get("country_code")
        if (current_country_code in countryAdvisoryInfo):
            currentStatus = countryAdvisoryInfo[current_country_code]['status']
            currentCountryName = countryAdvisoryInfo[current_country_code]['name']
        else:
            currentStatus = "Unknown"
            currentAdvisory = getWarningLevel(current_country_code)
            if (not currentAdvisory):  # if travel advisory could not find country
                currentWarningLevel = -1
                params['code'] = current_country_code
                currentCountryName = requests.get(AIRLABS_BASE + 'countries', params).json()["response"][0]['name']
                params.pop('code')  # removing country_code used to get name from airlabs
            else:
                currentWarningLevel = currentAdvisory['advisory']['score']
                currentCountryName = currentAdvisory['name']
                if (currentWarningLevel < 2.5):
                    currentStatus = 'Low Risk'
                elif (currentWarningLevel < 3.5):
                    currentStatus = 'Medium Risk'
                elif (currentWarningLevel < 4.5):
                    currentStatus = 'High Risk'
                elif (currentWarningLevel >= 4.5):
                    currentStatus = 'Extreme Warning'
            countryAdvisoryInfo[current_country_code] = {'status': currentStatus, 'name': currentCountryName}

        airport_dict = {"airport": airport_elem.get("name"), "iata_code": airport_elem.get('iata_code'),
                        "country": currentCountryName, "status": currentStatus
                        }
        returned_list += [airport_dict]
    return (returned_list)


def getWarningLevel(country_code):
    if (country_code and len(country_code) > 0):
        url_rest = '?countrycode=' + country_code
        result = requests.get(TA_BASE + url_rest)
        # print(result.status_code)
        if (result.status_code != 200):
            result = {}
        else:
            result = result.json()["data"][country_code]
    else:
        result = {}
    # print(result)
    return result
