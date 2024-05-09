import axios from 'axios';
const BASE_URL : string = 'https://localhost:7154/api/';


const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json'},
	withCredentials: true,

});

// axiosInstance.interceptors.request.use(AxiosRequest => {
// 	return AxiosRequest;
// })
//
// axiosInstance.interceptors.response.use(
// 	(AxiosResponse) => {
// 					return AxiosResponse.data
// 	},
// 	(Error) => {
// 		console.log(Error)
// 		return Promise.reject(Error)
// 	}
// )

export default axiosInstance;