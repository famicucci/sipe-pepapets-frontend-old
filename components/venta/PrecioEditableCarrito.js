import React, { useEffect, useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import VentasContext from '../../context/ventas/ventasContext';

const PrecioEditableCarrito = ({ codigo, precio }) => {
	const [value, setValue] = useState(0);
	const [edit, setEdit] = useState(false);

	const { handlePriceCart } = useContext(VentasContext);

	useEffect(() => {
		setValue(precio);
	}, []);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onClick = () => {
		setEdit(true);
	};

	const onBlur = () => {
		if (Number.isNaN(parseInt(value))) {
			setValue(0);
		}

		handlePriceCart(codigo, value);
		setEdit(false);
	};

	return (
		<div id="precio-editable" onClick={onClick}>
			{!edit ? (
				parseFloat(value).toFixed(2)
			) : (
				<TextField
					type="number"
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					InputProps={{
						inputProps: {
							min: 0,
						},
					}}
					autoFocus
				/>
			)}
		</div>
	);
};

export default PrecioEditableCarrito;
