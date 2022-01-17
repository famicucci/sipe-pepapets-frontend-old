import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaStockTotal from '../../components/stock/TablaStockTotal';
import IrLogin from '../../components/generales/IrLogin';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
import AuthContext from '../../context/autenticacion/authContext';
import { useRouter } from 'next/router';

const ConsultarStockTotal = () => {
	const router = useRouter();
	const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);

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
			<TablaStockTotal />
		</Layout>
	);
};

export default ConsultarStockTotal;
