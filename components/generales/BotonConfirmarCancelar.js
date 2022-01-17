import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import StockContext from '../../context/stock/stockContext';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
	buttonconfirm: {
		color: '#8bc34a',
	},
});

const BotonConfirmarCancelar = (props) => {
	const classes = useStyles();
	const { confirmar } = props;

	const { filaActivaProducto, handleFilaActiva } = useContext(StockContext);

	const onClickConfirm = () => {
		confirmar(filaActivaProducto);
	};

	const onClickClose = () => {
		handleFilaActiva({});
	};

	return (
		<Box>
			<IconButton onClick={onClickConfirm}>
				<CheckIcon className={classes.buttonconfirm} />
			</IconButton>
			<IconButton onClick={onClickClose}>
				<CloseIcon color="error" />
			</IconButton>
		</Box>
	);
};

export default BotonConfirmarCancelar;
