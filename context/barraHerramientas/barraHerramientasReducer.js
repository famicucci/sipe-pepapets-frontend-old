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

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case HERRAMIENTAS_PRECIOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: true,
				selectPtoStock: false,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				etiquetaModificarOrden: false,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
			};
		case HERRAMIENTAS_STOCK_PRODUCTO:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				etiquetaModificarOrden: false,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
			};
		case HERRAMIENTAS_STOCK_PTO_STOCK:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: true,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				etiquetaModificarOrden: false,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
			};
		case HERRAMIENTAS_STOCK_MOVIMIENTOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				selectBetweenMonths: true,
				etiquetaModificarOrden: false,
				botonNuevoGasto: false,
			};
		case HERRAMIENTAS_NUEVA_VENTA:
			return {
				...state,
				botonModoCargaVenta: true,
				buscador: false,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonNuevoCliente: false,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
			};
		case HERRAMIENTAS_EDITAR_VENTAS:
			return {
				...state,
				botonModoCargaVenta: false,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonNuevoCliente: false,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
				etiquetaModificarOrden: false,
			};
		case HERRAMIENTAS_EDITAR_VENTAS_FINALIZADAS:
			return {
				...state,
				botonModoCargaVenta: false,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonNuevoCliente: false,
				botonNuevoGasto: false,
				selectBetweenMonths: true,
				etiquetaModificarOrden: false,
			};
		case HERRAMIENTAS_PRODUCTOS_A_MOVER:
			return {
				...state,
				buscador: action.payload,
				selectListaPrecio: false,
				selectPtoStock: false,
				listasPrecio: null,
				ptosStock: null,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
				etiquetaModificarOrden: false,
				busqueda: '',
				busquedaCliente: '',
				mensaje: null,
			};
		case HERRAMIENTAS_CLIENTES:
			return {
				...state,
				botonModoCargaVenta: false,
				botonNuevoCliente: true,
				botonNuevoGasto: false,
				selectBetweenMonths: false,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				etiquetaModificarOrden: false,
			};
		case HERRAMIENTAS_GASTOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				listasPrecio: null,
				ptosStock: null,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				botonNuevoGasto: true,
				selectBetweenMonths: true,
				etiquetaModificarOrden: false,
				busqueda: '',
				busquedaCliente: '',
				mensaje: null,
			};

		case HERRAMIENTAS_REPORTES:
			return {
				...state,
				buscador: false,
				selectListaPrecio: false,
				selectPtoStock: false,
				listasPrecio: null,
				ptosStock: null,
				botonModoCargaVenta: false,
				botonNuevoCliente: false,
				botonNuevoGasto: false,
				selectBetweenMonths: true,
				etiquetaModificarOrden: false,
				busqueda: '',
				busquedaCliente: '',
				mensaje: null,
			};
		case ETIQUETA_MODIFICAR_ORDEN:
			return {
				...state,
				etiquetaModificarOrden: action.payload,
			};

		case BUSQUEDA_ACTUAL:
			return {
				...state,
				busqueda: action.payload,
			};
		case BUSQUEDA_ACTUAL_CLIENTE:
			return {
				...state,
				busquedaCliente: action.payload,
			};
		case PTOS_STOCK:
			return {
				...state,
				ptosStock: action.payload,
			};
		case LISTAS_PRECIO:
			return {
				...state,
				listasPrecio: action.payload,
			};
		case ERROR_BARRA_HERRAMIENTAS:
			return {
				...state,
				mensaje: action.payload,
			};
		default:
			return state;
	}
};

export default PreciosReducer;
