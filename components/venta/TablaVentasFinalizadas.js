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
import FilaEditarOrdenes from './FilaEditarOrdenes';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import DetalleOrden from './DetalleOrden';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import InformacionCliente from '../cliente/InformacionCliente';
import Factura from './Factura';
import useFilter from '../../hooks/useFilter';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import { Box } from '@material-ui/core';
import Alerta2 from '../generales/Alerta2';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
	spinner: { height: '86vh' },
});

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

const TablaVentasFinalizadas = () => {
	const classes = useStyles();

	const { handleHerramientasEditarVentasFinalizadas, busqueda } = useContext(
		BarraHerramientasContext
	);
	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 25);
	const {
		ordenes,
		traerOrdenesFinalizadas,
		openModalDetalleOrden,
		openModalFactura,
		filaActiva,
		cargando,
		mensajeEditarOrdenes,
		openModalInformacionCliente,
		handleCloseModal,
		handleFilaActivaOrden,
	} = useContext(EditarOrdenesContext);
	const { dates, shippingTypes, getOrderStatuses, getShippingTypes } =
		useContext(GlobalDataContext);

	useEffect(() => {
		getOrderStatuses();
		getShippingTypes();
		handleHerramientasEditarVentasFinalizadas();
	}, []);

	useEffect(() => {
		traerOrdenesFinalizadas(dates.startDate, dates.endDate);
	}, [dates]);

	useEffect(() => {
		if (shippingTypes) {
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
			{openModalFactura ? <Factura /> : null}
			{mensajeEditarOrdenes ? <Alerta2 mensaje={mensajeEditarOrdenes} /> : null}
		</TableContainer>
	);
};

export default TablaVentasFinalizadas;
