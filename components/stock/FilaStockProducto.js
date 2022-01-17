import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CantidadStock from './CantidadStock';
import InputCantidadStock from './InputCantidadStock';
import StockContext from '../../context/stock/stockContext';
import BotonConfirmarCancelar from '../generales/BotonConfirmarCancelar';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
	ancho: {
		width: 140,
	},
});

const FilaStockProducto = ({ fila }) => {
	const classes = useStyles();

	const { filaActivaProducto, handleFilaActiva, modificarStock } =
		useContext(StockContext);

	const onClickEdit = () => {
		handleFilaActiva(fila);
	};

	return (
		<TableRow>
			<TableCell>{fila['PtoStock.descripcion']}</TableCell>

			<TableCell className={classes.ancho} align="right">
				{filaActivaProducto.id !== fila.id ? (
					<CantidadStock cantidad={fila.cantidad} />
				) : (
					<InputCantidadStock cantidad={fila.cantidad} />
				)}
			</TableCell>

			<TableCell className={classes.ancho} align="right">
				{filaActivaProducto.id !== fila.id ? (
					<IconButton size="small" edge="start" onClick={onClickEdit}>
						<EditIcon />
					</IconButton>
				) : (
					<BotonConfirmarCancelar confirmar={modificarStock} />
				)}
			</TableCell>
		</TableRow>
	);
};

export default FilaStockProducto;
