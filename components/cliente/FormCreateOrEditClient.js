import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DataCreateOrEditClient from './DataCreateOrEditClient';
import ContactCreateOrEditClient from './ContactCreateOrEditClient';
import AdressCreateOrEditClient from './AdressCreateOrEditClient';
import MoreDataCreateOrEditClient from './MoreDataCreateOrEditClient';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import BotonSuccess from '../generales/botones/BotonSuccess';
import AlertaContext from '../../context/alertas/alertaContext';
import ClienteContext from '../../context/clientes/ClienteContext';

const useStyles = makeStyles((theme) => ({
	divider: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1) },
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const FormCreateOrEditClient = (props) => {
	const classes = useStyles();

	const { crearCliente, editClient } = useContext(ClienteContext);

	const [cliente, setCliente] = useState(props.initialStateCliente);

	const { mostrarAlerta } = useContext(AlertaContext);

	const onChangeAtributo = (name, value) => {
		setCliente({ ...cliente, [name]: value });
	};

	const deleteAdress = (adressId) => {
		const r = cliente.direcciones.filter((x) => x.id !== adressId);
		setCliente({ ...cliente, direcciones: r });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const { nombre, apellido, email, tipo, condIva } = cliente;
		if (nombre === '' || apellido === '') {
			mostrarAlerta('El nombre y el apellido son obligatorios', 'error');
			return;
		}

		if (email === '') {
			mostrarAlerta('La dirección de email es obligatoria', 'error');
			return;
		}

		if (tipo === '') {
			mostrarAlerta('El tipo de cliente es obligatorio', 'error');
			return;
		}

		if (condIva === '') {
			mostrarAlerta('La condición frente al IVA es obligatorio', 'error');
			return;
		}

		// I send customer data and adress
		const client = {
			nombre: cliente.nombre,
			apellido: cliente.apellido,
			instagram: cliente.instagram,
			facebook: cliente.facebook,
			celular: cliente.celular,
			email: cliente.email,
			mascota: cliente.mascota,
			tipo: cliente.tipo,
			dni: cliente.dni,
			razonSocial: cliente.razonSocial,
			observaciones: cliente.observaciones,
			mascota: cliente.mascota,
			tipo: cliente.tipo,
			condIva: cliente.condIva,
		};

		let adress = {
			codPostal: cliente.codPostal,
			refDireccion: cliente.refDireccion,
			calle: cliente.calle,
			numeroCalle: cliente.numeroCalle,
			piso: cliente.piso,
			depto: cliente.depto,
			barrio: cliente.barrio,
			ciudad: cliente.ciudad,
			provincia: cliente.provincia,
		};

		let checkValuesAdress = Object.values(adress).every((x) => x === '');
		if (checkValuesAdress) {
			adress = null;
		} else if (
			!checkValuesAdress &&
			(adress.calle === '' || adress.numeroCalle === '' || adress.barrio === '')
		) {
			mostrarAlerta(
				'Si quieres agregar una dirección, debes completar al menos calle, numero y barrio',
				'error'
			);
			return;
		}

		if (props.type === 'create') crearCliente(client, adress);
		else if (props.type === 'edit')
			editClient(client, adress, cliente.clientId, cliente.direcciones);

		if (props.handleClose) props.handleClose();
	};

	return (
		<form noValidate onSubmit={onSubmit}>
			<div className={classes.root}>
				<DataCreateOrEditClient
					cliente={cliente}
					onChangeAtributo={onChangeAtributo}
				/>
				<ContactCreateOrEditClient
					cliente={cliente}
					onChangeAtributo={onChangeAtributo}
				/>
				<AdressCreateOrEditClient
					type={props.type}
					cliente={cliente}
					deleteAdress={deleteAdress}
					onChangeAtributo={onChangeAtributo}
				/>
				<MoreDataCreateOrEditClient
					cliente={cliente}
					onChangeAtributo={onChangeAtributo}
				/>
			</div>
			<Divider className={classes.divider} variant="middle" />
			<Box className={classes.footer}>
				<BotonSuccess
					type="submit"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			</Box>
		</form>
	);
};

export default FormCreateOrEditClient;
