import {
	TRAER_PRECIOS,
	LISTA_PRECIOS,
	ERROR_PRECIOS,
	FILAS_PRECIOS,
} from '../../types';
import { filtro } from '../../functions/filtros.js';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_PRECIOS:
			let vars = { lisPre: state.lista, bus: action.payload.bus };
			let r = filtro(action.payload.arrayProd, vars);
			return {
				...state,
				precios: action.payload.arrayProd,
				filas: r,
				cargando: false,
			};
		case LISTA_PRECIOS:
			return {
				...state,
				lista: action.payload,
			};
		case FILAS_PRECIOS:
			vars = { lisPre: state.lista, bus: action.payload };
			r = filtro(state.precios, vars);
			return {
				...state,
				filas: r,
			};
		case ERROR_PRECIOS:
			return {
				...state,
				mensaje: action.payload,
			};

		default:
			return state;
	}
};

export default PreciosReducer;
