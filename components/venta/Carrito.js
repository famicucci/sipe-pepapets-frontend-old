import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablaCarrito from './TablaCarrito';
import SeccionInferiorCarrito from './SeccionInferiorCarrito';
import BotoneraCarrProvider from '../../context/BotoneraCarrContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
}));

const Carrito = () => {
	const classes = useStyles();

	return (
		<BotoneraCarrProvider>
			<Paper className={classes.paper} variant="outlined">
				<div className={classes.container}>
					<TablaCarrito />
					<SeccionInferiorCarrito />
				</div>
			</Paper>
		</BotoneraCarrProvider>
	);
};

export default Carrito;
