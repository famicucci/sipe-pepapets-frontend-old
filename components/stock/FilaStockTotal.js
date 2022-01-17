import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CallMadeIcon from '@material-ui/icons/CallMade';
import IconButton from '@material-ui/core/IconButton';
import StockContext from '../../context/stock/stockContext';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaStockTotal = (props) => {
	const { ProductoCodigo, cantidad, descripcion } = props.fila;

	// context stock
	const { handleProductoActivo, handleOpen } = useContext(StockContext);

	return (
		<StyledTableRow>
			<TableCell component="th" scope="row">
				{ProductoCodigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="center">{cantidad}</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => {
						handleProductoActivo(ProductoCodigo);
						handleOpen();
					}}
				>
					<CallMadeIcon />
				</IconButton>
			</TableCell>
		</StyledTableRow>
	);
};

export default FilaStockTotal;
