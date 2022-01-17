import React, { useReducer } from 'react';
import BarraHerramientasContext from './barraHerramientasContext';
import BarraHerramientasReducer from './barraHerramientasReducer';
import clienteAxios from '../../config/axios';

import {
	HERRAMIENTAS_PRECIOS,
	HERRAMIENTAS_STOCK_PRODUCTO,
	HERRAMIENTAS_STOCK_PTO_STOCK,
	HERRAMIENTAS_STOCK_MOVIMIENTOS,
	HERRAMIENTAS_NUEVA_VENTA,
	HERRAMIENTAS_EDITAR_VENTAS,
	HERRAMIENTAS_CLIENTES,
	ETIQUETA_MODIFICAR_ORDEN,
	BUSQUEDA_ACTUAL,
	BUSQUEDA_ACTUAL_CLIENTE,
	PTOS_STOCK,
	LISTAS_PRECIO,
	ERROR_BARRA_HERRAMIENTAS,
	HERRAMIENTAS_PRODUCTOS_A_MOVER,
	HERRAMIENTAS_GASTOS,
	HERRAMIENTAS_REPORTES,
	HERRAMIENTAS_EDITAR_VENTAS_FINALIZADAS,
} from '../../types';

const BarraHerramientasState = (props) => {
	const initialState = {
		buscador: false,
		selectListaPrecio: false,
		selectPtoStock: false,
		listasPrecio: null,
		ptosStock: null,
		botonModoCargaVenta: false,
		botonNuevoCliente: false,
		botonNuevoGasto: true,
		selectBetweenMonths: false,
		etiquetaModificarOrden: false,
		busqueda: '',
		busquedaCliente: '',
		mensaje: null,
	};

	const [state, dispatch] = useReducer(BarraHerramientasReducer, initialState);

	// las funciones
	const handleHerramientasPrecios = () => {
		dispatch({
			type: HERRAMIENTAS_PRECIOS,
		});
	};

	const handleHerrStockTot = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_PRODUCTO,
		});
	};

	const handleHerramientasStockPtoStock = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_PTO_STOCK,
		});
	};

	const handleHerramientasMovimientosStock = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_MOVIMIENTOS,
		});
	};

	const handleHerramientasEditarVentas = () => {
		dispatch({
			type: HERRAMIENTAS_EDITAR_VENTAS,
		});
	};

	const handleHerramientasEditarVentasFinalizadas = () => {
		dispatch({
			type: HERRAMIENTAS_EDITAR_VENTAS_FINALIZADAS,
		});
	};

	const handleHerramientasClientes = () => {
		dispatch({
			type: HERRAMIENTAS_CLIENTES,
		});
	};

	const handleHerrNuevaVenta = () => {
		dispatch({
			type: HERRAMIENTAS_NUEVA_VENTA,
		});
	};

	const handleBusqueda = (busqueda) => {
		dispatch({
			type: BUSQUEDA_ACTUAL,
			payload: busqueda,
		});
	};

	const handleBusquedaCliente = (bus) => {
		dispatch({
			type: BUSQUEDA_ACTUAL_CLIENTE,
			payload: bus,
		});
	};

	const handleEtiquetaModificarOrden = (boolean) => {
		dispatch({
			type: ETIQUETA_MODIFICAR_ORDEN,
			payload: boolean,
		});
	};

	const traerPtosStock = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/stock/ptos-stock`);

			dispatch({
				type: PTOS_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_BARRA_HERRAMIENTAS,
				payload: error,
			});
		}
	};

	const traerListasPrecio = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/precios/listas-precio`);

			dispatch({
				type: LISTAS_PRECIO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleHerrProductosAMover = (boolean) => {
		dispatch({
			type: HERRAMIENTAS_PRODUCTOS_A_MOVER,
			payload: boolean,
		});
	};

	const handleToolsExpenses = () => {
		dispatch({
			type: HERRAMIENTAS_GASTOS,
		});
	};

	const handleToolsReports = () => {
		dispatch({
			type: HERRAMIENTAS_REPORTES,
		});
	};

	return (
		<BarraHerramientasContext.Provider
			value={{
				buscador: state.buscador,
				selectListaPrecio: state.selectListaPrecio,
				selectPtoStock: state.selectPtoStock,
				busqueda: state.busqueda,
				ptosStock: state.ptosStock,
				listasPrecio: state.listasPrecio,
				botonModoCargaVenta: state.botonModoCargaVenta,
				botonNuevoCliente: state.botonNuevoCliente,
				botonNuevoGasto: state.botonNuevoGasto,
				selectBetweenMonths: state.selectBetweenMonths,
				busquedaCliente: state.busquedaCliente,
				etiquetaModificarOrden: state.etiquetaModificarOrden,
				handleHerramientasPrecios,
				handleHerrStockTot,
				handleHerramientasStockPtoStock,
				handleHerramientasMovimientosStock,
				handleHerramientasEditarVentas,
				handleHerrNuevaVenta,
				handleHerramientasClientes,
				handleEtiquetaModificarOrden,
				handleBusqueda,
				handleBusquedaCliente,
				traerPtosStock,
				traerListasPrecio,
				handleHerrProductosAMover,
				handleToolsExpenses,
				handleToolsReports,
				handleHerramientasEditarVentasFinalizadas,
			}}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasState;
