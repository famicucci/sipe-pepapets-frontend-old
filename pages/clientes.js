import React, { useContext, useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import SpinnerPantalla from '../components/generales/SpinnerPantalla';
import TablaClientes from '../components/cliente/TablaClientes';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ClienteContext from '../context/clientes/ClienteContext';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import BarraHerramientasContext from '../context/barraHerramientas/barraHerramientasContext';
import { useRouter } from 'next/router';

const Clientes = () => {
	const router = useRouter();
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;
	const { handleOpenFacsOrdsCliente } = useContext(ClienteContext);
	const { handleHerramientasClientes, busqueda } = useContext(
		BarraHerramientasContext
	);

	useEffect(() => {
		usuarioAutenticado();
		handleHerramientasClientes();
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		router.push('/login');
		return <SpinnerPantalla />;
	}

	// columnas de la tabla
	const columnas = [
		{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 230 },
		{ id: 2, nombre: 'Email', align: 'left', minWidth: 240 },
		{ id: 7, nombre: 'Celular', align: 'left', minWidth: 125 },
		{ id: 3, nombre: 'Razon Social', align: 'left', minWidth: 200 },
		{
			id: 4,
			nombre: 'Nombre Local / Obs.',
			align: 'left',
			minWidth: 150,
		},
		{ id: 5, nombre: 'Cond. IVA', align: 'left', minWidth: 180 },
		{ id: 6, nombre: 'Creación', align: 'center', minWidth: 110 },
		{ id: 8, nombre: 'Tipo', align: 'center', minWidth: 100 },
		{
			id: 9,
			nombre: 'Direcciones',
			align: 'left',
			minWidth: 60,
			boton: true,
			contenidoBoton: <RoomOutlinedIcon />,
			funcBoton: null,
		},
		{
			id: 10,
			nombre: 'Ver Más',
			align: 'left',
			minWidth: 60,
			boton: true,
			contenidoBoton: <AccountBalanceWalletIcon />,
			funcBoton: handleOpenFacsOrdsCliente,
		},
	];

	return (
		<Layout>
			<TablaClientes columnas={columnas} busqueda={busqueda} />
		</Layout>
	);
};

export default Clientes;
