import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { MenuContext } from '../../../context/MenuContext';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
	botonToggle: {
		backgroundColor: theme.palette.action.hover,
	},
}));

const Ventas = () => {
	const classes = useStyles();

	const {
		openVentas,
		botonActivo,
		handleClickVentas,
		setBotonActivo,
		activarBoton,
	} = useContext(MenuContext);

	const botonConsultar = 'ventas-consultar';
	const botonNuevo = 'ventas-nuevo';
	const botonProdMov = 'ventas-prodmov';
	const botonFinalizadas = 'ventas-finalizadas';

	const [activoConsultar, setActivoConsultar] = useState();
	const [activoNuevo, setActivoNuevo] = useState();
	const [activoProdMov, setActivoProdMov] = useState();
	const [activoFinalizadas, setActivoFinalizadas] = useState();

	useEffect(() => {
		const booleano1 = activarBoton(botonConsultar, botonActivo);
		setActivoConsultar(booleano1);

		const booleano2 = activarBoton(botonNuevo, botonActivo);
		setActivoNuevo(booleano2);

		const booleano3 = activarBoton(botonProdMov, botonActivo);
		setActivoProdMov(booleano3);

		const booleano4 = activarBoton(botonFinalizadas, botonActivo);
		setActivoFinalizadas(booleano4);
	}, [botonActivo]);

	return (
		<>
			<ListItem button onClick={handleClickVentas}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Ventas" />
				{openVentas ? <ExpandLess /> : <ExpandMore />}
			</ListItem>

			<Collapse in={openVentas} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link href="\ventas\consultar">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoConsultar,
							})}
							onClick={() => {
								setBotonActivo(botonConsultar);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Consultar" />
						</ListItem>
					</Link>
					<Link href="\ventas\nuevo">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoNuevo,
							})}
							onClick={() => {
								setBotonActivo(botonNuevo);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Nuevo" />
						</ListItem>
					</Link>
					<Link href="\ventas\productos-mover">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoProdMov,
							})}
							onClick={() => {
								setBotonActivo(botonProdMov);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Prod. a Mover" />
						</ListItem>
					</Link>
					<Link href="\ventas\finalizadas">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoFinalizadas,
							})}
							onClick={() => {
								setBotonActivo(botonFinalizadas);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Finalizadas" />
						</ListItem>
					</Link>
				</List>
			</Collapse>
		</>
	);
};

export default Ventas;
