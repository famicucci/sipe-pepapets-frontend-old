import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: theme.spacing(2),
		fontSize: theme.typography.pxToRem(15),
	},
	negrita: {
		marginLeft: theme.spacing(1),
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightBold,
	},
}));

const EtiquetaModificarOrden = () => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Typography className={classes.root} variant="overline">
			Modificando Orden nº:
			<span className={classes.negrita}>
				{router.query.id ? router.query.id : null}
			</span>
		</Typography>
	);
};

export default EtiquetaModificarOrden;
