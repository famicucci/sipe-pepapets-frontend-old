import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
import CreateOrEditOrder from '../../components/venta/CreateOrEditOrder';
import { useRouter } from 'next/router';
import VentasContext from '../../context/ventas/ventasContext';

const Nuevo = () => {
	const router = useRouter();

	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;
	const { cancelOrderToModify } = useContext(VentasContext);

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	useEffect(() => {
		if (autenticado && cargando) {
			const handleRouteChange = (url, { shallow }) => {
				if (url !== '/ventas/consultar') cancelOrderToModify();
			};
			router.events.on('routeChangeStart', handleRouteChange);
			return () => {
				router.events.off('routeChangeStart', handleRouteChange);
			};
		}
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
