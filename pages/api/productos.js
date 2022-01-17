// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const accessToken = '5c4d34b857d27539a980f5c659b28a45ce0459d1';
const apiUrl = 'https://api.tiendanube.com';

const tiendaNubeAxios = axios.create({
	baseURL: apiUrl,
	headers: {
		Authentication: `bearer ${accessToken}`,
		'User-Agent': 'API para Sip (famicucci@email.com)',
	},
});

export default async (req, res) => {
	try {
		const r = await tiendaNubeAxios.get('/v1/1894966/products');
		res.status(200).json(r.data);
	} catch (error) {
		res.status(400).json(error);
	}
};
