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

const ConfirmarCrearFactura = () => {
	const classes = useStyles();

	const {
		openModalConfirmarCrearFactura,
		handleCloseModalConfirmarCrearFactura,
	} = useContext(EditarOrdenesContext);

	return (
		<ModalCentrado
			openModal={openModalConfirmarCrearFactura}
			handleClose={handleCloseModalConfirmarCrearFactura}
			padding={16}
			titulo="Aviso"
			footer={
				<BotonWarning
					type="submit"
					form="form-crear-factura"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			}
		>
			<Typography
				className={classes.contenido}
				variant="h5"
				align="center"
				variant="overline"
			>
				¿Desea realmente facturar la orden?
			</Typography>
		</ModalCentrado>
	);
};

export default ConfirmarCrearFactura;
