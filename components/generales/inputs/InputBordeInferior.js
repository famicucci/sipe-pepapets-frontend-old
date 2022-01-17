import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const InputBordeInferior = ({
	label,
	name,
	placeholder,
	ancho,
	required,
	initialvalue,
	tochangestate,
}) => {
	if (initialvalue === null) initialvalue = '';
	const [valor, setValor] = useState(initialvalue);

	useEffect(() => {
		setValor(initialvalue);
	}, [initialvalue]);

	const onChange = (e) => {
		setValor(e.target.value);
		tochangestate(e.target.name, e.target.value);
	};

	if (required) {
		required = { required };
	}

	return (
		<Grid item xs={ancho}>
			<TextField
				name={name}
				value={valor}
				onChange={onChange}
				label={label}
				placeholder={placeholder}
				fullWidth
				InputLabelProps={{
					shrink: true,
				}}
				{...required}
			/>
		</Grid>
	);
};

export default InputBordeInferior;
