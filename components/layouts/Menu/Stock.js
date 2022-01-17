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
import LayersIcon from '@material-ui/icons/Layers';
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

const Stock = () => {
	const classes = useStyles();

	const {
		openStock,
		botonActivo,
		handleClickStock,
		setBotonActivo,
		activarBoton,
	} = useContext(MenuContext);

	const botonTotal = 'stock-total';
	const botonPtoStock = 'stock-ptostock';
	const botonMovimientos = 'stock-movimientos';

	const [activoTotal, setActivoTotal] = useState();
	const [activoPtoStock, setActivoPtoStock] = useState();
	const [activoMovimientos, setActivoMovimientos] = useState();

	useEffect(() => {
		const booleano1 = activarBoton(botonTotal, botonActivo);
		setActivoTotal(booleano1);

		const booleano2 = activarBoton(botonPtoStock, botonActivo);
		setActivoPtoStock(booleano2);

		const booleano3 = activarBoton(botonMovimientos, botonActivo);
		setActivoMovimientos(booleano3);
	}, [botonActivo]);

	return (
		<>
			<ListItem button onClick={handleClickStock}>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary="Stock" />
				{openStock ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openStock} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link href="\stock\total">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoTotal,
							})}
							onClick={() => {
								setBotonActivo(botonTotal);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Total" />
						</ListItem>
					</Link>
					<Link href="\stock\punto-stock">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoPtoStock,
							})}
							onClick={() => {
								setBotonActivo(botonPtoStock);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Puntos de stock" />
						</ListItem>
					</Link>
					<Link href="\stock\movimientos">
						<ListItem
							button
							className={clsx(classes.nested, {
								[classes.botonToggle]: activoMovimientos,
							})}
							onClick={() => {
								setBotonActivo(botonMovimientos);
							}}
						>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Movimientos" />
						</ListItem>
					</Link>
				</List>
			</Collapse>
		</>
	);
};

export default Stock;
