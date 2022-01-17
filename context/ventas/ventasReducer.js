import {
	PRODUCTOS_VENTAS,
	PTO_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
	CARRITO_AGREGAR_PRODUCTO,
	CARRITO_QUITAR_PRODUCTO,
	CARRITO_MODIFICAR_CANTIDAD,
	CARRITO_MODIFICAR_PRECIO,
	CARRITO_RESTAURAR_PRODUCTOS,
	CARRITO_ELIMINAR,
	STOCK_MODIFICAR_CANTIDAD,
	MODO_CARGA_VENTA,
	AGREGAR_CLIENTE,
	ELIMINAR_CLIENTE,
	AGREGAR_ENVIO,
	ELIMINAR_ENVIO,
	AGREGAR_NOTA,
	ELIMINAR_NOTA,
	AGREGAR_ORDEN_ECOMMERCE,
	ELIMINAR_ORDEN_ECOMMERCE,
	PTO_VENTA,
	ELIMINAR_PTO_VENTA,
	AGREGAR_ORDEN_A_MODIFICAR,
	ELIMINAR_ORDEN_A_MODIFICAR,
	MODAL_DETALLE_ORDEN,
	MODAL_CLOSE,
	MOSTRAR_ALERTA_VENTAS,
	OCULTAR_ALERTA_VENTAS,
	ACTIVAR_ORDEN,
	OCULTAR_CARGANDO,
} from '../../types';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRODUCTOS_VENTAS:
			return {
				...state,
				preciosPtoStock: action.payload,
			};
		case PTO_STOCK_VENTAS:
			return {
				...state,
				ptoStock: action.payload,
			};
		case LISTA_PRECIO_VENTAS:
			return {
				...state,
				listaPrecio: action.payload,
			};
		case VALOR_RADIO_VENTAS:
			return {
				...state,
				valorRadio: action.payload,
			};
		case CARRITO_AGREGAR_PRODUCTO:
			if (!state.orderToModify)
				localStorage.setItem(
					'carrito',
					JSON.stringify([...state.carrito, action.payload])
				);
			return {
				...state,
				carrito: [...state.carrito, action.payload],
			};
		case CARRITO_RESTAURAR_PRODUCTOS:
			return {
				...state,
				carrito: action.payload,
			};
		case CARRITO_ELIMINAR:
			if (!state.orderToModify) localStorage.removeItem('carrito');
			return {
				...state,
				carrito: [],
			};
		case STOCK_MODIFICAR_CANTIDAD:
			return {
				...state,
				preciosPtoStock: state.preciosPtoStock.map((x) =>
					x.ProductoCodigo === action.payload.ProductoCodigo &&
					x.PtoStockId === action.payload.PtoStockId
						? { ...x, cantidad: x.cantidad + action.payload.qty }
						: x
				),
			};
		case CARRITO_QUITAR_PRODUCTO:
			if (!state.orderToModify)
				localStorage.setItem(
					'carrito',
					JSON.stringify(
						state.carrito.filter((x) => x.ProductoCodigo !== action.payload)
					)
				);
			return {
				...state,
				carrito: state.carrito.filter(
					(x) => x.ProductoCodigo !== action.payload
				),
			};
		case CARRITO_MODIFICAR_CANTIDAD:
			if (!state.orderToModify)
				localStorage.setItem(
					'carrito',
					JSON.stringify(
						state.carrito.map((x) =>
							x.ProductoCodigo === action.payload.ProductoCodigo &&
							x.PtoStockId === action.payload.PtoStockId
								? action.payload
								: x
						)
					)
				);
			return {
				...state,
				carrito: state.carrito.map((x) =>
					x.ProductoCodigo === action.payload.ProductoCodigo &&
					x.PtoStockId === action.payload.PtoStockId
						? action.payload
						: x
				),
			};
		case CARRITO_MODIFICAR_PRECIO:
			if (!state.orderToModify)
				localStorage.setItem(
					'carrito',
					JSON.stringify(
						state.carrito.map((x) =>
							x.ProductoCodigo === action.payload.code
								? { ...x, ['Producto.Precios.pu']: action.payload.price }
								: x
						)
					)
				);
			return {
				...state,
				carrito: state.carrito.map((x) =>
					x.ProductoCodigo === action.payload.code
						? { ...x, ['Producto.Precios.pu']: action.payload.price }
						: x
				),
			};
		case MODO_CARGA_VENTA:
			return {
				...state,
				modo: action.payload,
			};
		case AGREGAR_CLIENTE:
			localStorage.setItem('cliente', JSON.stringify(action.payload));
			return {
				...state,
				cliente: action.payload,
			};
		case ELIMINAR_CLIENTE:
			localStorage.removeItem('cliente');
			return {
				...state,
				cliente: null,
			};
		case AGREGAR_ENVIO:
			localStorage.setItem('envio', JSON.stringify(action.payload));
			return {
				...state,
				envio: action.payload,
			};
		case ELIMINAR_ENVIO:
			localStorage.removeItem('envio');
			return {
				...state,
				envio: null,
			};
		case AGREGAR_NOTA:
			localStorage.setItem('nota', JSON.stringify(action.payload));
			return {
				...state,
				nota: action.payload,
			};
		case ELIMINAR_NOTA:
			localStorage.removeItem('nota');
			return {
				...state,
				nota: null,
			};
		case AGREGAR_ORDEN_ECOMMERCE:
			localStorage.setItem('ordenEcommerce', JSON.stringify(action.payload));
			return {
				...state,
				ordenEcommerce: action.payload,
			};
		case ELIMINAR_ORDEN_ECOMMERCE:
			localStorage.removeItem('ordenEcommerce');
			return {
				...state,
				ordenEcommerce: null,
			};
		case PTO_VENTA:
			localStorage.setItem('ptoVenta', JSON.stringify(action.payload));
			return {
				...state,
				ptoVenta: action.payload,
			};
		case ELIMINAR_PTO_VENTA:
			localStorage.removeItem('ptoVenta');
			return {
				...state,
				ptoVenta: 1,
			};
		case ACTIVAR_ORDEN:
			return {
				...state,
				ordenCreada: action.payload,
			};
		case AGREGAR_ORDEN_A_MODIFICAR:
			return {
				...state,
				orderToModify: action.payload,
			};
		case ELIMINAR_ORDEN_A_MODIFICAR:
			return {
				...state,
				orderToModify: null,
			};
		case MODAL_DETALLE_ORDEN:
			return {
				...state,
				openModalDetalleOrden: true,
			};
		case MODAL_CLOSE:
			return {
				...state,
				openModalDetalleOrden: false,
			};
		case MOSTRAR_ALERTA_VENTAS:
			return {
				...state,
				mensajeVentas: action.payload,
			};
		case OCULTAR_ALERTA_VENTAS:
			return {
				...state,
				mensajeVentas: null,
			};
		case OCULTAR_CARGANDO:
			return {
				...state,
				cargando: false,
			};
		default:
			return state;
	}
};

export default VentasReducer;
