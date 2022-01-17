import axios from 'axios';

const tiendaNubeAxios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_TIENDA_NUBE,
});

export default tiendaNubeAxios;
