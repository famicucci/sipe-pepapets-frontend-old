import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaMovimientoStock = (props) => {
	const { ProductoCodigo, cantidad, motivo } = props.fila;

	const descripcion = props.fila['Producto.descripcion'];
	const ptoStock = props.fila['PtoStock.descripcion'];
	const fecha = moment(props.fila.createdAt).format('DD-MM-YYYY hh:mm');
	const usuario = props.fila['Usuario.usuario'];

	return (
		<StyledTableRow>
			<TableCell component="th" scope="row">
				{ProductoCodigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="center">{cantidad}</TableCell>
			<TableCell align="center">{ptoStock}</TableCell>
			<TableCell align="center">{fecha}</TableCell>
			<TableCell align="center">{usuario}</TableCell>
			<TableCell align="center">{motivo}</TableCell>
		</StyledTableRow>
	);
};

export default FilaMovimientoStock;
