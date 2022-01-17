import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import clsx from 'clsx';
import { MenuContext } from '../../../context/MenuContext';

const useStyles = makeStyles((theme) => ({
	botonToggle: {
		backgroundColor: theme.palette.action.hover,
	},
}));

const Gastos = () => {
	const classes = useStyles();

	const { botonActivo, setBotonActivo, activarBoton } = useContext(MenuContext);

	const [activo, setActivo] = useState(false);

	const boton = 'gastos';
	useEffect(() => {
		const booleano = activarBoton(boton, botonActivo);
		setActivo(booleano);
	}, [botonActivo]);

	return (
		<Link href="\gastos">
			<ListItem
				button
				className={clsx({
					[classes.botonToggle]: activo,
				})}
				onClick={() => {
					setBotonActivo(boton);
				}}
			>
				<ListItemIcon>
					<AttachMoneyIcon />
				</ListItemIcon>
				<ListItemText primary="Gastos" />
			</ListItem>
		</Link>
	);
};

export default Gastos;
