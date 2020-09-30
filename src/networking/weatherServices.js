import { Alert } from 'react-native';
import Axios from 'axios';

const API_KEY = 'ea4d2c1e61fae11bc61aa4a792d72faf';
const LOCATION_KEY = 'cc0ee8aeb6msh51142cb4c2c4171p1f57c2jsn3d6b15c4e5ab';

export const getWeatherAPI = (lat, lon) => {
    return Axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=vi`)
        .then((response) => {
            // handle success
            return response.data;
        })
        .catch((error) => {
            // handle error
            Alert.alert(error);
        })
}

export const getLocation = (lat, lon) => {
    return Axios.get(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?language=vi&location=${lat}%252C${lon}&rapidapi-host=trueway-geocoding.p.rapidapi.com&rapidapi-key=${LOCATION_KEY}`)
        .then((response) => {
            // handle success
            return response.data;
        })
        .catch((error) => {
            // handle error
            Alert.alert(error);
        })
}


