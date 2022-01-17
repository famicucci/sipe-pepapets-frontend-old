import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IconButton } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonAgregarCarrito = (props) => {
	const classes = useStyles();

	const { product } = props;

	const { handleCarrito } = useContext(VentasContext);

	const handleClick = () => {
		let productMod;
		if (!product.PtoStockId) {
			productMod = {
				cantidad: 1,
				['Producto.Precios.pu']: product['Producto.Precios.pu'],
				origen: 'Producción',
				ProductoCodigo: product.ProductoCodigo,
				PtoStockId: 0,
				['PtoStock.descripcion']: 'Producción',
				['Producto.descripcion']: product['Producto.descripcion'],
			};
		} else if (product.PtoStockId) {
			productMod = {
				cantidad: 1,
				['Producto.Precios.pu']: product['Producto.Precios.pu'],
				origen: 'Disponible',
				ProductoCodigo: product.ProductoCodigo,
				PtoStockId: product.PtoStockId,
				['PtoStock.descripcion']: product['PtoStock.descripcion'],
				['Producto.descripcion']: product['Producto.descripcion'],
			};
		}

		handleCarrito(productMod, 1);
	};

	return (
		<div className={classes.root}>
			<Badge
				color="default"
				badgeContent={props.product.cantidad}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				showZero
			>
				<IconButton size="small" color="secondary" onClick={handleClick}>
					<AddShoppingCartIcon fontSize="default" />
				</IconButton>
			</Badge>
		</div>
	);
};

export default BotonAgregarCarrito;
