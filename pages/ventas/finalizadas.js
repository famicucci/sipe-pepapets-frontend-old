import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
import TablaVentasFinalizadas from '../../components/venta/TablaVentasFinalizadas';
import { useRouter } from 'next/router';

const Finalizadas = () => {
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
			<TablaVentasFinalizadas />
		</Layout>
	);
};

export default Finalizadas;
