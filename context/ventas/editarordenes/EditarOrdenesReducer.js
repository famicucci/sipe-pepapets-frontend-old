import {
	TRAER_ORDENES,
	ELIMINAR_ORDEN,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	MODIFICAR_ORDENES,
	CREAR_DETALLE_FACTURA,
	MODAL_DETALLE_ORDEN,
	MODAL_INFORMACION_CLIENTE,
	MODAL_CREAR_FACTURA,
	MODAL_FACTURA,
	MODAL_CONFIRMAR_FACTURA,
	MODAL_CREAR_PAGO,
	MODAL_CLOSE,
	MODAL_CLOSE_CONFIRMAR_FACTURA,
	MODAL_CLOSE_CREAR_PAGO,
	AGREGAR_PAGO,
	MOSTRAR_ALERTA_EDITAR_ORDENES,
	OCULTAR_ALERTA_EDITAR_ORDENES,
	ACTIVAR_ORDEN,
	MODAL_CONFIRMAR_CANCELAR_FACTURA,
	MODAL_CONFIRMAR_CANCELAR_PAGO,
	ELIMINAR_FACTURA,
	MODIFICAR_ESTADO_PAGO_FACTURA,
	MODIFICAR_ESTADO_PAGO,
	OCULTAR_CARGANDO,
} from '../../../types';

const EditarOrdenesReducer = (state, action) => {
	switch (action.type) {
		case TRAER_ORDENES:
			return {
				...state,
				ordenes: action.payload,
			};
		case TRAER_ORDENES:
			return {
				...state,
				ordenes: [...action.payload, ...state.ordenes],
			};
		case ELIMINAR_ORDEN:
			return {
				...state,
				ordenes: state.ordenes.filter((x) => x.id !== action.payload),
			};
		case FILA_ACTIVA_ORDEN:
			return {
				...state,
				filaActiva: action.payload,
			};
		case ELIMINAR_FACTURA:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === state.filaActiva.id ? { ...x, Factura: null } : x
				),
			};
		case ACTIVAR_ORDEN:
			return {
				...state,
				filaActiva: state.ordenes.find((x) => x.id === action.payload),
			};
		case MODIFICAR_ORDENES:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === action.payload.id ? action.payload : x
				),
			};
		case MODIFICAR_ESTADO_ORDEN:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === action.payload.idOrder
						? {
								...x,
								OrdenEstado: {
									id: action.payload.idStatus,
									descripcion: action.payload.descriptionStatus,
								},
						  }
						: x
				),
			};
		case MODIFICAR_ESTADO_PAGO_FACTURA:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === state.filaActiva.id
						? {
								...x,
								Factura: {
									...x.Factura,
									estadoPago: action.payload,
								},
						  }
						: x
				),
			};
		case MODIFICAR_ESTADO_PAGO:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === state.filaActiva.id
						? {
								...x,
								Factura: {
									...x.Factura,
									Pagos: x.Factura.Pagos.map((y) =>
										y.id === action.payload.paymentId
											? { ...y, estado: action.payload.estado }
											: y
									),
								},
						  }
						: x
				),
			};
		case CREAR_DETALLE_FACTURA:
			return {
				...state,
				factura: { ...state.factura, detalleFactura: action.payload },
			};
		case MODAL_DETALLE_ORDEN:
			return {
				...state,
				openModalDetalleOrden: true,
			};
		case MODAL_INFORMACION_CLIENTE:
			return {
				...state,
				openModalInformacionCliente: true,
			};
		case MODAL_CREAR_FACTURA:
			return {
				...state,
				openModalCrearFactura: true,
			};
		case MODAL_FACTURA:
			return {
				...state,
				openModalFactura: true,
			};

		case MODAL_CONFIRMAR_FACTURA:
			return {
				...state,
				openModalConfirmarCrearFactura: true,
			};
		case MODAL_CONFIRMAR_CANCELAR_FACTURA:
			return {
				...state,
				openModalConfirmarCancelarFactura: action.payload,
			};
		case MODAL_CONFIRMAR_CANCELAR_PAGO:
			return {
				...state,
				openModalConfirmarCancelarPago: action.payload,
			};
		case MODAL_CREAR_PAGO:
			return {
				...state,
				openModalCrearPago: true,
			};

		case MODAL_CLOSE:
			return {
				...state,
				factura: {},
				openModalDetalleOrden: false,
				openModalInformacionCliente: false,
				openModalCrearFactura: false,
				openModalFactura: false,
				openModalConfirmarCrearFactura: false,
				openModalConfirmarCancelarFactura: false,
			};
		case MODAL_CLOSE_CONFIRMAR_FACTURA:
			return {
				...state,
				openModalConfirmarCrearFactura: false,
			};
		case MODAL_CLOSE_CREAR_PAGO:
			return {
				...state,
				openModalCrearPago: false,
			};
		case AGREGAR_PAGO:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === state.filaActiva.id
						? {
								...x,
								Factura: {
									...x.Factura,
									Pagos: [...x.Factura.Pagos, action.payload],
								},
						  }
						: x
				),
			};
		case MOSTRAR_ALERTA_EDITAR_ORDENES:
			return {
				...state,
				mensajeEditarOrdenes: action.payload,
			};
		case OCULTAR_ALERTA_EDITAR_ORDENES:
			return {
				...state,
				mensajeEditarOrdenes: null,
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

export default EditarOrdenesReducer;
