import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
		textAlign: 'left',
	},
}));

const SelectListaPrecioVenta = () => {
	const classes = useStyles();

	const { listasPrecio, mensaje, traerListasPrecio } = useContext(
		BarraHerramientasContext
	);

	const { listaPrecio, handlePriceList } = useContext(VentasContext);

	useEffect(() => {
		traerListasPrecio();
	}, []);

	useEffect(() => {
		if (mensaje) {
			console.log(mensaje);
		}
	}, [mensaje]);

	const handleChange = (e) => {
		handlePriceList(e.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			{listasPrecio ? (
				<Select
					value={listaPrecio}
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{listasPrecio
						? listasPrecio.map((ptoStock) => (
								<MenuItem key={ptoStock.id} value={ptoStock.id}>
									{ptoStock.descripcion}
								</MenuItem>
						  ))
						: null}
				</Select>
			) : null}
		</FormControl>
	);
};

export default SelectListaPrecioVenta;
