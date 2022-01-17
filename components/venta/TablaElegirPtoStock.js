import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BotonAgregarCarrito from './BotonAgregarCarrito';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles({
	description: {
		minWidth: 170,
	},
	button: { width: 70 },
});

const TablaElegirPtoStock = (props) => {
	const classes = useStyles();
	const { codigo } = props;
	const { preciosPtoStock, listaPrecio } = useContext(VentasContext);

	const productByStockPoint = () => {
		const r = preciosPtoStock.filter(
			(x) =>
				x.ProductoCodigo === codigo &&
				x['Producto.Precios.ListaPrecioId'] === listaPrecio &&
				x.cantidad !== 0
		);
		return r;
	};

	return (
		<Table>
			<TableBody>
				{productByStockPoint().map((x) => (
					<TableRow>
						<TableCell className={classes.description}>
							{x['PtoStock.descripcion']}
						</TableCell>

						<TableCell className={classes.button}>
							<BotonAgregarCarrito product={x} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TablaElegirPtoStock;
