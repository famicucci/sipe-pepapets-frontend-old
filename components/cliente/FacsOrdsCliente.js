import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ClienteContext from '../../context/clientes/ClienteContext';
import ModalScroll from '../generales/ModalScroll';
import TablaMostrarOrdenes from '../venta/TablaMostrarOrdenes';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import TablaMostrarFacturas from '../venta/TablaMostrarFacturas';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		borderRadius: '10px',
	},
	appbar: { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
}));

const FacsOrdsCliente = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const {
		openInfoCliente,
		handleClose,
		ordenesClienteActivo,
		facturasClienteActivo,
		cargando,
	} = useContext(ClienteContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// columnas de la tabla
	const columnasOrds = [
		{ id: 1, nombre: 'Nº', align: 'center', minWidth: 60 },
		{ id: 2, nombre: 'Ord. Ecommerce', align: 'left', minWidth: 110 },
		{ id: 3, nombre: 'Creación', align: 'center', minWidth: 110 },
		{ id: 4, nombre: 'Pto. Venta', align: 'left', minWidth: 110 },
		{ id: 5, nombre: 'Estado', align: 'left', minWidth: 110 },
		{ id: 6, nombre: 'Tipo Envio', align: 'center', minWidth: 110 },
		{
			id: 7,
			nombre: 'Observaciones',
			align: 'center',
			minWidth: 60,
			boton: true,
			contenidoBoton: <NoteOutlinedIcon />,
		},
		// {
		// 	id: 8,
		// 	nombre: 'Ver Detalle',
		// 	align: 'center',
		// 	minWidth: 60,
		// 	boton: true,
		// 	contenidoBoton: <CallMadeOutlinedIcon />,
		// 	funcBoton: null,
		// },
	];

	const columnasFacts = [
		{ id: 1, nombre: 'Nº', align: 'center', minWidth: 60 },
		{ id: 2, nombre: 'Tipo', align: 'center', minWidth: 50 },
		{ id: 3, nombre: 'Estado', align: 'center', minWidth: 100 },
		{ id: 4, nombre: 'Importe Final', align: 'center', minWidth: 110 },
		{ id: 5, nombre: 'Creación', align: 'center', minWidth: 110 },
		{ id: 6, nombre: 'Nº Orden', align: 'center', minWidth: 60 },
		{ id: 7, nombre: 'Estado Pago', align: 'left', minWidth: 110 },
		{
			id: 8,
			nombre: 'Observaciones',
			align: 'center',
			minWidth: 60,
			boton: true,
			contenidoBoton: <NoteOutlinedIcon />,
		},
		// {
		// 	id: 9,
		// 	nombre: 'Ver Detalle',
		// 	align: 'center',
		// 	minWidth: 60,
		// 	boton: true,
		// 	contenidoBoton: <CallMadeOutlinedIcon />,
		// 	funcBoton: null,
		// },
	];

	return (
		<ModalScroll openModal={openInfoCliente} handleClose={handleClose}>
			<div className={classes.root}>
				<AppBar position="static" className={classes.appbar}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
					>
						<Tab label="Órdenes" {...a11yProps(0)} />
						<Tab label="Facturas" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<TablaMostrarOrdenes
						columnas={columnasOrds}
						filas={ordenesClienteActivo}
						cargando={cargando}
					/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<TablaMostrarFacturas
						columnas={columnasFacts}
						filas={facturasClienteActivo}
						cargando={cargando}
					/>
				</TabPanel>
			</div>
		</ModalScroll>
	);
};

export default FacsOrdsCliente;

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
