import React, { useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SelectPtoStockVenta from './SelectPtoStockVenta';
import VentasContext from '../../context/ventas/ventasContext';

const RadioElegirProductos = () => {
	const { valorRadio, handleValorRadio } = useContext(VentasContext);

	const handleChange = (event) => {
		handleValorRadio(event.target.value);
	};

	return (
		<FormControl component="fieldset">
			<RadioGroup
				row
				aria-label="position"
				name="position"
				onChange={handleChange}
				value={valorRadio}
			>
				<FormControlLabel
					value="pto-stock"
					control={<Radio color="primary" />}
					label={<SelectPtoStockVenta />}
				/>
				<FormControlLabel
					value="total"
					control={<Radio color="primary" />}
					label="total"
				/>
				<FormControlLabel
					value="sin-stock"
					control={<Radio color="primary" />}
					label="s/ stock"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default RadioElegirProductos;
