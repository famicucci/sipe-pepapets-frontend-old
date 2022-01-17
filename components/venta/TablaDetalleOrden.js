import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import FilaDetalleOrden from './FilaDetalleOrden';

const useStyles = makeStyles({
	root: { width: '100%' },
	table: {
		minWidth: 600,
	},
});

const TablaDetalleOrden = ({ productos, columnas }) => {
	const classes = useStyles();

	const [data, setData] = useState([]);

	useEffect(() => {
		showCart(productos);
	}, [productos]);

	const showCart = (elements) => {
		let products = {};

		elements.forEach((x) => {
			products[x.ProductoCodigo] = products[x.ProductoCodigo] ?? {
				ProductoCodigo: x.ProductoCodigo,
				descripcion: x.Producto.descripcion,
				cantidad: 0,
				ptosStockOrigen: [],
			};
			products[x.ProductoCodigo]['cantidad'] += x.cantidad;
			products[x.ProductoCodigo]['ptosStockOrigen'].push({
				PtoStockId: x.PtoStock ? x.PtoStock.id : 0,
				ptoStockDescripcion: x.PtoStock ? x.PtoStock.descripcion : 'Producción',
				cantidad: x.cantidad,
			});
		});

		setData(Object.values(products));
	};

	return (
		<TableContainer className={classes.root} component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{data.map((x, i) => (
						<FilaDetalleOrden key={i} fila={x} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaDetalleOrden;
