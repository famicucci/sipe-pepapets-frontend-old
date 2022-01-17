import React, { useReducer } from 'react';
import EditarOrdenesContext from './EditarOrdenesContext';
import EditarOrdenesReducer from './EditarOrdenesReducer';
import clienteAxios from '../../../config/axios';
import { DetalleFactura } from '../../../functions/Factura';
import { FacturaBD } from '../../../functions/Factura';
import { ptoStockToSync, syncOrdersTN } from '../../../config/globalVariables';

import {
	TRAER_ORDENES,
	ELIMINAR_ORDEN,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ORDENES,
	MODIFICAR_ESTADO_ORDEN,
	CREAR_DETALLE_FACTURA,
	MODAL_DETALLE_ORDEN,
	MODAL_INFORMACION_CLIENTE,
	MODAL_CREAR_FACTURA,
	MODAL_CONFIRMAR_FACTURA,
	MODAL_FACTURA,
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

const EditarOrdenesState = (props) => {
	const initialState = {
		ordenes: [],
		filaActiva: {},
		factura: {},
		openModalDetalleOrden: false,
		openModalInformacionCliente: false,
		openModalCrearFactura: false,
		openModalConfirmarCrearFactura: false,
		openModalConfirmarCancelarFactura: false,
		openModalConfirmarCancelarPago: false,
		openModalFactura: false,
		openModalCrearPago: false,
		mensajeEditarOrdenes: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(EditarOrdenesReducer, initialState);

	// las funciones
	const traerOrdenes = async () => {
		try {
			const syncOrders = async () => {
				try {
					// first get orders from TN
					const ordersTN = await clienteAxios.get('/api/tiendanube/ordenes/');

					// START BUCLE
					for (const orderTN of ordersTN.data) {
						if (orderTN.status === 'open') {
							// check if customer exist in Sip-e's BD by email
							const customer = await clienteAxios.get(
								`/api/clientes/${orderTN.customer.email}`
							);

							let customerId;
							if (customer.data.length !== 0) {
								customerId = customer.data[0]['id'];
							} else {
								try {
									const newCustomer = await clienteAxios.post(
										'/api/clientes/',
										{
											nombre: orderTN.customer.billing_name,
											apellido: orderTN.customer.name,
											email: orderTN.customer.email,
											tipo: 'Minorista', // always
											condIva: 'Consumidor Final', // always
											EmpresaId: 1, // always
										}
									);
									customerId = newCustomer.data.id;
								} catch (error) {
									mostrarAlertaEditarOrdenes(
										'Hubo un error al crear el cliente. La sincronización con TN no se completó',
										'error'
									);
									return;
								}
							}

							// crear detalle de la orden
							const detalleOrden = orderTN.products.map((product) => ({
								cantidad: product.quantity,
								pu: product.price,
								origen: 'Disponible', // Establece siempre 'Disponible'
								ProductoCodigo: product.sku,
								PtoStockId: 1, // establece siempre ptostock showroom
							}));

							// crear orden
							const orderToSipe = {
								observaciones: null, // las ordenes de TN no traen observaciones
								direccionEnvio: orderTN.shipping_address.address,
								tarifaEnvio: orderTN.shipping_cost_customer,
								ordenEcommerce: orderTN.id,
								ClienteId: customerId,
								PtoVentaId: 1, // corresponde siempre al showroom
								OrdenEstadoId: 16, // establece siempre
								TipoEnvioId: 9, // establecer siempre 'A Definir'
								detalleOrden: detalleOrden, // definido recién
							};

							try {
								const createdOrder = await clienteAxios.post(
									'/api/ordenes/simple',
									orderToSipe
								);

								// si la orden fue creada close order
								try {
									await clienteAxios.post(
										`/api/tiendanube/ordenes/${orderTN.id}/close`
									);
								} catch (error) {
									mostrarAlertaEditarOrdenes(
										`Hubo un error al cerrar la orden en Tn. Cancela la orden ${createdOrder.data.id} en TN`,
										'error',
										50000
									);
									return;
								}
							} catch (error) {
								mostrarAlertaEditarOrdenes(
									`Hubo un error al crear la orden ${orderTN.id}. La sincronización con TN no se completó`,
									'error',
									30000
								);
								return;
							}
						}
					}

					// END BUCLE
				} catch (error) {
					mostrarAlertaEditarOrdenes(
						'Hubo un error al sincronizar con TN',
						'error'
					);
					return;
				}
			};

			if (syncOrdersTN) await syncOrders();

			// trae las ordenes al final, cuando todas las ordenes open de TN ya esten creadas
			let r = await clienteAxios.get('/api/ordenes/');

			dispatch({
				type: TRAER_ORDENES,
				payload: r.data,
			});

			dispatch({
				type: OCULTAR_CARGANDO,
			});
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const traerOrdenesFinalizadas = async (startDate, endDate) => {
		try {
			const r = await clienteAxios.get(
				`/api/ordenes/finalizadas/${JSON.stringify({ startDate, endDate })}`
			);

			dispatch({
				type: TRAER_ORDENES,
				payload: r.data,
			});

			dispatch({
				type: OCULTAR_CARGANDO,
			});
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const handleEstadoOrden = async (idOrder, idStatus, descriptionStatus) => {
		try {
			let r = await clienteAxios.put(`/api/ordenes/${idOrder}`, {
				OrdenEstadoId: idStatus,
			});

			dispatch({
				type: MODIFICAR_ESTADO_ORDEN,
				payload: {
					idOrder,
					idStatus,
					descriptionStatus,
				},
			});

			mostrarAlertaEditarOrdenes(r.data.msg, 'success');
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const handleFilaActivaOrden = (id) => {
		let r = state.ordenes.find((x) => x.id === id);

		if (!r) r = {};

		dispatch({
			type: FILA_ACTIVA_ORDEN,
			payload: r,
		});
	};

	const handleDetalleFactura = (detalleOrden) => {
		const detalleFactura = DetalleFactura.crearDetalleFactura(detalleOrden);

		dispatch({
			type: CREAR_DETALLE_FACTURA,
			payload: detalleFactura,
		});
	};

	const crearFactura = async (objFactura) => {
		try {
			const crearFactura = await clienteAxios.post(
				'/api/facturas/',
				objFactura
			);

			const filaActivaMod = {
				...state.filaActiva,
				Factura: {
					...crearFactura.data,
					detalleFactura: objFactura.detalleFactura,
					Pagos: [],
				},
			};

			dispatch({
				type: FILA_ACTIVA_ORDEN,
				payload: filaActivaMod,
			});

			dispatch({
				type: MODIFICAR_ORDENES,
				payload: filaActivaMod,
			});
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const handleOpenModalDetalleOrden = () => {
		dispatch({
			type: MODAL_DETALLE_ORDEN,
		});
	};

	const handleOpenModalInformacionCliente = () => {
		dispatch({
			type: MODAL_INFORMACION_CLIENTE,
		});
	};

	const handleOpenModalCrearFactura = () => {
		dispatch({
			type: MODAL_CREAR_FACTURA,
		});
	};

	const handleOpenModalConfirmarCrearFactura = () => {
		dispatch({
			type: MODAL_CONFIRMAR_FACTURA,
		});
	};

	const handleOpenModalConfirmarCancelarFactura = (boolean) => {
		dispatch({
			type: MODAL_CONFIRMAR_CANCELAR_FACTURA,
			payload: boolean,
		});
	};

	const handleOpenModalFactura = () => {
		dispatch({
			type: MODAL_FACTURA,
		});
	};

	const handleOpenModalCrearPago = () => {
		dispatch({
			type: MODAL_CREAR_PAGO,
		});
	};

	const handleOpenConfirmCancelPayment = (boolean) => {
		dispatch({
			type: MODAL_CONFIRMAR_CANCELAR_PAGO,
			payload: boolean,
		});
	};

	const handleCloseModal = () => {
		dispatch({
			type: MODAL_CLOSE,
		});
	};

	const handleCloseModalConfirmarCrearFactura = () => {
		dispatch({
			type: MODAL_CLOSE_CONFIRMAR_FACTURA,
		});
	};

	const handleCloseModalCrearPago = () => {
		dispatch({
			type: MODAL_CLOSE_CREAR_PAGO,
		});
	};

	const modificarOrden = async (ordenId, ordenObj) => {
		// what can we modify ??
		// observaciones
		// direccionEnvio, tarifaEnvio and TipoEnvioId
		// ordenEcommerce
		// PtoVentaId
		// OrdenEstadoId
		try {
			await clienteAxios.put(`/api/ordenes/${ordenId}`, ordenObj);

			const modifyFilaActiva = (ordenObj, filaActiva) => {
				const arrayKeys = Object.keys(ordenObj);

				let newFilaActiva = filaActiva;
				arrayKeys.forEach(
					(x, i) =>
						(newFilaActiva = {
							...newFilaActiva,
							[arrayKeys[i]]: ordenObj[x],
						})
				);

				return newFilaActiva;
			};

			const filaActivaMod = modifyFilaActiva(ordenObj, state.filaActiva);

			// modify filaActiva
			dispatch({
				type: FILA_ACTIVA_ORDEN,
				payload: filaActivaMod,
			});
			// modify ordenes
			dispatch({
				type: MODIFICAR_ORDENES,
				payload: filaActivaMod,
			});

			mostrarAlertaEditarOrdenes('Orden modificada!', 'success');
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const crearPago = async (pago) => {
		try {
			const respuesta = await clienteAxios.post(`/api/pagos`, pago);

			// this must be in the component
			// verificar si debo modificar la factura
			// si corresponde, debo modificar el estadoPago de de la factura
			const factura = new FacturaBD(state.filaActiva.Factura);

			if (
				parseFloat(pago.importe) + factura.sumaPagos() ===
				parseFloat(factura.importeFinal)
			) {
				dispatch({
					type: MODIFICAR_ESTADO_PAGO_FACTURA,
					payload: 'Pago',
				});
			}

			dispatch({
				type: AGREGAR_PAGO,
				payload: respuesta.data,
			});

			dispatch({
				type: ACTIVAR_ORDEN,
				payload: state.filaActiva.id,
			});

			mostrarAlertaEditarOrdenes('El pago ha sido creado', 'success');
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const mostrarAlertaEditarOrdenes = (msg, severity, time) => {
		dispatch({
			type: MOSTRAR_ALERTA_EDITAR_ORDENES,
			payload: { msg, severity },
		});

		if (!time) time = 4000;

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_EDITAR_ORDENES,
			});
		}, time);
	};

	const ocultarAlertaEditarOrdenes = () => {
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_EDITAR_ORDENES,
			});
		}, 4000);
	};

	const removeOrder = async (idOrder) => {
		const detalleOrden = state.filaActiva.detalleOrden;

		if (syncOrdersTN) {
			const nroOrdenTN = state.filaActiva.ordenEcommerce;

			if (nroOrdenTN) {
				// check status order in TN
				const order = await clienteAxios.get(
					`/api/tiendanube/ordenes/${nroOrdenTN}`
				);
				if (order.data.status !== 'cancel')
					mostrarAlertaEditarOrdenes(
						'Debes cancelar la orden en TN para poder eliminar la orden en Sip-e. Ten en cuenta que eliminar la orden devolverá los productos al stock',
						'warning'
					);
				return;
			}
		}

		try {
			let r = await clienteAxios.delete(`/api/ordenes/${idOrder}`);

			if (ptoStockToSync) {
				// get products TN
				try {
					const r = await clienteAxios.get('/api/tiendanube/productos');
					const stocksTN = r.data;
					// update in TN
					for (const productOrder of detalleOrden) {
						if (productOrder.PtoStock.id === ptoStockToSync)
							try {
								for (const product of stocksTN) {
									for (const variant of product.variants) {
										if (variant.sku === productOrder.ProductoCodigo) {
											await clienteAxios.put(
												`/api/tiendanube/stock/${variant.product_id}/${variant.id}`,
												{ qty: variant.stock + productOrder.cantidad }
											);
										}
									}
								}
							} catch (error) {
								mostrarAlertaVentas(
									'Hubo un error al actualizar Tienda Nube!',
									'error'
								);
							}
					}
				} catch (error) {
					mostrarAlertaVentas('Hubo un error', 'error');
				}
			}

			dispatch({
				type: ELIMINAR_ORDEN,
				payload: idOrder,
			});

			mostrarAlertaEditarOrdenes(
				`La orden ${idOrder} ha sido eliminada!`,
				'success'
			);
		} catch (error) {
			mostrarAlertaEditarOrdenes(error.msg, error.severity);
		}
	};

	const cancelInvoice = async () => {
		try {
			// call factura controller
			await clienteAxios.patch(`/api/facturas/${state.filaActiva.Factura.id}`);

			dispatch({
				type: MODAL_CLOSE,
			});

			// delete invoice from state orders
			dispatch({
				type: ELIMINAR_FACTURA,
			});

			// remove active row
			dispatch({
				type: FILA_ACTIVA_ORDEN,
				payload: {},
			});
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const cancelPayment = async (paymentId, methodPayment) => {
		// call create payment
		try {
			const r = await clienteAxios.patch(`/api/pagos/${paymentId}`, {
				MetodoPagoId: methodPayment,
			});

			// update ordenes with canceled payment
			dispatch({
				type: AGREGAR_PAGO,
				payload: r.data,
			});

			dispatch({
				type: MODIFICAR_ESTADO_PAGO_FACTURA,
				payload: 'Pendiente',
			});

			dispatch({
				type: MODIFICAR_ESTADO_PAGO,
				payload: { paymentId, estado: 'c' },
			});

			dispatch({
				type: ACTIVAR_ORDEN,
				payload: state.filaActiva.id,
			});

			mostrarAlertaEditarOrdenes('Se cancelo el pago exitosamente', 'success');
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	return (
		<EditarOrdenesContext.Provider
			value={{
				ordenes: state.ordenes,
				filaActiva: state.filaActiva,
				factura: state.factura,
				openModalDetalleOrden: state.openModalDetalleOrden,
				openModalInformacionCliente: state.openModalInformacionCliente,
				openModalCrearFactura: state.openModalCrearFactura,
				openModalConfirmarCrearFactura: state.openModalConfirmarCrearFactura,
				openModalConfirmarCancelarFactura:
					state.openModalConfirmarCancelarFactura,
				openModalConfirmarCancelarPago: state.openModalConfirmarCancelarPago,
				openModalFactura: state.openModalFactura,
				openModalCrearPago: state.openModalCrearPago,
				tiposEnvio: state.tiposEnvio,
				mensajeEditarOrdenes: state.mensajeEditarOrdenes,
				cargando: state.cargando,
				traerOrdenes,
				modificarOrden,
				handleEstadoOrden,
				handleFilaActivaOrden,
				crearFactura,
				handleDetalleFactura,
				handleOpenModalDetalleOrden,
				handleOpenModalInformacionCliente,
				handleOpenModalCrearFactura,
				handleOpenModalConfirmarCrearFactura,
				handleOpenModalFactura,
				handleOpenModalCrearPago,
				handleCloseModal,
				handleCloseModalConfirmarCrearFactura,
				handleCloseModalCrearPago,
				crearPago,
				ocultarAlertaEditarOrdenes,
				mostrarAlertaEditarOrdenes,
				removeOrder,
				handleOpenModalConfirmarCancelarFactura,
				handleOpenConfirmCancelPayment,
				cancelInvoice,
				cancelPayment,
				traerOrdenesFinalizadas,
			}}
		>
			{props.children}
		</EditarOrdenesContext.Provider>
	);
};

export default EditarOrdenesState;
//
