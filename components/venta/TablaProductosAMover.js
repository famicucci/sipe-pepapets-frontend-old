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
import useFilter from '../../hooks/useFilter';
import clienteAxios from '../../config/axios';
import FilaProductosAMover from './FilaProductosAMover';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
	spinner: { height: '86vh' },
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 60 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 110 },
	{ id: 7, nombre: 'Cantidad', align: 'center', minWidth: 110 },
	{ id: 3, nombre: 'Desde', align: 'center', minWidth: 80 },
	{ id: 4, nombre: 'Hasta', align: 'center', minWidth: 100 },
];

const TablaProductosAMover = () => {
	const classes = useStyles();

	const { busqueda, handleHerrProductosAMover } = useContext(
		BarraHerramientasContext
	);

	const [cargando, setCargando] = useState(true);
	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 25);

	useEffect(async () => {
		const r = await clienteAxios.get('/api/productos/a-mover/');

		showProducts(r.data);
		setCargando(false);
		handleHerrProductosAMover(true);
	}, []);

	const showProducts = (data) => {
		let products = {};

		data.forEach((x) => {
			products[x.ProductoCodigo] = products[x.ProductoCodigo] ?? {
				ProductoCodigo: x.ProductoCodigo,
				descripcion: x.descripcion,
				cantidad: 0,
				Pto_Stock_Producto_Descripcion: x.Pto_Stock_Producto_Descripcion,
				Pto_Stock_Pto_Venta_Descripcion: x.Pto_Stock_Pto_Venta_Descripcion,
			};
			products[x.ProductoCodigo]['cantidad'] += x.cantidad;
		});

		setData(Object.values(products));
	};

	return (
		<TableContainer component={Paper}>
			{!cargando ? (
				<Table className={classes.table}>
					<HeadTabla columnas={columnas} />
					<TableBody>
						{cortePagina.map((x) => (
							<FilaProductosAMover key={x.ProductoCodigo} fila={x} />
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
		</TableContainer>
	);
};

export default TablaProductosAMover;
