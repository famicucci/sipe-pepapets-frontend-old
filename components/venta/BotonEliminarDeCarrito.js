import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonEliminarDeCarrito = (props) => {
	const classes = useStyles();

	const { code } = props;

	const { handleRemoveProductCart } = useContext(VentasContext);

	return (
		<div className={classes.root}>
			<IconButton
				size="small"
				onClick={() => {
					handleRemoveProductCart(code);
				}}
			>
				<ClearIcon fontSize="default" color="error" fontSize="small" />
			</IconButton>
		</div>
	);
};

export default BotonEliminarDeCarrito;
