import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StockContext from '../../context/stock/stockContext';
import BotonConfirmarCancelar from '../generales/BotonConfirmarCancelar';
import InputCantidadStock from './InputCantidadStock';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaPuntoStock = (props) => {
	const { id, ProductoCodigo, cantidad } = props.fila;

	const { filaActivaProducto, handleFilaActiva, modificarStockPtoStock } =
		useContext(StockContext);

	const onClickEdit = () => {
		handleFilaActiva(props.fila);
	};

	return (
		<StyledTableRow>
			<TableCell>{ProductoCodigo}</TableCell>
			<TableCell align="left">{props.fila['Producto.descripcion']}</TableCell>
			<TableCell align="center">
				{filaActivaProducto.id !== id ? (
					<>{cantidad}</>
				) : (
					<InputCantidadStock cantidad={cantidad} />
				)}
			</TableCell>
			<TableCell align="center">
				{filaActivaProducto.id !== id ? (
					<IconButton size="small" edge="start" onClick={onClickEdit}>
						<EditIcon />
					</IconButton>
				) : (
					<BotonConfirmarCancelar confirmar={modificarStockPtoStock} />
				)}
			</TableCell>
		</StyledTableRow>
	);
};

export default FilaPuntoStock;
