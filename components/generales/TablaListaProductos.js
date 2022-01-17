import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import FilaListaProductos from './FilaListaProductos';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 300 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{ id: 4, nombre: 'Precio', align: 'center', minWidth: 100 },
	{ id: 5, nombre: 'Total', align: 'center', minWidth: 100 },
];

const TablaListaProductos = ({ productos }) => {
	const classes = useStyles();

	const [data, setData] = useState([]);

	useEffect(() => {
		const newData = {};
		productos.forEach((x) => {
			newData[x.ProductoCodigo] = newData[x.ProductoCodigo] ?? {
				...x,
				cantidad: 0,
			};
			newData[x.ProductoCodigo]['cantidad'] += x.cantidad;
		});

		setData(Object.values(newData));
	}, []);

	// extraer los id de las columnas
	const colIndex = columnas.reduce(
		(acc, el) => ({ ...acc, [el.nombre]: el }),
		{}
	);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{data.map((x, i) => (
						<FilaListaProductos key={i} fila={x} colIndex={colIndex} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaListaProductos;
