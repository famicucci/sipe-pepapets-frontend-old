import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaStockTotal from './FilaStockTotal';
import ModalStockProducto from './ModalStockProducto';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import Alerta from '../generales/Alerta';
import StockContext from '../../context/stock/stockContext';
import AlertaContext from '../../context/alertas/alertaContext';
import SpinnerTabla from '../generales/SpinnerTabla';
import { Box } from '@material-ui/core';
import useFilter from '../../hooks/useFilter';
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
	{ id: 4, nombre: '', align: 'center', minWidth: 60 },
];

const TablaStockTotal = () => {
	const classes = useStyles();

	const { busqueda, handleHerrStockTot } = useContext(BarraHerramientasContext);
	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);
	const { stocks, mensaje, mensajeStock, cargando, traerStocksPtoStock } =
		useContext(StockContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData);

	useEffect(() => {
		traerStocksPtoStock();
		handleHerrStockTot();
	}, []);

	useEffect(() => {
		let stockTotal = {};
		stocks.forEach((x) => {
			stockTotal[x.ProductoCodigo] = stockTotal[x.ProductoCodigo] ?? {
				ProductoCodigo: x.ProductoCodigo,
				descripcion: x['Producto.descripcion'],
				cantidad: 0,
			};
			stockTotal[x.ProductoCodigo]['cantidad'] += parseInt(x.cantidad);
		});

		setData(Object.values(stockTotal));
	}, [stocks]);

	useEffect(() => {
		if (mensaje) {
			const { msg, categoria } = mensaje;
			mostrarAlerta(msg, categoria);
		}
	}, [mensaje]);

	return (
		<TableContainer component={Paper}>
			{!cargando ? (
				<Table className={classes.table}>
					<HeadTabla columnas={columnas} />
					<TableBody>
						{cortePagina.map((fila) => (
							<FilaStockTotal key={fila.ProductoCodigo} fila={fila} />
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
			<ModalStockProducto />
			{alerta !== null ? <Alerta /> : null}
			{mensajeStock ? <Alerta2 mensaje={mensajeStock} /> : null}
		</TableContainer>
	);
};

export default TablaStockTotal;
