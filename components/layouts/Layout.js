import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import theme from '../../styles/temaConfig';
import { Hidden } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../context/autenticacion/authContext';
import PreciosState from '../../context/precios/preciosState';
import StockState from '../../context/stock/stockState';
import AlertaState from '../../context/alertas/alertaState';
import Navbar from './Navbar';
import Cajon from './Cajon';

const drawerWidth = 240;

const estilos = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(2),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
}));

const Layout = (props) => {
	const classes = estilos();

	const authContext = useContext(AuthContext);
	const { usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	// estado del menu
	const [abrir, setAbrir] = useState(true);

	const toggleMenu = () => {
		setAbrir(!abrir);
	};

	return (
		<>
			<Head>
				<title>Sip-e 2</title>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<AlertaState>
					<PreciosState>
						<StockState>
							<div className={classes.root}>
								<Navbar toggleMenu={toggleMenu} abrir={abrir} />
								<Hidden>
									<Cajon
										variant="persistent"
										open={abrir}
										onClose={() => {
											toggleMenu();
										}}
									/>
								</Hidden>
								<main
									className={clsx(classes.content, {
										[classes.contentShift]: abrir,
									})}
								>
									<div className={classes.drawerHeader} />
									<div>{props.children}</div>
								</main>
							</div>
						</StockState>
					</PreciosState>
				</AlertaState>
			</ThemeProvider>
		</>
	);
};

export default Layout;
