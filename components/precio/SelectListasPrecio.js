import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PreciosContext from '../../context/precios/preciosContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	altura: {
		paddingY: '10px',
	},
	selector: {
		color: '#fff',
		'&::before': {
			borderColor: '#fff',
		},
		'&:hover': {
			backgroundColor: '#6F7DC8',
		},
		'&:hover:before': {
			backgroundColor: '#fff',
			height: 2,
			display: 'none',
		},
	},
	icon: {
		fill: '#fff',
	},
}));

const SelectListasPrecio = () => {
	const classes = useStyles();

	const { listasPrecio, traerListasPrecio } = useContext(
		BarraHerramientasContext
	);

	const { lista, handleLista } = useContext(PreciosContext);

	useEffect(() => {
		traerListasPrecio();
	}, []);

	const handleChange = (event) => {
		handleLista(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			{listasPrecio ? (
				<Select
					className={classes.selector}
					id="demo-simple-select-autowidth"
					value={lista}
					defaultValue=""
					onChange={handleChange}
					autoWidth
					inputProps={{
						classes: {
							icon: classes.icon,
						},
					}}
				>
					{listasPrecio.map((lista) => (
						<MenuItem key={lista.id} value={lista.id}>
							{lista.descripcion}
						</MenuItem>
					))}
				</Select>
			) : null}
		</FormControl>
	);
};

export default SelectListasPrecio;
