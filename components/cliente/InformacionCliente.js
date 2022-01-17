import React, { useContext } from 'react';
import DatosCliente from './DatosCliente';
import ContactoCliente from './ContactoCliente';
import MasDatosCliente from './MasDatosCliente';
import DomicilioCliente from './DomicilioCliente';
import ModalScroll2 from '../generales/ModalScroll2';
import ClienteContext from '../../context/clientes/ClienteContext';

const InformacionCliente = (props) => {
	const {
		filaActiva,
		openModalInformacionCliente,
		handleCloseModal,
		handleFilaActiva,
	} = props;
	const {
		// filaActiva,
		// openModalInformacionCliente,
		handleOpenEditClient,
		handleOpenModalInformacionCliente,
		// handleFilaActiva,
	} = useContext(ClienteContext);

	const editClient = () => {
		handleOpenEditClient(true);
		handleOpenModalInformacionCliente(false);
	};

	const getActions = () => {
		if (props.edit) {
			return [
				{
					content: 'Editar',
					function: editClient,
				},
			];
		}
	};

	return (
		<ModalScroll2
			openModal={openModalInformacionCliente}
			handleClose={() => {
				handleCloseModal();
				// handleOpenModalInformacionCliente(false);
				handleFilaActiva(null);
			}}
			titulo="Cliente"
			anexoTitulo={`${filaActiva.nombre} ${filaActiva.apellido}`}
			morevertactions={getActions()}
			padding={2}
		>
			<DatosCliente cliente={filaActiva} />
			<ContactoCliente cliente={filaActiva} />
			<DomicilioCliente cliente={filaActiva} />
			<MasDatosCliente cliente={filaActiva} />
		</ModalScroll2>
	);
};

export default InformacionCliente;
