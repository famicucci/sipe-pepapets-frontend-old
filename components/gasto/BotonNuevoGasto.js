import React, { useContext } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';
import GastoContext from '../../context/gasto/GastoContext';

const BotonNuevoGasto = () => {
	const { handleOpenModalCreateExpense } = useContext(GastoContext);

	const onClick = () => {
		handleOpenModalCreateExpense(true);
	};

	return (
		<IconButton
			size="small"
			edge="start"
			onClick={onClick}
			style={{ color: '#fff', marginRight: '8px' }}
		>
			<AddCircleIcon />
		</IconButton>
	);
};

export default BotonNuevoGasto;
