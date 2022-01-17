import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotonSuccess from '../generales/botones/BotonSuccess';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import FormularioEnvio from './FormularioEnvio';
import ModalCentrado from '../generales/ModalCentrado';
import VentasContext from '../../context/ventas/ventasContext';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles(() => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
}));

const AgregarEnvioCarr = () => {
	const classes = useStyles();

	const { shippingTypes } = useContext(GlobalDataContext);
	const { openModalAgregarEnvioCarrito, handleClose } =
		useContext(BotoneraCarrContext);
	const { envio, cliente, handleEnvio } = useContext(VentasContext);

	const getInitialEnvio = (envio) => {
		if (!envio)
			return {
				modoDirecc: 'select',
				input: '',
				select: null,
				tipo: 1,
				costo: 0,
			};
		else return envio;
	};

	return (
		<ModalCentrado
			titulo="Envío"
			padding={16}
			openModal={openModalAgregarEnvioCarrito}
			handleClose={handleClose}
			footer={
				<BotonSuccess
					type="submit"
					form="form-envio"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			}
		>
			<FormularioEnvio
				initialState={getInitialEnvio(envio)}
				handleEnvio={handleEnvio}
				tiposEnvio={shippingTypes}
				cliente={cliente}
				handleClose={handleClose}
			/>
		</ModalCentrado>
	);
};

export default AgregarEnvioCarr;
