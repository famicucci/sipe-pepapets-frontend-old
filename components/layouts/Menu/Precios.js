import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import clsx from 'clsx';
import { MenuContext } from '../../../context/MenuContext';

const useStyles = makeStyles((theme) => ({
	botonToggle: {
		backgroundColor: theme.palette.action.hover,
	},
}));

const Precios = () => {
	const classes = useStyles();

	const { botonActivo, setBotonActivo, activarBoton } = useContext(MenuContext);

	const [activo, setActivo] = useState(false);

	const boton = 'precios';
	useEffect(() => {
		const booleano = activarBoton(boton, botonActivo);
		setActivo(booleano);
	}, [botonActivo]);

	return (
		<Link href="\precios">
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
					<LocalOfferIcon />
				</ListItemIcon>
				<ListItemText primary="Precios" />
			</ListItem>
		</Link>
	);
};

export default Precios;
