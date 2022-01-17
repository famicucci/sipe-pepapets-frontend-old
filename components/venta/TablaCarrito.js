import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FilaCarrito from './FilaCarrito';
import FilaCarrEnvio from './FilaCarrEnvio';
import VentasContext from '../../context/ventas/ventasContext';
import BodyVacio from '../generales/BodyVacio';

const columnas = [
	{ id: 'cantidad', label: 'Cant.', minWidth: 20, align: 'center' },
	{ id: 'producto', label: 'Producto', minWidth: 100 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50, align: 'center' },
	{ id: 'total', label: 'Total\u00a0($)', minWidth: 50, align: 'center' },
	{ id: 'acciones', label: '', minWidth: 20 },
];

const useStyles = makeStyles({
	tableContainer: {
		flex: 1,
		minHeight: 0,
	},
});

const TablaCarrito = () => {
	const classes = useStyles();

	const [arrayCart, setArrayCart] = useState([]);

	const { carrito } = useContext(VentasContext);

	useEffect(() => {
		showCart(carrito);
	}, [carrito]);

	const showCart = (cart) => {
		let products = {};

		cart.forEach((x) => {
			// check if code already exits in products
			products[x.ProductoCodigo] = products[x.ProductoCodigo] ?? {
				codigo: x.ProductoCodigo,
				descripcion: x['Producto.descripcion'],
				pu: x['Producto.Precios.pu'],
				cantidad: x.cantidad,
				ptosStockOrigen: [],
			};
			products[x.ProductoCodigo]['ptosStockOrigen'].push({
				PtoStockId: x.PtoStockId,
				ptoStockDescripcion: x['PtoStock.descripcion'],
				cantidad: x.cantidad,
			});
		});

		setArrayCart(Object.values(products));
	};

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
			<Table aria-label="sticky table">
				<TableHead>
					<TableRow>
						{columnas.map((columna) => (
							<TableCell
								key={columna.id}
								align={columna.align}
								style={{ minWidth: columna.minWidth }}
							>
								{columna.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{arrayCart.length !== 0 ? (
						<>
							{arrayCart.map((product, i) => (
								<FilaCarrito key={i} product={product} />
							))}
						</>
					) : (
						<BodyVacio
							content="Todavía no cargaste productos"
							columnas={columnas}
						/>
					)}
					<FilaCarrEnvio />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaCarrito;
