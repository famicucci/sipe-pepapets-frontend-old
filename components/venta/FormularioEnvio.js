import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import AlertaContext from '../../context/alertas/alertaContext';
import { Direccion } from '../../functions/envio';
import Alerta from '../generales/Alerta';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
	boton: {
		width: '100%',
		height: '100%',
	},
}));

// label, ancho, valores, descripcionValores
const selectDirecc = {
	name: 'direccion',
	label: 'Dirección',
	ancho: 11,
	valDefault: 10,
};

const inputDirecc = {
	name: 'direccion',
	label: 'Dirección',
	placeholder: 'Dirección',
	ancho: 11,
	valDefault: 10,
};

const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
	valDefault: 1,
};

const inputCosto = {
	name: 'costo',
	label: 'Costo ($)',
	placeholder: 'Costo',
	ancho: 6,
};

const FormularioEnvio = (props) => {
	const classes = useStyles();
	const { facturasOrden, initialState, handleEnvio, tiposEnvio, cliente } =
		props;

	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const [stateEnvio, setStateEnvio] = useState(() =>
		Object.keys(initialState).length === 0
			? {
					modoDirecc: 'select',
					input: '',
					select: null,
					tipo: 1,
					costo: 0,
			  }
			: initialState
	);

	const handleSwitchDireccion = () => {
		if (stateEnvio.modoDirecc === 'select') {
			setStateEnvio({ ...stateEnvio, modoDirecc: 'input' });
		} else if (stateEnvio.modoDirecc === 'input') {
			setStateEnvio({ ...stateEnvio, modoDirecc: 'select' });
		}
		if (props.checkForChanges) props.checkForChanges(true);
	};

	const handleSelectDireccion = (name, val) => {
		const r = cliente.direcciones.find((x) => x.id === val);
		setStateEnvio({ ...stateEnvio, select: r });
		if (props.checkForChanges) props.checkForChanges(true);
	};

	const handleInputDireccion = (name, val) => {
		setStateEnvio({ ...stateEnvio, input: val });
		if (props.checkForChanges) props.checkForChanges(true);
	};

	const handleSelectTipo = (name, val) => {
		setStateEnvio({ ...stateEnvio, tipo: val });
		if (props.checkForChanges) props.checkForChanges(true);
	};

	const handleInputCosto = (name, val) => {
		setStateEnvio({ ...stateEnvio, costo: val });
		if (props.checkForChanges) props.checkForChanges(true);
	};

	const handleDisabledCostoEnvio = (facturasOrden) => {
		let estadoInput = false;
		if (facturasOrden) {
			if (facturasOrden.length > 0) {
				estadoInput = true;
			}
		}
		return estadoInput;
	};

	let valInitSelectDirection;
	if (!stateEnvio.select) {
		valInitSelectDirection = 'none';
	} else {
		valInitSelectDirection = stateEnvio.select.id;
	}

	const direccionClienteElegido = new Direccion(cliente.direcciones);

	const onSubmit = (e) => {
		e.preventDefault();

		// validar
		if (stateEnvio.tipo !== 1 && stateEnvio.costo === 0) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste un costo de envío',
				'warning'
			);
		}

		if (
			stateEnvio.modoDirecc === 'select' &&
			stateEnvio.tipo !== 1 &&
			!stateEnvio.select
		) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste una dirección de envío',
				'error'
			);
			return;
		}

		if (
			stateEnvio.modoDirecc === 'input' &&
			stateEnvio.tipo !== 1 &&
			stateEnvio.input === ''
		) {
			mostrarAlerta('Debes colocar una direccion de envío', 'warning');
		}

		if (stateEnvio.tipo === 1 && stateEnvio.costo !== 0) {
			mostrarAlerta(
				'Aviso: El Retiro en local no debería tener un costo de envío',
				'warning'
			);
		}

		if (stateEnvio.costo === '') {
			mostrarAlerta('Debes colocar un costo de envío', 'error');
			return;
		}

		// submit
		handleEnvio(stateEnvio);

		// cierro el modal
		if (props.handleClose) {
			props.handleClose();
		}
	};

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
			id="form-envio"
		>
			<Grid container spacing={2}>
				{stateEnvio.modoDirecc === 'select' ? (
					<SelectBordeInferior
						key={1}
						name={selectDirecc.name}
						label={selectDirecc.label}
						ancho={selectDirecc.ancho}
						data={direccionClienteElegido.creaDireccionesSelect()}
						initialvalue={valInitSelectDirection}
						tochangestate={handleSelectDireccion}
						placeholder="Elegir dirección.."
					/>
				) : (
					<InputBordeInferior
						label={inputDirecc.label}
						name={inputDirecc.name}
						placeholder={inputDirecc.placeholder}
						ancho={inputDirecc.ancho}
						initialvalue={stateEnvio.input}
						tochangestate={handleInputDireccion}
					/>
				)}

				<Grid item xs={1}>
					<Box
						className={classes.boton}
						display="flex"
						justifyContent="center"
						alignItems="flex-end"
					>
						<BotonFilaTabla
							contenido={<FlipCameraAndroidIcon />}
							onClick={() => {
								handleSwitchDireccion();
							}}
						/>
					</Box>
				</Grid>

				<SelectBordeInferior
					key={2}
					name={selectTipo.name}
					label={selectTipo.label}
					ancho={selectTipo.ancho}
					data={tiposEnvio}
					initialvalue={stateEnvio.tipo}
					tochangestate={handleSelectTipo}
					marginTop={2}
				/>
				<InputNumberBordeInferior
					name={inputCosto.name}
					label={inputCosto.label}
					placeholder={inputCosto.placeholder}
					ancho={inputCosto.ancho}
					initialvalue={stateEnvio.costo}
					tochangestate={handleInputCosto}
					disabled={handleDisabledCostoEnvio(facturasOrden)}
					styles={{ marginTop: 2 }}
				/>
				{alerta !== null ? <Alerta /> : null}
			</Grid>
		</form>
	);
};

export default FormularioEnvio;
