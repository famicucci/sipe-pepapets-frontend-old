import React, { useContext } from 'react';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClienteContext from '../../context/clientes/ClienteContext';

const BotonNuevoCliente = () => {
	const { handleOpenModalNuevoCliente } = useContext(ClienteContext);
	return (
		<BotonFilaTabla
			contenido={<PersonAddIcon />}
			onClick={() => {
				handleOpenModalNuevoCliente(true);
			}}
			style={{ color: '#fff' }}
		/>
	);
};

export default BotonNuevoCliente;
