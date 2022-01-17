import React, { useState, useEffect } from 'react';
import {
	TextField,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
} from '@material-ui/core';

const DescuentoCrearFactura = (props) => {
	const { tochangestate, monto } = props;

	const [value, setValue] = useState('');
	const [selectedValue, setSelectedValue] = React.useState('porcentaje');
	const [descuento, setDescuento] = useState(0);

	useEffect(() => {
		// calcular el monto final
		let resultado;
		if (selectedValue === 'monto') {
			resultado = value;
		} else if (selectedValue === 'porcentaje') {
			resultado = monto * (value / 100);
		}
		setDescuento(resultado);
	}, [value, selectedValue, monto]);

	useEffect(() => {
		tochangestate(descuento);
	}, [descuento]);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};

	const onChangeDescuento = (e) => {
		setValue(e.target.value);
	};

	return (
		<>
			<FormControl component="fieldset">
				<RadioGroup row onChange={handleChange} value={selectedValue}>
					<FormControlLabel
						value="porcentaje"
						control={<Radio color="secondary" size="small" />}
						label="(%)"
					/>
					<FormControlLabel
						value="monto"
						control={<Radio color="secondary" size="small" />}
						label="($)"
					/>
				</RadioGroup>
			</FormControl>
			<TextField
				type="number"
				value={value}
				placeholder="Descuento"
				InputLabelProps={{
					shrink: true,
				}}
				onChange={onChangeDescuento}
				style={{ width: '100px' }}
			/>
		</>
	);
};

export default DescuentoCrearFactura;
