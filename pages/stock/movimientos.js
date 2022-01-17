import React, { useContext, useEffect } from 'react';
import TablaMovimientos from '../../components/stock/TablaMovimientos';
import AuthContext from '../../context/autenticacion/authContext';
import Layout from '../../components/layouts/Layout';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
import { useRouter } from 'next/router';

const MovimientoStock = () => {
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
			<TablaMovimientos />
		</Layout>
	);
};

export default MovimientoStock;
