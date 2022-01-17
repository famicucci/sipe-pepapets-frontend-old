import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LectorElegirProducto from './LectorElegirProducto';
import ManualElegirProducto from './ManualElegirProducto';
import VentasContext from '../../context/ventas/ventasContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
}));

const ElegirProductos = () => {
	const classes = useStyles();

	const { modo } = useContext(VentasContext);

	return (
		<Paper className={classes.paper} variant="outlined">
			{modo === 'manual' ? <ManualElegirProducto /> : <LectorElegirProducto />}
		</Paper>
	);
};

export default ElegirProductos;
