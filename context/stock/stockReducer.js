import {
	TRAER_STOCK_PTO_STOCK,
	TRAER_PRODUCTOS_TIENDA_ONLINE,
	TRAER_MOVIMIENTOS_STOCK,
	FILAS_MOVIMIENTOS_STOCK,
	PTO_STOCK,
	PRODUCTO_ACTIVO,
	ACTIVAR_FILA,
	CONFIRMAR_CAMBIO_STOCK,
	CONFIRMAR_CAMBIO_STOCK_PTO_STOCK,
	NUEVA_CANTIDAD_STOCK,
	MODAL_OPEN,
	MODAL_CLOSE,
	ERROR_STOCK,
	ACTUALIZAR_STOCK,
	MOSTRAR_ALERTA_STOCK,
	OCULTAR_ALERTA_STOCK,
} from '../../types';
import { filtro } from '../../functions/filtros.js';

const StockReducer = (state, action) => {
	switch (action.type) {
		case TRAER_STOCK_PTO_STOCK:
			return {
				...state,
				stocks: action.payload,
				cargando: false,
			};
		case TRAER_PRODUCTOS_TIENDA_ONLINE:
			return {
				...state,
				stocksTN: action.payload,
			};
		case TRAER_MOVIMIENTOS_STOCK:
			let vars = { bus: action.payload.bus };
			let r = filtro(action.payload.arrayProd, vars);
			return {
				...state,
				stocks: action.payload.arrayProd,
				filas: r,
				cargando: false,
			};
		case FILAS_MOVIMIENTOS_STOCK:
			vars = { bus: action.payload };
			r = filtro(state.stocks, vars);
			return {
				...state,
				filas: r,
			};
		case PTO_STOCK:
			return {
				...state,
				ptoStock: action.payload,
			};
		case PRODUCTO_ACTIVO:
			return {
				...state,
				productoActivo: action.payload,
			};
		case ACTIVAR_FILA:
			return {
				...state,
				filaActivaProducto: action.payload,
			};
		case CONFIRMAR_CAMBIO_STOCK:
			return {
				...state,
				productoActivo: state.productoActivo.map((fila) =>
					fila.id === action.payload.fila.id ? action.payload.fila : fila
				),
				filaActivaProducto: {},
				mensaje: {
					msg: action.payload.respuesta.data.msg,
					categoria: action.payload.respuesta.data.severity,
				},
			};
		case CONFIRMAR_CAMBIO_STOCK_PTO_STOCK:
			return {
				...state,
				stocks: state.stocks.map((fila) =>
					fila.id === state.filaActivaProducto.id
						? state.filaActivaProducto
						: fila
				),
				filaActivaProducto: {},
				mensaje: {
					msg: action.payload.respuesta.data.msg,
					categoria: action.payload.respuesta.data.severity,
				},
			};
		case NUEVA_CANTIDAD_STOCK:
			return {
				...state,
				filaActivaProducto: {
					...state.filaActivaProducto,
					cantidad: action.payload,
				},
			};
		case MODAL_OPEN:
			return {
				...state,
				openModal: true,
			};
		case MODAL_CLOSE:
			return {
				...state,
				openModal: false,
			};
		case ERROR_STOCK:
			return {
				...state,
				mensaje: action.payload,
			};
		case ACTUALIZAR_STOCK:
			return {
				...state,
				stocks: state.stocks.map((x) =>
					x.ProductoCodigo === action.payload.ProductoCodigo &&
					x.PtoStockId === action.payload.PtoStockId
						? { ...x, cantidad: action.payload.cantidad }
						: x
				),
			};
		case MOSTRAR_ALERTA_STOCK:
			return {
				...state,
				mensajeStock: action.payload,
			};
		case OCULTAR_ALERTA_STOCK:
			return {
				...state,
				mensajeStock: null,
			};
		default:
			return state;
	}
};

export default StockReducer;
