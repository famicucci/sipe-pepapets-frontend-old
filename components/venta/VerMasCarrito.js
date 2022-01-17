import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import VentasContext from '../../context/ventas/ventasContext';
import SelectPtoVenta from '../venta/SelectPtoVenta';

const VerMasCarrito = () => {
	const { openVerMas } = useContext(BotoneraCarrContext);
	const {
		ptoVenta,
		ordenEcommerce,
		handleInputOrdenEcommerce,
		handlePtoVenta,
	} = useContext(VentasContext);

	const onChange = (e) => {
		handleInputOrdenEcommerce(e.target.value);
	};

	return (
		<Collapse in={openVerMas} timeout="auto" unmountOnExit>
			<SelectPtoVenta
				ptoVenta={ptoVenta}
				handlePtoVenta={handlePtoVenta}
				marginBottom={2}
				marginTop={2}
			/>
			<TextField
				value={ordenEcommerce}
				onChange={onChange}
				label="Nº Ecommerce"
				placeholder="Escribe el identificador aquí.."
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				color="secondary"
				autoFocus
			/>
		</Collapse>
	);
};

export default VerMasCarrito;
