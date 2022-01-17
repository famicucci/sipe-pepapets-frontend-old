import React, { useReducer } from 'react';
import AlertaContext from './alertaContext';
import AlertaReducer from './alertaReducer';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const PreciosState = (props) => {
	const initialState = {
		alerta: null,
	};

	const [state, dispatch] = useReducer(AlertaReducer, initialState);

	// las funciones
	const mostrarAlerta = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: { msg, categoria },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 4000);
	};

	const ocultarAlerta = () => {
		dispatch({
			type: OCULTAR_ALERTA,
		});
	};

	return (
		<AlertaContext.Provider
			value={{ alerta: state.alerta, mostrarAlerta, ocultarAlerta }}
		>
			{props.children}
		</AlertaContext.Provider>
	);
};

export default PreciosState;
