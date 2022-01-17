import React, { useContext } from 'react';
import { List, Divider } from '@material-ui/core';
import Precios from './Precios';
import Ventas from './Ventas';
import Stock from './Stock';
import Clientes from './Clientes';
import Gastos from './Gastos';
import Reportes from './Reportes';
import authContext from '../../../context/autenticacion/authContext';

const Lista = () => {
	const { usuario } = useContext(authContext);

	return (
		<List component="nav">
			<Precios />

			<Stock />

			<Ventas />

			<Clientes />

			<Gastos />

			{usuario ? <>{usuario.rol ? <Reportes /> : null}</> : null}

			<Divider />
		</List>
	);
};

export default Lista;
