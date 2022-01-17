import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import StockContext from '../../context/stock/stockContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '13ch',
		},
	},
}));

const InputCantidadStock = ({ cantidad }) => {
	const classes = useStyles();

	const { handleNuevaCantidad } = useContext(StockContext);

	const [cantInput, setCantInput] = useState('');

	useEffect(() => {
		setCantInput(cantidad);
	}, []);

	const onChange = (e) => {
		let a = e.target.value;
		if (Number.isNaN(parseInt(a))) {
			a = 0;
		}
		setCantInput(a);
		handleNuevaCantidad(a);
	};

	return (
		<form className={classes.root}>
			<TextField
				label="Cantidad"
				type="number"
				value={cantInput}
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					inputProps: {
						min: 0,
					},
				}}
				variant="outlined"
				onChange={onChange}
			/>
		</form>
	);
};

export default InputCantidadStock;
