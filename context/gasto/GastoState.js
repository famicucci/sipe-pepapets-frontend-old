import React, { useReducer } from 'react';
import GastoContext from './GastoContext';
import GastoReducer from './GastoReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_GASTOS,
	SHOW_LOADING,
	MODIFICAR_ESTADO_PAGO_FACTURA,
	ACTIVAR_GASTO,
	MOSTRAR_MODAL_EDITAR_GASTO,
	MOSTRAR_MODAL_CREAR_GASTO,
	AGREGAR_GASTO,
	MODIFICAR_GASTO,
	ELIMINAR_GASTO,
	MOSTRAR_ALERTA_GASTOS,
	OCULTAR_ALERTA_GASTOS,
} from '../../types';

const GastoState = (props) => {
	const initialState = {
		expenses: [],
		activatedExpense: null,
		openModalEditExpense: false,
		openModalCreateExpense: false,
		loading: true,
		mensajeGastos: null,
	};

	const [state, dispatch] = useReducer(GastoReducer, initialState);

	// las funciones
	const getExpenses = async (startDate, endDate) => {
		try {
			const r = await clienteAxios.get(
				`/api/gastos/${JSON.stringify({ startDate, endDate })}`
			);

			dispatch({
				type: TRAER_GASTOS,
				payload: r.data,
			});

			dispatch({
				type: SHOW_LOADING,
				payload: false,
			});
		} catch (error) {
			mostrarAlertaGastos('Hubo un error', 'error');
		}
	};

	const handleStatusPayment = async (expenseId, statusPayment) => {
		// call bd
		try {
			await clienteAxios.put(`/api/gastos/${expenseId}`, {
				estado: statusPayment,
			});

			dispatch({
				type: MODIFICAR_ESTADO_PAGO_FACTURA,
				payload: { expenseId, statusPayment },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpenModalEditExpense = (expenseId) => {
		dispatch({
			type: ACTIVAR_GASTO,
			payload: expenseId,
		});

		dispatch({
			type: MOSTRAR_MODAL_EDITAR_GASTO,
			payload: expenseId ? true : false,
		});
	};

	const handleOpenModalCreateExpense = (boolean) => {
		dispatch({
			type: MOSTRAR_MODAL_CREAR_GASTO,
			payload: boolean,
		});
	};

	const createExpense = async (expense) => {
		try {
			const r = await clienteAxios.post('/api/gastos/', expense);

			dispatch({
				type: AGREGAR_GASTO,
				payload: {
					...r.data,
					Usuario: { id: r.data.UsuarioId },
				},
			});

			mostrarAlertaGastos('Creaste el gasto', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const editExpense = async (expense) => {
		const expenseState = state.expenses.find(
			(x) => x.id === state.activatedExpense
		);

		try {
			await clienteAxios.put(`/api/gastos/${state.activatedExpense}`, expense);

			dispatch({
				type: MODIFICAR_GASTO,
				payload: {
					...expense,
					Usuario: expenseState.Usuario,
					id: state.activatedExpense,
				},
			});

			dispatch({
				type: ACTIVAR_GASTO,
				payload: null,
			});

			mostrarAlertaGastos('Modificaste el gasto', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const removeExpense = async () => {
		try {
			await clienteAxios.delete(`/api/gastos/${state.activatedExpense}`);

			dispatch({
				type: ELIMINAR_GASTO,
				payload: state.activatedExpense,
			});

			dispatch({
				type: ACTIVAR_GASTO,
				payload: null,
			});

			mostrarAlertaGastos('Eliminaste el gasto', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const mostrarAlertaGastos = (msg, severity) => {
		dispatch({
			type: MOSTRAR_ALERTA_GASTOS,
			payload: { msg, severity },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_GASTOS,
			});
		}, 4000);
	};

	return (
		<GastoContext.Provider
			value={{
				expenses: state.expenses,
				activatedExpense: state.activatedExpense,
				openModalEditExpense: state.openModalEditExpense,
				openModalCreateExpense: state.openModalCreateExpense,
				loading: state.loading,
				mensajeGastos: state.mensajeGastos,
				getExpenses,
				handleStatusPayment,
				handleOpenModalEditExpense,
				handleOpenModalCreateExpense,
				createExpense,
				editExpense,
				removeExpense,
				mostrarAlertaGastos,
			}}
		>
			{props.children}
		</GastoContext.Provider>
	);
};

export default GastoState;
