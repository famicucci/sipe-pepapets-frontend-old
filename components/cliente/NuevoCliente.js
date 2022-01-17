import React, { useContext } from 'react';
import FormCreateOrEditClient from '../cliente/FormCreateOrEditClient';
import ModalScroll2 from '../generales/ModalScroll2';
import ClienteContext from '../../context/clientes/ClienteContext';

const NuevoCliente = () => {
	const { openModalNuevoCliente, handleOpenModalNuevoCliente, crearCliente } =
		useContext(ClienteContext);

	const initialStateCliente = {
		nombre: '',
		apellido: '',
		instagram: '',
		facebook: '',
		celular: '',
		email: '',
		mascota: '',
		tipo: '',
		dni: '',
		razonSocial: '',
		codPostal: '',
		refDireccion: '',
		calle: '',
		numeroCalle: '',
		piso: '',
		depto: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: '',
		mascota: '',
		tipo: 'Minorista',
		condIva: 'Consumidor Final',
	};

	return (
		<ModalScroll2
			openModal={openModalNuevoCliente}
			handleClose={handleOpenModalNuevoCliente}
			titulo="Nuevo Cliente"
			padding={2}
		>
			<FormCreateOrEditClient
				type="create"
				handleClose={handleOpenModalNuevoCliente}
				crearCliente={crearCliente}
				initialStateCliente={initialStateCliente}
			/>
		</ModalScroll2>
	);
};

export default NuevoCliente;
