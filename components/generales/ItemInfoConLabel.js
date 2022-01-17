import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	caja: {
		Width: '100%',
	},
	label: {
		marginBottom: theme.spacing(0),
		marginTop: theme.spacing(0),
		fontSize: theme.typography.pxToRem(12),
	},
	texto: { marginTop: theme.spacing(0), marginBottom: theme.spacing(1) },
}));

const ItemInfoConLabel = ({ label, contenido, ancho }) => {
	const classes = useStyles();

	if (contenido === '' || contenido === null || !contenido) contenido = '-';

	return (
		<Grid item xs={ancho}>
			<Box className={classes.caja}>
				<p className={classes.label}>{label}</p>
				<p className={classes.texto}>{contenido}</p>
			</Box>
		</Grid>
	);
};

export default ItemInfoConLabel;
