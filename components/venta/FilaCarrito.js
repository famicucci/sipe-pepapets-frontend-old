import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMas from '../generales/BotonVerMas';
import BotonEliminarDeCarrito from './BotonEliminarDeCarrito';
import CollapseTablaCarrito from './CollapseTablaCarrito';
import PrecioEditableCarrito from './PrecioEditableCarrito';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
	description: { wordWrap: 'break-word', maxWidth: '250px' },
});

const FilaCarrito = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const { codigo, descripcion, pu, ptosStockOrigen } = props.product;

	const sumTotalQty = (ptosStockOrigen) => {
		let r = 0;
		ptosStockOrigen.forEach((x) => {
			r += x.cantidad;
		});
		return r;
	};

	const sumTotalPrice = () => {
		const qty = sumTotalQty(ptosStockOrigen);
		const r = pu * qty;
		return r;
	};

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">{sumTotalQty(ptosStockOrigen)}</TableCell>
				<TableCell className={classes.description}>
					<p className={classes.negrita}>{codigo}</p>
					<p>{descripcion}</p>
				</TableCell>
				<TableCell align="center">
					<PrecioEditableCarrito codigo={codigo} precio={pu} />
				</TableCell>
				<TableCell align="center">
					{parseFloat(sumTotalPrice()).toFixed(2)}
				</TableCell>
				<TableCell align="center">
					<BotonEliminarDeCarrito code={codigo} />
					<BotonVerMas setOpen={setOpen} open={open} margin={1} />
				</TableCell>
			</TableRow>
			<CollapseTablaCarrito open={open} product={props.product} />
		</>
	);
};

export default FilaCarrito;
