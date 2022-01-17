import React, { useReducer } from 'react';
import GlobalDataContext from './GlobalDataContext';
import GlobalDataReducer from './GlobalDataReducer';
import clienteAxios from '../../config/axios';
import tiendaNubeAxios from '../../config/tiendaNubeAxios';
import moment from 'moment';
import {
	PTOS_STOCK_VENTAS,
	TRAER_PTOS_VENTA,
	TRAER_TIPOS_ENVIO,
	TRAER_ESTADOS_ORDEN,
	TRAER_METODOS_PAGO,
	TRAER_CATEGORIAS_GASTOS,
	TRAER_SUBCATEGORIAS_GASTOS,
	TRAER_FACTURAS,
	ACTUALIZAR_FECHAS_LIMITE,
	SHOW_LOADING,
	TRAER_PRODUCTOS_TIENDA_ONLINE,
} from '../../types';

const GlobalDataState = (props) => {
	const initialState = {
		productsTiendaOnline: [],
		stockPoints: null,
		salePoints: null,
		shippingTypes: null,
		orderStatuses: null,
		paymentMethods: null,
		expenseCategories: null,
		expenseSubcategories: null,
		invoices: [],
		dates: {
			startDate: moment(new Date()).startOf('month').format('YYYY-MM-DD hh:mm'),
			endDate: moment(new Date()).endOf('month').format('YYYY-MM-DD hh:mm'),
		},
		loadingGlobalData: true,
	};

	const [state, dispatch] = useReducer(GlobalDataReducer, initialState);

	const getStockPoints = async () => {
		const r = await clienteAxios.get(`/api/stock/ptos-stock`);

		dispatch({
			type: PTOS_STOCK_VENTAS,
			payload: r.data,
		});
	};

	const getSalePoints = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/ventas/ptos-venta`);

			dispatch({
				type: TRAER_PTOS_VENTA,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getShippingTypes = async () => {
		try {
			const r = await clienteAxios.get(`/api/tipos-envio`);

			dispatch({
				type: TRAER_TIPOS_ENVIO,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getOrderStatuses = async () => {
		try {
			const r = await clienteAxios.get('/api/estados-orden/');

			dispatch({
				type: TRAER_ESTADOS_ORDEN,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getPaymentMethods = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/metodos-pago`);

			dispatch({
				type: TRAER_METODOS_PAGO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getCategorieExpenses = async () => {
		try {
			const r = await clienteAxios.get(`/api/gastos/categorias`);

			dispatch({
				type: TRAER_CATEGORIAS_GASTOS,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getSubcategorieExpenses = async () => {
		try {
			const r = await clienteAxios.get(`/api/gastos/subcategorias`);

			dispatch({
				type: TRAER_SUBCATEGORIAS_GASTOS,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getInvoicing = async (startDate, endDate) => {
		try {
			const r = await clienteAxios.get(
				`/api/facturas/${JSON.stringify({ startDate, endDate })}`
			);

			dispatch({
				type: TRAER_FACTURAS,
				payload: r.data,
			});

			dispatch({
				type: SHOW_LOADING,
				payload: false,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDates = (dates) => {
		dispatch({
			type: ACTUALIZAR_FECHAS_LIMITE,
			payload: dates,
		});
	};

	const getProductsTiendaOnline = async () => {
		try {
			const r = await clienteAxios.get('/api/tiendanube/productos');

			dispatch({
				type: TRAER_PRODUCTOS_TIENDA_ONLINE,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GlobalDataContext.Provider
			value={{
				productsTiendaOnline: state.productsTiendaOnline,
				stockPoints: state.stockPoints,
				salePoints: state.salePoints,
				shippingTypes: state.shippingTypes,
				orderStatuses: state.orderStatuses,
				paymentMethods: state.paymentMethods,
				expenseCategories: state.expenseCategories,
				expenseSubcategories: state.expenseSubcategories,
				invoices: state.invoices,
				dates: state.dates,
				loadingGlobalData: state.loadingGlobalData,
				getStockPoints,
				getSalePoints,
				getShippingTypes,
				getOrderStatuses,
				getPaymentMethods,
				getCategorieExpenses,
				getSubcategorieExpenses,
				getInvoicing,
				handleDates,
				getProductsTiendaOnline,
			}}
		>
			{props.children}
		</GlobalDataContext.Provider>
	);
};

export default GlobalDataState;
