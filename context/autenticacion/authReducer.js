import {
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	OBTENER_USUARIO,
	CERRAR_SESION,
} from '../../types';

const AuthReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_EXITOSO:
			localStorage.setItem('token', action.payload.success);
			return {
				...state,
				autenticado: true,
				mensaje: null,
				cargando: false,
			};
		case OBTENER_USUARIO:
			return {
				...state,
				autenticado: true,
				usuario: action.payload,
				cargando: false,
			};
		case CERRAR_SESION:
		case LOGIN_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: false,
				mensaje: action.payload,
				cargando: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;
