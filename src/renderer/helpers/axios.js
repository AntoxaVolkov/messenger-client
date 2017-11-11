import jwtToken from './jwt-token';
import axios from 'axios'
// токен проверяется только при старте приложения, а должен при каждом запросе.
export default function() {
    return axios.create({
        timeout: 60000,
        headers: {'x-access-token': jwtToken.getToken()}
    });
}