import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaMovimientoStock from './FilaMovimientoStock';
import StockContext from '../../context/stock/stockContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import SpinnerTabla from '../generales/SpinnerTabla';
import { Box } from '@material-ui/core';
import Alerta2 from '../generales/Alerta2';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	spinner: { height: '86vh' },
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 480 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{ id: 4, nombre: 'Pto. Stock', align: 'center', minWidth: 110 },
	{ id: 5, nombre: 'Fecha', align: 'center', minWidth: 110 },
	{ id: 6, nombre: 'Usuario', align: 'center', minWidth: 100 },
	{ id: 7, nombre: 'Motivo', align: 'center', minWidth: 100 },
];

const TablaMovimientos = () => {
	const classes = useStyles();

	// context barra de herramientas
	const { busqueda, handleHerramientasMovimientosStock } = useContext(
		BarraHerramientasContext
	);

	// context stock
	const {
		filas,
		cargando,
		mensajeStock,
		traerMovimientosStock,
		handleFilasMovStock,
	} = useContext(StockContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		handleHerramientasMovimientosStock();
		traerMovimientosStock(busqueda);
	}, []);

	useEffect(() => {
		setPage(0);
		handleFilasMovStock(busqueda);
	}, [busqueda]);

	return (
		<TableContainer component={Paper}>
			{!cargando ? (
				<Table className={classes.table}>
					<HeadTabla columnas={columnas} />
					<TableBody>
						{cortePagina.map((fila) => (
							<FilaMovimientoStock key={fila.id} fila={fila} />
						))}
						{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
					</TableBody>
					<FooterTabla />
				</Table>
			) : (
				<Box className={classes.spinner}>
					<SpinnerTabla />
				</Box>
			)}
			{mensajeStock ? <Alerta2 mensaje={mensajeStock} /> : null}
		</TableContainer>
	);
};

export default TablaMovimientos;
