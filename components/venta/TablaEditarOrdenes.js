import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import SpinnerTabla from '../generales/SpinnerTabla';
import FilaEditarOrdenes from '../venta/FilaEditarOrdenes';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import DetalleOrden from './DetalleOrden';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import InformacionCliente from '../cliente/InformacionCliente';
import CrearFactura from './CrearFactura';
import Factura from './Factura';
import CrearPago from './CrearPago';
import Alerta2 from '../generales/Alerta2';
import VentasContext from '../../context/ventas/ventasContext';
import useFilter from '../../hooks/useFilter';
import { useRouter } from 'next/router';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
	spinner: { height: '86vh' },
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Nº', align: 'center', minWidth: 60 },
	{ id: 2, nombre: 'Estado', align: 'center', minWidth: 110 },
	{ id: 7, nombre: 'Cliente', align: 'center', minWidth: 110 },
	{ id: 3, nombre: 'Fecha', align: 'center', minWidth: 80 },
	{ id: 4, nombre: 'Nº Fact.', align: 'center', minWidth: 100 },
	{ id: 5, nombre: 'Estado Pago', align: 'center', minWidth: 110 },
	{ id: 6, nombre: 'M. Envío', align: 'center', minWidth: 80 },
	{
		id: 8,
		nombre: 'Nota',
		align: 'center',
		minWidth: 60,
		boton: true,
		contenidoBoton: <NoteOutlinedIcon />,
	},
];

const TablaEditarOrdenes = () => {
	const classes = useStyles();
	const router = useRouter();

	const { handleHerramientasEditarVentas, busqueda } = useContext(
		BarraHerramientasContext
	);
	const { shippingTypes, getOrderStatuses, getShippingTypes } =
		useContext(GlobalDataContext);
	const { ordenCreada, handleOrdenActiva, handleOrderToModify } =
		useContext(VentasContext);

	const {
		ordenes,
		mensajeEditarOrdenes,
		cargando,
		traerOrdenes,
		openModalDetalleOrden,
		openModalCrearFactura,
		openModalFactura,
		openModalCrearPago,
		filaActiva,
		openModalInformacionCliente,
		handleCloseModal,
		handleFilaActivaOrden,
		mostrarAlertaEditarOrdenes,
	} = useContext(EditarOrdenesContext);

	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 25);

	useEffect(() => {
		traerOrdenes();
		handleHerramientasEditarVentas();
		getOrderStatuses();
		getShippingTypes();

		if (ordenCreada) {
			mostrarAlertaEditarOrdenes(
				`Orden creada nº ${ordenCreada.id}`,
				'success'
			);
			handleOrdenActiva(null);
		}

		if (router.query['edited-order']) {
			handleOrderToModify();
			mostrarAlertaEditarOrdenes(
				`Realizaste cambios en la Orden nº ${router.query['edited-order']}`,
				'success'
			);
		}
	}, []);

	useEffect(() => {
		if (ordenes.length !== 0 && shippingTypes) {
			const rows = ordenes.map((x) => ({
				idOrden: x.id,
				ordenEstado: x.OrdenEstado.descripcion,
				ordenEstadoId: x.OrdenEstado.id,
				nombreCliente: x.Cliente.nombre,
				apellidoCliente: x.Cliente.apellido,
				fecha: x.createdAt,
				idFactura: x.Factura ? x.Factura.id : null,
				estadoPago: x.Factura ? x.Factura.estadoPago : null,
				tipoEnvioId: x.TipoEnvioId,
				tipoEnvioDescripcion: getDescriptionShipping(
					shippingTypes,
					x.TipoEnvioId
				),
				observaciones: x.observaciones,
			}));
			setData(rows);
		}
	}, [ordenes, shippingTypes]);

	const getDescriptionShipping = (shippingTypes, id) => {
		const r = shippingTypes.find((x) => x.id === id);

		if (r) return r.descripcion;
	};

	// extraer los id de las columnas
	const colIndex = columnas.reduce(
		(acc, el) => ({ ...acc, [el.nombre]: el }),
		{}
	);

	return (
		<TableContainer component={Paper}>
			{!cargando ? (
				<Table className={classes.table}>
					<HeadTabla columnas={columnas} />
					<TableBody>
						{cortePagina.map((x) => (
							<FilaEditarOrdenes key={x.idOrden} fila={x} colIndex={colIndex} />
						))}
						{cortePagina.length === 0 && !cargando
							? bodyVacio(columnas)
							: filasVacias}
					</TableBody>
					<FooterTabla />
				</Table>
			) : (
				<Box className={classes.spinner}>
					<SpinnerTabla />
				</Box>
			)}
			{openModalDetalleOrden ? <DetalleOrden /> : null}
			{openModalInformacionCliente ? (
				<InformacionCliente
					filaActiva={filaActiva.Cliente}
					openModalInformacionCliente={openModalInformacionCliente}
					handleCloseModal={handleCloseModal}
					handleFilaActiva={handleFilaActivaOrden}
				/>
			) : null}
			{openModalCrearFactura ? <CrearFactura /> : null}
			{openModalFactura ? <Factura /> : null}
			{openModalCrearPago ? <CrearPago /> : null}
			{mensajeEditarOrdenes ? <Alerta2 mensaje={mensajeEditarOrdenes} /> : null}
		</TableContainer>
	);
};

export default TablaEditarOrdenes;
