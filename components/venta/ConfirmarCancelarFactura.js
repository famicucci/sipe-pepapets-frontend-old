import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalCentrado from '../generales/ModalCentrado';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Typography } from '@material-ui/core';
import BotonWarning from '../generales/botones/BotonWarning';

const useStyles = makeStyles((theme) => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	contenido: { fontSize: theme.typography.pxToRem(17) },
}));

const ConfirmarCancelarFactura = () => {
	const classes = useStyles();

	const {
		openModalConfirmarCancelarFactura,
		handleOpenModalConfirmarCancelarFactura,
		cancelInvoice,
	} = useContext(EditarOrdenesContext);

	return (
		<ModalCentrado
			openModal={openModalConfirmarCancelarFactura}
			handleClose={() => {
				handleOpenModalConfirmarCancelarFactura(false);
			}}
			padding={16}
			titulo="Aviso"
			footer={
				<BotonWarning
					type="button"
					contenido="Aceptar"
					className={classes.botonAceptar}
					onClick={() => {
						cancelInvoice();
					}}
				/>
			}
		>
			<Typography
				className={classes.contenido}
				variant="h5"
				align="center"
				variant="overline"
			>
				¿Desea realmente cancelar la factura?
			</Typography>
		</ModalCentrado>
	);
};

export default ConfirmarCancelarFactura;
