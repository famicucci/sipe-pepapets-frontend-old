import React, { useContext } from 'react';
import FormCreateOrEditClient from '../cliente/FormCreateOrEditClient';
import ModalScroll2 from '../generales/ModalScroll2';
import ClienteContext from '../../context/clientes/ClienteContext';

const EditarCliente = () => {
	const { filaActiva, openEditClient, handleOpenEditClient, editClient } =
		useContext(ClienteContext);

	const initialStateCliente = {
		clientId: filaActiva.id,
		nombre: filaActiva.nombre,
		apellido: filaActiva.apellido,
		instagram: filaActiva.instagram,
		facebook: filaActiva.facebook,
		celular: filaActiva.celular,
		email: filaActiva.email,
		mascota: filaActiva.mascota,
		tipo: filaActiva.tipo,
		dni: filaActiva.dni,
		razonSocial: filaActiva.razonSocial,
		codPostal: '',
		refDireccion: '',
		calle: '',
		numeroCalle: '',
		piso: '',
		depto: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: filaActiva.observaciones,
		mascota: filaActiva.mascota,
		tipo: filaActiva.tipo,
		condIva: filaActiva.condIva,
		direcciones: filaActiva.direcciones,
	};

	return (
		<ModalScroll2
			openModal={openEditClient}
			handleClose={handleOpenEditClient}
			titulo="Editar Cliente"
			anexoTitulo={`${filaActiva.nombre} ${filaActiva.apellido}`}
			padding={2}
		>
			<FormCreateOrEditClient
				type="edit"
				handleClose={handleOpenEditClient}
				crearCliente={editClient}
				initialStateCliente={initialStateCliente}
			/>
		</ModalScroll2>
	);
};

export default EditarCliente;
