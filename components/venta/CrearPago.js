import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalCentrado from '../generales/ModalCentrado';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Grid } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BotonSuccess';
import InputFecha from '../generales/inputs/InputFecha';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import AlertaContext from '../../context/alertas/alertaContext';
import moment from 'moment';
import { FacturaBD } from '../../functions/Factura';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const selectMetodoPago = {
	name: 'metodopago',
	label: 'Metodo de Pago',
	ancho: 12,
	valDefault: 1,
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	contenido: { fontSize: theme.typography.pxToRem(17) },
}));

const CrearPago = () => {
	const classes = useStyles();

	const { paymentMethods, getPaymentMethods } = useContext(GlobalDataContext);
	const {
		filaActiva,
		openModalCrearPago,
		handleCloseModalCrearPago,
		crearPago,
	} = useContext(EditarOrdenesContext);
	const { mostrarAlerta } = useContext(AlertaContext);

	const factura = new FacturaBD(filaActiva.Factura);

	const [pago, setPago] = useState({
		createdAt: moment(new Date()).toISOString(),
		importe: factura.importeFinal - factura.sumaPagos(),
		MetodoPagoId: '',
		FacturaId: factura.id,
		estado: 'v',
		tipo: 'i',
	});

	useEffect(() => {
		if (!paymentMethods) {
			getPaymentMethods();
		}
	}, []);

	const handleFecha = (date) => {
		setPago({ ...pago, createdAt: moment(date).toISOString() });
	};

	const handleImporte = (name, value) => {
		setPago({ ...pago, importe: value });
	};

	const handleMetodoPago = (name, value) => {
		setPago({ ...pago, MetodoPagoId: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validacion
		if (pago.MetodoPagoId === '') {
			mostrarAlerta('Debes ingresar un metodo de pago', 'error');
			return;
		}

		if (pago.importe === '') {
			mostrarAlerta('Debes ingresar un importe', 'error');
			return;
		}

		if (pago.importe > factura.importeFinal - factura.sumaPagos()) {
			mostrarAlerta(
				'El importe ingresado es mayor a lo que queda por pagar',
				'error'
			);
			return;
		}

		if (pago.importe < 0) {
			mostrarAlerta('El importe no puede ser negativo', 'error');
			return;
		}

		// submit
		crearPago(pago);

		handleCloseModalCrearPago();
	};

	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
			id="form-crear-pago"
		>
			<ModalCentrado
				openModal={openModalCrearPago}
				handleClose={handleCloseModalCrearPago}
				padding={16}
				width={300}
				titulo="Crear Pago"
				footer={
					<BotonSuccess
						type="submit"
						form="form-crear-pago"
						contenido="Aceptar"
						className={classes.botonAceptar}
					/>
				}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<InputFecha tochangestate={handleFecha} />
					</Grid>
					<InputNumberBordeInferior
						label="Importe"
						name="importe"
						placeholder="Agrega un importe..."
						ancho={12}
						required
						initialvalue={factura.importeFinal - factura.sumaPagos()} // lo que queda por pagar
						tochangestate={handleImporte}
						InputProps={{
							inputProps: {
								max: factura.importeFinal - factura.sumaPagos(),
							},
						}}
						styles={{ marginTop: 2 }}
					/>
					<SelectBordeInferior
						key={2}
						name={selectMetodoPago.name}
						label={selectMetodoPago.label}
						ancho={selectMetodoPago.ancho}
						data={paymentMethods}
						initialvalue="none"
						placeholder="Metodo de Pago..."
						tochangestate={handleMetodoPago}
					/>
				</Grid>
			</ModalCentrado>
		</form>
	);
};

export default CrearPago;
