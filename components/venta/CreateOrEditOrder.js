import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ElegirProductos from './ElegirProductos';
import Carrito from './Carrito';
import Alerta from '../generales/Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import { useRouter } from 'next/router';

const CreateOrEditOrder = () => {
	const router = useRouter();

	const { handleHerrNuevaVenta, handleEtiquetaModificarOrden } = useContext(
		BarraHerramientasContext
	);
	const {
		restoreCart,
		handleEnvio,
		handleCliente,
		handleNota,
		handleInputOrdenEcommerce,
		handlePtoVenta,
	} = useContext(VentasContext);
	const { alerta } = useContext(AlertaContext);

	useEffect(() => {
		handleHerrNuevaVenta();

		if (router.query.id) {
			handleEtiquetaModificarOrden(true);
		} else {
			const getInitialValueOfSale = (key, callback) => {
				if (localStorage.getItem(key)) {
					const initialState = JSON.parse(localStorage.getItem(key));
					callback(initialState);
				}
			};

			getInitialValueOfSale('envio', handleEnvio);
			getInitialValueOfSale('cliente', handleCliente);
			getInitialValueOfSale('nota', handleNota);
			getInitialValueOfSale('ordenEcommerce', handleInputOrdenEcommerce);
			getInitialValueOfSale('ptoVenta', handlePtoVenta);
		}
	}, []);

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<ElegirProductos />
				</Grid>
				<Grid item xs={12} md={6}>
					<Carrito />
				</Grid>
			</Grid>
			{alerta !== null ? <Alerta /> : null}
		</>
	);
};

export default CreateOrEditOrder;
