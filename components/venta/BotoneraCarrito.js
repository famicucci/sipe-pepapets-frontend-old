import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import { IconButton, Box } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BotonSuccess';
import BotonAccion from '../generales/BotonAccion';
import Alerta from '../generales/Alerta';
import {
	LocalShipping,
	PersonAdd,
	Note,
	NoteOutlined,
	ArrowDropUp,
	ArrowDropDown,
	ClearAll,
} from '@material-ui/icons';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const BotoneraCarrito = () => {
	const classes = useStyles();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const {
		carrito,
		envio,
		cliente,
		mensajeVentas,
		crearOrden,
		ordenCreada,
		handleEnvio,
		handleCliente,
		handleRemoveProductCart,
	} = useContext(VentasContext);
	const {
		openVerMas,
		openNota,
		handleVerMas,
		handleOpenNota,
		handleOpenCliente,
		handleOpenEnvio,
	} = useContext(BotoneraCarrContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	useEffect(() => {
		if (ordenCreada) {
			router.push({
				pathname: '/ventas/consultar',
			});
		}
	}, [ordenCreada]);

	useEffect(() => {
		if (mensajeVentas) setOpen(false);
	}, [mensajeVentas]);

	const onClickClean = () => {
		handleEnvio(null);
		handleCliente(null);
		carrito.forEach((x) => {
			handleRemoveProductCart(x.ProductoCodigo);
		});
	};

	const onClickSeeMore = () => {
		handleVerMas();
	};

	const onClickSetNote = () => {
		handleOpenNota();
	};

	const onClickSetClient = () => {
		handleOpenCliente();
	};

	const onClickSetShipping = () => {
		if (cliente) {
			handleOpenEnvio();
		} else {
			// alerta
			mostrarAlerta('Por favor, elegir primero un cliente', 'warning');
		}
	};

	const onClickConfirmarOrden = () => {
		if (!cliente) {
			mostrarAlerta('Debes cargar un cliente!', 'error');
			return;
		}

		if (carrito.length === 0) {
			mostrarAlerta('La orden no tiene productos cargados', 'error');
			return;
		}

		if (!envio) {
			mostrarAlerta('Configure el modo de entrega', 'error');
			return;
		}

		setOpen(true);
		crearOrden();
	};

	return (
		<Box display="flex" bgcolor="background.paper">
			<Box display="flex" flexGrow={1}>
				<IconButton onClick={onClickClean}>
					<ClearAll color="error" />
				</IconButton>
			</Box>
			<Box>
				<IconButton size="medium" onClick={onClickSeeMore}>
					{!openVerMas ? <ArrowDropDown /> : <ArrowDropUp />}
				</IconButton>
				<IconButton onClick={onClickSetNote}>
					{!openNota ? <NoteOutlined /> : <Note />}
				</IconButton>
				<BotonAccion onClick={onClickSetClient}>
					<PersonAdd />
				</BotonAccion>
				<BotonAccion onClick={onClickSetShipping}>
					<LocalShipping />
				</BotonAccion>
				<BotonSuccess
					type="button"
					contenido="Confirmar Orden"
					onClick={onClickConfirmarOrden}
				/>
			</Box>
			{alerta !== null ? <Alerta /> : null}
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color="primary" />
			</Backdrop>
		</Box>
	);
};

export default BotoneraCarrito;
