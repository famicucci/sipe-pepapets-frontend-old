import clienteAxios from './axios';

const tokenAuth = (token) => {
	if (token) {
		clienteAxios.defaults.headers.common['user-token'] = token;
	} else {
		delete clienteAxios.defaults.headers.common['user-token'];
	}
};

export default tokenAuth;
