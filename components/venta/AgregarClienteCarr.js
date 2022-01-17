import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import FormCreateOrEditClient from '../cliente/FormCreateOrEditClient';
import TablaClientes from '../cliente/TablaClientes';
import BuscadorPapper from '../generales/BuscadorPapper';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import VentasContext from '../../context/ventas/ventasContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import AddIcon from '@material-ui/icons/Add';
import ModalScroll from '../generales/ModalScroll';
import ClienteContext from '../../context/clientes/ClienteContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		borderRadius: '10px',
	},
	appbar: { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
}));

const AgregarClienteCarr = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const { busquedaCliente, handleBusquedaCliente } = useContext(
		BarraHerramientasContext
	);
	const { handleCliente } = useContext(VentasContext);
	const { crearCliente, newClient } = useContext(ClienteContext);
	const { handleClose, openModalCliente } = useContext(BotoneraCarrContext);

	useEffect(() => {
		if (newClient) handleCliente(newClient);
		handleClose();
	}, [newClient]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const funcBoton = (x) => {
		handleCliente(x);
		handleClose();
	};

	// columnas de la tabla
	const columnas = [
		{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 290 },
		{ id: 2, nombre: 'Email', align: 'left', minWidth: 220 },
		{
			id: 10,
			nombre: 'Agregar',
			align: 'center',
			minWidth: 60,
			boton: true,
			contenidoBoton: <AddIcon />,
			funcBoton: funcBoton,
		},
	];

	const initialStateCliente = {
		clientId: '',
		nombre: '',
		apellido: '',
		instagram: '',
		facebook: '',
		celular: '',
		email: '',
		mascota: '',
		tipo: '',
		dni: '',
		razonSocial: '',
		codPostal: '',
		refDireccion: '',
		calle: '',
		numeroCalle: '',
		piso: '',
		depto: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: '',
		mascota: '',
		tipo: 'Minorista',
		condIva: 'Consumidor Final',
		direcciones: '',
	};

	return (
		<ModalScroll
			openModal={openModalCliente}
			handleClose={handleClose}
			paddingBottom={2}
		>
			<div className={classes.root}>
				<AppBar position="static" className={classes.appbar}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
					>
						<Tab label="Nuevo Cliente" {...a11yProps(0)} />
						<Tab label="Existente" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<FormCreateOrEditClient
						type="create"
						crearCliente={crearCliente}
						initialStateCliente={initialStateCliente}
					/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<BuscadorPapper
						estilos={{ marginBottom: '8px' }}
						busqueda={busquedaCliente}
						handleBusqueda={handleBusquedaCliente}
					/>
					<TablaClientes columnas={columnas} busqueda={busquedaCliente} />
				</TabPanel>
			</div>
		</ModalScroll>
	);
};

export default AgregarClienteCarr;

// funciones para los tabs
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
