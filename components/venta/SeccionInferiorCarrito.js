import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TotalCarrito from './TotalCarrito';
import BotoneraCarrito from './BotoneraCarrito';
import NotaVenta from './NotaVenta';
import VerMasCarrito from './VerMasCarrito';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import ClienteCarr from './ClienteCarr';
import AgregarClienteCarr from '../venta/AgregarClienteCarr';
import AgregarEnvioCarr from './AgregarEnvioCarr';
import BotoneraModificarOrden from './BotoneraModificarOrden';
import { useRouter } from 'next/router';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(0.5),
		padding: theme.spacing(1.5),
	},
}));

const SeccionInferiorCarrito = () => {
	const classes = useStyles();
	const router = useRouter();

	const { getShippingTypes } = useContext(GlobalDataContext);
	const { openModalAgregarEnvioCarrito, openNota, openVerMas } =
		useContext(BotoneraCarrContext);

	useEffect(() => {
		getShippingTypes();
	}, []);

	return (
		<Paper className={classes.root} variant="elevation">
			<TotalCarrito />
			<ClienteCarr />
			<Divider variant="fullWidth" />
			{!router.query.id ? <BotoneraCarrito /> : <BotoneraModificarOrden />}
			{openNota || openVerMas ? <Divider variant="fullWidth" /> : null}
			<NotaVenta />
			<VerMasCarrito />
			<AgregarClienteCarr />
			{openModalAgregarEnvioCarrito ? <AgregarEnvioCarr /> : null}
		</Paper>
	);
};

export default SeccionInferiorCarrito;
