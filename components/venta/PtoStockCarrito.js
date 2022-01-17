import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles({
	input: {
		width: '40px',
	},
});

const PtoStockCarrito = (props) => {
	const classes = useStyles();

	const { handleCarrito, preciosPtoStock } = useContext(VentasContext);

	const [value, setValue] = useState(props.ptoStock.cantidad);

	useEffect(() => {
		setValue(props.ptoStock.cantidad);
	}, [props.ptoStock.cantidad]);

	const onChange = (e) => {
		let a = e.target.value;
		if (Number.isNaN(parseInt(a))) a = 0;
		setValue(a);
	};

	const onBlur = () => {
		const productMod = {
			ProductoCodigo: props.codigo,
			PtoStockId: props.ptoStock.PtoStockId,
			cantidad: value - props.ptoStock.cantidad,
		};

		handleCarrito(productMod);
	};

	const getProduct = (preciosPtoStock, ProductoCodigo, PtoStockId) => {
		const product = preciosPtoStock.find(
			(x) => x.ProductoCodigo === ProductoCodigo && x.PtoStockId === PtoStockId
		);
		return product;
	};

	const setMaxValue = () => {
		const product = getProduct(
			preciosPtoStock,
			props.codigo,
			props.ptoStock.PtoStockId
		);
		if (product) return product.cantidad + props.ptoStock.cantidad;
	};

	return (
		<TableRow>
			<TableCell align="left" style={{ width: 20 }}>
				<div>
					<TextField
						className={classes.input}
						type="number"
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						InputProps={{
							inputProps: {
								min: 0,
								max: setMaxValue(),
							},
						}}
					/>
				</div>
			</TableCell>
			<TableCell>{props.ptoStock.ptoStockDescripcion}</TableCell>
		</TableRow>
	);
};

export default PtoStockCarrito;
