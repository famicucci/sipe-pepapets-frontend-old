import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaCliente from './FilaCliente';
import SpinnerTabla from '../generales/SpinnerTabla';
import ClienteContext from '../../context/clientes/ClienteContext';
import FacsOrdsCliente from '../cliente/FacsOrdsCliente';
import InformacionCliente from './InformacionCliente';
import NuevoCliente from './NuevoCliente';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../generales/Alerta';
import Alerta2 from '../generales/Alerta2';
import useFilter from '../../hooks/useFilter';
import EditarCliente from './EditarCliente';
import moment from 'moment';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
	spinner: { height: '86vh' },
});

const TablaClientes = (props) => {
	const classes = useStyles();
	const { columnas } = props;

	// create a state for this table
	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, props.busqueda);

	const { alerta } = useContext(AlertaContext);
	const {
		clientes,
		openModalInformacionCliente,
		openEditClient,
		openModalNuevoCliente,
		openInfoCliente,
		mensajeClientes,
		cargando,
		traerClientes,
		filaActiva,
		handleOpenModalInformacionCliente,
		handleFilaActiva,
	} = useContext(ClienteContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 10);

	useEffect(() => {
		traerClientes();
	}, []);

	useEffect(() => {
		const newData = clientes.map((x) => ({
			...x,
			createdAt: moment(x.createdAt).format('DD-MM-YYYY'),
		}));
		setData(newData);
	}, [clientes]);

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
							<FilaCliente key={x.id} fila={x} colIndex={colIndex} />
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

			{openModalInformacionCliente ? (
				<InformacionCliente
					filaActiva={filaActiva}
					edit={true}
					openModalInformacionCliente={openModalInformacionCliente}
					handleCloseModal={() => {
						handleOpenModalInformacionCliente(false);
					}}
					handleFilaActiva={handleFilaActiva}
				/>
			) : null}
			{openEditClient ? <EditarCliente /> : null}
			{openInfoCliente ? <FacsOrdsCliente /> : null}
			{openModalNuevoCliente ? <NuevoCliente /> : null}
			{alerta !== null ? <Alerta /> : null}
			{mensajeClientes ? <Alerta2 mensaje={mensajeClientes} /> : null}
		</TableContainer>
	);
};

export default TablaClientes;
