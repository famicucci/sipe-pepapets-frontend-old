import React, { useContext, useEffect } from 'react';
import TablaPrecios from '../components/precio/TablaPrecios';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import SpinnerPantalla from '../components/generales/SpinnerPantalla';
import { useRouter } from 'next/router';

const Precios = () => {
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
			<TablaPrecios />
		</Layout>
	);
};

export default Precios;
