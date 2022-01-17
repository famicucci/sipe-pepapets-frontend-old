import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import clsx from 'clsx';
import { MenuContext } from '../../../context/MenuContext';

const useStyles = makeStyles((theme) => ({
	botonToggle: {
		backgroundColor: theme.palette.action.hover,
	},
}));

const Reportes = () => {
	const classes = useStyles();

	const { botonActivo, setBotonActivo, activarBoton } = useContext(MenuContext);

	const [activo, setActivo] = useState(false);

	const boton = 'reportes';
	useEffect(() => {
		const booleano = activarBoton(boton, botonActivo);
		setActivo(booleano);
	}, [botonActivo]);

	return (
		<Link href="\reportes">
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
					<TrendingUpIcon />
				</ListItemIcon>
				<ListItemText primary="Reportes" />
			</ListItem>
		</Link>
	);
};

export default Reportes;
