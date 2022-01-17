import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import { Typography, Divider, Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import Productos from './Productos';
import EnvioDetalleOrden from './EnvioDetalleOrden';
import MasInformacion from './MasInformacion';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles((theme) => ({
	dividerHorizontal: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	dividerVertical: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}));

const DetalleOrden = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [statusButton, setStatusButton] = useState({ disabled: true });

	const { getShippingTypes } = useContext(GlobalDataContext);
	const { handleOrderToModify } = useContext(VentasContext);
	const {
		filaActiva,
		openModalDetalleOrden,
		handleCloseModal,
		handleFilaActivaOrden,
		removeOrder,
	} = useContext(EditarOrdenesContext);

	useEffect(() => {
		getShippingTypes();
	}, []);

	useEffect(() => {
		if (!filaActiva.Factura) setStatusButton({ disabled: false });
	}, [filaActiva]);

	if (!openModalDetalleOrden) return null;

	const handleClickMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onClickRemoveOrder = () => {
		removeOrder(filaActiva.id);
		handleClose();
		handleCloseModal();
	};

	return (
		<ModalScroll
			openModal={openModalDetalleOrden}
			handleClose={() => {
				handleCloseModal();
				handleFilaActivaOrden(null);
			}}
			padding={2}
		>
			<Box display="flex" justifyContent="flex-center" alignItems="flex-end">
				<Box>
					<Typography variant="h5" align="left">
						{`Orden ${filaActiva.id}`}
					</Typography>
				</Box>
				<Divider
					className={classes.dividerVertical}
					orientation="vertical"
					variant="inset"
					flexItem
				/>
				<Box flexGrow={1}>
					<Typography align="left">{`${filaActiva.Cliente.nombre} ${filaActiva.Cliente.apellido}`}</Typography>
				</Box>
				<Box>
					<IconButton size="small" onClick={handleClickMenu}>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={onClickRemoveOrder} {...statusButton}>
							Eliminar
						</MenuItem>
					</Menu>
				</Box>
			</Box>
			<Divider className={classes.dividerHorizontal} variant="fullWidth" />
			<Productos filaActiva={filaActiva} editOrder={handleOrderToModify} />
			<EnvioDetalleOrden />
			<MasInformacion />
		</ModalScroll>
	);
};

export default DetalleOrden;
