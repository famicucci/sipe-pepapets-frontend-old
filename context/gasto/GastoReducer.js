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

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_GASTOS:
			return {
				...state,
				expenses: action.payload,
			};
		case SHOW_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case MODIFICAR_ESTADO_PAGO_FACTURA:
			return {
				...state,
				expenses: state.expenses.map((x) =>
					x.id === action.payload.expenseId
						? { ...x, estado: action.payload.statusPayment }
						: x
				),
			};
		case MODIFICAR_GASTO:
			return {
				...state,
				expenses: state.expenses.map((x) =>
					x.id === action.payload.id ? action.payload : x
				),
			};
		case ACTIVAR_GASTO:
			return {
				...state,
				activatedExpense: action.payload,
			};
		case MOSTRAR_MODAL_EDITAR_GASTO:
			return {
				...state,
				openModalEditExpense: action.payload,
			};
		case MOSTRAR_MODAL_CREAR_GASTO:
			return {
				...state,
				openModalCreateExpense: action.payload,
			};
		case AGREGAR_GASTO:
			return {
				...state,
				expenses: [action.payload, ...state.expenses],
			};
		case ELIMINAR_GASTO:
			return {
				...state,
				expenses: state.expenses.filter((x) => x.id !== action.payload),
			};

		case MOSTRAR_ALERTA_GASTOS:
			return {
				...state,
				mensajeGastos: action.payload,
			};
		case OCULTAR_ALERTA_GASTOS:
			return {
				...state,
				mensajeGastos: null,
			};
		default:
			return state;
	}
};

export default PreciosReducer;
