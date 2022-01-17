import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLector from './InputLector';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles(() => ({
	item: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const LectorElegirProducto = () => {
	const classes = useStyles();

	const { preciosPtoStock, ptoStock, listaPrecio } = useContext(VentasContext);

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			style={{ height: '100%' }}
			spacing={1}
		>
			<Grid item>
				<Box className={classes.item}>
					<CropFreeIcon fontSize="large" />
				</Box>
			</Grid>
			<Grid item>
				<Box className={classes.item}>
					{preciosPtoStock.lenght !== 0 ? <InputLector /> : null}
				</Box>
			</Grid>
			<Grid item>
				<Box className={classes.item}>
					<Typography align="center">
						Esperando código de producto...
					</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Box className={classes.item}>
					<Typography align="center">{ptoStock.descripcion}</Typography>
					<Typography align="center">{listaPrecio.descripcion}</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default LectorElegirProducto;
