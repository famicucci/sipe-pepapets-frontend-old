import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const InputLector = () => {
	const classes = useStyles();

	const [valor, setValor] = useState('');

	const { ptoStock, handleCarrito } = useContext(VentasContext);

	const onChange = (e) => {
		setValor(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// agarro el codigo y lo saco del punto de stock indicado, con la lista de precio indicada
		const codigo = valor.trim();
		handleCarrito(codigo, ptoStock.id);
		setValor('');
	};

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
		>
			<TextField
				value={valor}
				onChange={onChange}
				label="Código"
				variant="outlined"
				color="secondary"
				autoFocus
			/>
		</form>
	);
};

export default InputLector;
