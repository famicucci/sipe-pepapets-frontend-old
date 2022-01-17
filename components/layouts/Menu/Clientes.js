import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import clsx from 'clsx';
import { MenuContext } from '../../../context/MenuContext';

const useStyles = makeStyles((theme) => ({
	botonToggle: {
		backgroundColor: theme.palette.action.hover,
	},
}));

const Clientes = () => {
	const classes = useStyles();

	const { botonActivo, setBotonActivo, activarBoton } = useContext(MenuContext);

	const [activo, setActivo] = useState(false);

	const boton = 'clientes';
	useEffect(() => {
		const booleano = activarBoton(boton, botonActivo);
		setActivo(booleano);
	}, [botonActivo]);

	return (
		<Link href="\clientes">
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
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Clientes" />
			</ListItem>
		</Link>
	);
};

export default Clientes;
