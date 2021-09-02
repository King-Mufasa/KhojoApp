import axios from 'axios'

let APIkit = axios.create({
    baseURL: 'http://192.168.114.29:8080/api/',
    timeout: 10000
});


// export const setClinetToken = token => {
    
//     // APIkit.interceptors.request.use(function(config){
//     //     config.headers.Authorization = 'Bearer ${token}';
//     //     config.headers.Accept = "application/json";
//     //     return config
//     // })
// }

export default APIkit