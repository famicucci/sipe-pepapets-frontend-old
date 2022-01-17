import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
import CreateOrEditOrder from '../../components/venta/CreateOrEditOrder';
import { useRouter } from 'next/router';

const Nuevo = () => {
	const router = useRouter();
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		router.push('/login');
		return <SpinnerPantalla />;
	}

	return (
		<Layout>
			<CreateOrEditOrder />
		</Layout>
	);
};

export default Nuevo;
