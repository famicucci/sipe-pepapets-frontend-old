import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';
import { Direccion } from '../../functions/envio';
import { ptoStockToSync } from '../../config/globalVariables';

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

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		ordenCreada: null,
		ptoStock: 1,
		ptoVenta: 1,
		ordenEcommerce: '',
		cliente: null,
		envio: null,
		nota: null,
		listaPrecio: 1,
		valorRadio: 'pto-stock',
		carrito: [],
		modo: 'manual',
		orderToModify: null,
		cargando: true,
		mensajeVentas: null,
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerProductos = async (stocks, prices) => {
		try {
			const pricesIndex = prices.reduce(
				(acc, el) => ({
					...acc,
					[`${el.ProductoCodigo}${el.ListaPrecioId}`]: el,
				}),
				{}
			);

			const priceLists = [1, 2];

			const stocksWithPrices = [];
			for (const priceList of priceLists) {
				for (const product of stocks) {
					const productPrice =
						pricesIndex[`${product.ProductoCodigo}${priceList}`];
					const productWithPrice = { ...product, ...productPrice };
					stocksWithPrices.push(productWithPrice);
				}
			}

			const stockWithPricesMod = stocksWithPrices.map((x) => ({
				cantidad: x.cantidad,
				ProductoCodigo: x.ProductoCodigo,
				PtoStockId: x.PtoStockId,
				['Producto.descripcion']: x['Producto.descripcion'],
				['PtoStock.descripcion']: x['PtoStock.descripcion'],
				['Producto.Precios.pu']: x.pu,
				['Producto.Precios.ListaPrecioId']: x.ListaPrecioId,
			}));

			dispatch({
				type: PRODUCTOS_VENTAS,
				payload: stockWithPricesMod,
			});

			dispatch({
				type: OCULTAR_CARGANDO,
			});

			// poner los productos en el carrito
			const getInitialValueOfSale = (key, callback) => {
				if (localStorage.getItem(key)) {
					const initialState = JSON.parse(localStorage.getItem(key));
					callback(initialState);
				}
			};

			getInitialValueOfSale('carrito', restoreCart);
		} catch (error) {
			mostrarAlertaVentas('Hubo un error', 'error');
		}
	};

	const handlePtoStock = (stockPointId) => {
		dispatch({
			type: PTO_STOCK_VENTAS,
			payload: stockPointId,
		});
	};

	const handlePriceList = (listId) => {
		dispatch({
			type: LISTA_PRECIO_VENTAS,
			payload: listId,
		});
	};

	const handleValorRadio = (valor) => {
		dispatch({
			type: VALOR_RADIO_VENTAS,
			payload: valor,
		});
	};

	const handleCarrito = (product) => {
		const alreadyInTheCart = state.carrito.find(
			(x) =>
				x.ProductoCodigo === product.ProductoCodigo &&
				x.PtoStockId === product.PtoStockId
		);

		if (!alreadyInTheCart) {
			product.cantidad = 1;
			dispatch({
				type: CARRITO_AGREGAR_PRODUCTO,
				payload: product,
			});
		} else if (alreadyInTheCart) {
			alreadyInTheCart.cantidad += product.cantidad;
			dispatch({
				type: CARRITO_MODIFICAR_CANTIDAD,
				payload: alreadyInTheCart,
			});
		}

		if (product.PtoStockId !== 0)
			dispatch({
				type: STOCK_MODIFICAR_CANTIDAD,
				payload: {
					ProductoCodigo: product.ProductoCodigo,
					PtoStockId: product.PtoStockId,
					qty: -product.cantidad,
				},
			});
	};

	const restoreCart = (cart) => {
		dispatch({
			type: CARRITO_RESTAURAR_PRODUCTOS,
			payload: cart,
		});

		cart.forEach((x) => {
			if (x.PtoStockId !== 0)
				dispatch({
					type: STOCK_MODIFICAR_CANTIDAD,
					payload: {
						ProductoCodigo: x.ProductoCodigo,
						PtoStockId: x.PtoStockId,
						qty: -x.cantidad,
					},
				});
		});
	};

	const handleRemoveProductCart = (code) => {
		dispatch({
			type: CARRITO_QUITAR_PRODUCTO,
			payload: code,
		});

		state.carrito.forEach((x) => {
			if (x.ProductoCodigo === code && x.PtoStockId !== 0)
				dispatch({
					type: STOCK_MODIFICAR_CANTIDAD,
					payload: {
						ProductoCodigo: x.ProductoCodigo,
						PtoStockId: x.PtoStockId,
						qty: x.cantidad,
					},
				});
		});
	};

	const handlePriceCart = (code, price) => {
		dispatch({
			type: CARRITO_MODIFICAR_PRECIO,
			payload: { code, price },
		});
	};

	const handleModo = (val) => {
		dispatch({
			type: MODO_CARGA_VENTA,
			payload: val,
		});
	};

	const handleCliente = (client) => {
		if (client)
			dispatch({
				type: AGREGAR_CLIENTE,
				payload: client,
			});
		else
			dispatch({
				type: ELIMINAR_CLIENTE,
			});
	};

	const handleEnvio = (shipping) => {
		dispatch({
			type: AGREGAR_ENVIO,
			payload: shipping,
		});
	};

	const crearOrden = async () => {
		let direccionEnvio;
		if (state.envio.modoDirecc === 'select' && state.envio.select) {
			direccionEnvio = Direccion.transformDirection(state.envio.select);
		} else if (state.envio.modoDirecc === 'input') {
			direccionEnvio = state.envio.input;
		}

		let OrdenEstadoId = 6;
		const detalleOrden = state.carrito.map((x) => {
			const productToProduction = x.PtoStockId === 0;

			if (productToProduction) OrdenEstadoId = 4;

			return {
				cantidad: x.cantidad,
				pu: x['Producto.Precios.pu'],
				origen: x.origen,
				ProductoCodigo: x.ProductoCodigo,
				PtoStockId: productToProduction ? null : x.PtoStockId,
			};
		});

		const paraCrearOrden = {
			observaciones: state.nota,
			direccionEnvio: direccionEnvio,
			tarifaEnvio: state.envio.costo,
			TipoEnvioId: state.envio.tipo,
			ClienteId: state.cliente.id,
			ordenEcommerce: state.ordenEcommerce,
			PtoVentaId: state.ptoVenta,
			OrdenEstadoId: OrdenEstadoId, // va en automático
			detalleOrden: detalleOrden,
		};

		try {
			let order = await clienteAxios.post('/api/ordenes/', paraCrearOrden);

			try {
				const createdOrder = await clienteAxios.get(
					`/api/ordenes/${order.data.id}`
				);

				if (ptoStockToSync) {
					// get products TN
					try {
						const r = await clienteAxios.get('/api/tiendanube/productos');
						const stocksTN = r.data;

						// update in TN
						for (const productOrder of detalleOrden) {
							if (productOrder.PtoStockId === ptoStockToSync)
								try {
									for (const product of stocksTN) {
										for (const variant of product.variants) {
											if (variant.sku === productOrder.ProductoCodigo) {
												await clienteAxios.put(
													`/api/tiendanube/stock/${variant.product_id}/${variant.id}`,
													{ qty: variant.stock - productOrder.cantidad }
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
					type: ACTIVAR_ORDEN,
					payload: createdOrder.data,
				});

				dispatch({
					type: CARRITO_ELIMINAR,
				});

				dispatch({
					type: ELIMINAR_ENVIO,
				});

				dispatch({
					type: ELIMINAR_CLIENTE,
				});

				dispatch({
					type: ELIMINAR_NOTA,
				});

				dispatch({
					type: ELIMINAR_ORDEN_ECOMMERCE,
				});

				dispatch({
					type: ELIMINAR_PTO_VENTA,
				});
			} catch (error) {
				mostrarAlertaVentas('Hubo un error', 'error');
			}
		} catch (error) {
			if (error.response.data.productWithoutStock) {
				mostrarAlertaVentas(
					`Producto sin stock suficiente: ${error.response.data.productWithoutStock}`,
					'error'
				);
			} else {
				mostrarAlertaVentas('Hubo un error al crear la orden', 'error');
			}
		}
	};

	const handleNota = (note) => {
		if (note)
			dispatch({
				type: AGREGAR_NOTA,
				payload: note,
			});
		else
			dispatch({
				type: ELIMINAR_NOTA,
			});
	};

	const handleInputOrdenEcommerce = (val) => {
		dispatch({
			type: AGREGAR_ORDEN_ECOMMERCE,
			payload: val,
		});
	};

	const handlePtoVenta = (opt) => {
		dispatch({
			type: PTO_VENTA,
			payload: opt,
		});
	};

	const handleOpenModalDetalleOrden = () => {
		dispatch({
			type: MODAL_DETALLE_ORDEN,
		});
	};

	const handleCloseModal = () => {
		dispatch({
			type: MODAL_CLOSE,
		});
	};

	const handleOrdenActiva = (orden) => {
		dispatch({
			type: ACTIVAR_ORDEN,
			payload: orden,
		});
	};

	const handleOrderToModify = (idOrder, cartToEdit) => {
		if (idOrder && cartToEdit) {
			dispatch({
				type: AGREGAR_ORDEN_A_MODIFICAR,
				payload: idOrder,
			});

			dispatch({
				type: CARRITO_RESTAURAR_PRODUCTOS,
				payload: cartToEdit,
			});
		} else {
			dispatch({
				type: ELIMINAR_ORDEN_A_MODIFICAR,
			});

			dispatch({
				type: CARRITO_ELIMINAR,
			});
		}
	};

	const cancelOrderToModify = () => {
		dispatch({
			type: CARRITO_ELIMINAR,
		});

		dispatch({
			type: ELIMINAR_ORDEN_A_MODIFICAR,
		});
	};

	const editProductsOrder = async () => {
		const cartToEditOrder = state.carrito.map((x) => ({
			cantidad: x.cantidad,
			pu: x['Producto.Precios.pu'],
			origen: x.origen,
			ProductoCodigo: x.ProductoCodigo,
			PtoStockId: x.PtoStockId !== 0 ? x.PtoStockId : null,
			OrdenId: state.orderToModify,
		}));

		try {
			await clienteAxios.put(
				`/api/detalles-orden/${state.orderToModify}`,
				cartToEditOrder
			);

			dispatch({
				type: CARRITO_ELIMINAR,
			});

			dispatch({
				type: ELIMINAR_ORDEN_A_MODIFICAR,
			});
		} catch (error) {
			mostrarAlertaVentas('Hubo un error', 'error');
		}
	};

	const mostrarAlertaVentas = (msg, severity) => {
		dispatch({
			type: MOSTRAR_ALERTA_VENTAS,
			payload: { msg, severity },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_VENTAS,
			});
		}, 4000);
	};

	const ocultarAlertaVentas = () => {
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_VENTAS,
			});
		}, 4000);
	};

	return (
		<VentasContext.Provider
			value={{
				preciosPtoStock: state.preciosPtoStock,
				ordenes: state.ordenes,
				ordenCreada: state.ordenCreada,
				ptoStock: state.ptoStock,
				listaPrecio: state.listaPrecio,
				valorRadio: state.valorRadio,
				carrito: state.carrito,
				productoActivoCarrrito: state.productoActivoCarrrito,
				mensaje: state.mensaje,
				mensajeVentas: state.mensajeVentas,
				modo: state.modo,
				orderToModify: state.orderToModify,
				cliente: state.cliente,
				envio: state.envio,
				nota: state.nota,
				ordenEcommerce: state.ordenEcommerce,
				ptoVenta: state.ptoVenta,
				estadosOrden: state.estadosOrden,
				cargando: state.cargando,
				ptosStock: state.ptosStock,
				handlePtoStock,
				handlePriceList,
				handleValorRadio,
				handleCarrito,
				restoreCart,
				handleRemoveProductCart,
				handlePriceCart,
				traerProductos,
				handleModo,
				handleCliente,
				handleEnvio,
				crearOrden,
				handleNota,
				handleInputOrdenEcommerce,
				handlePtoVenta,
				handleOpenModalDetalleOrden,
				handleCloseModal,
				handleOrdenActiva,
				handleOrderToModify,
				cancelOrderToModify,
				editProductsOrder,
				mostrarAlertaVentas,
				ocultarAlertaVentas,
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
