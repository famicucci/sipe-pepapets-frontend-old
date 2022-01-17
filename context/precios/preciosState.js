import React, { useReducer } from 'react';
import PreciosContext from './preciosContext';
import PreciosReducer from './preciosReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_PRECIOS,
	LISTA_PRECIOS,
	ERROR_PRECIOS,
	FILAS_PRECIOS,
} from '../../types';

const PreciosState = (props) => {
	const initialState = {
		precios: [],
		filas: [],
		lista: 1,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(PreciosReducer, initialState);

	// las funciones
	const traerPrecios = async (bus) => {
		try {
			const r = await clienteAxios.get('/api/precios');

			dispatch({
				type: TRAER_PRECIOS,
				payload: { arrayProd: r.data, bus: bus },
			});
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
	};

	const traerPrecios2 = async () => {
		try {
			const r = await clienteAxios.get('/api/precios');

			dispatch({
				type: TRAER_PRECIOS,
				payload: { arrayProd: r.data, bus: '' },
			});
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
	};

	const handleFilas = (bus) => {
		dispatch({
			type: FILAS_PRECIOS,
			payload: bus,
		});
	};

	const handleLista = (lista) => {
		dispatch({
			type: LISTA_PRECIOS,
			payload: lista,
		});
	};

	return (
		<PreciosContext.Provider
			value={{
				precios: state.precios,
				lista: state.lista,
				filas: state.filas,
				cargando: state.cargando,
				traerPrecios,
				traerPrecios2,
				handleLista,
				handleFilas,
			}}
		>
			{props.children}
		</PreciosContext.Provider>
	);
};

export default PreciosState;
