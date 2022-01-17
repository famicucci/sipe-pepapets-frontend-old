import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import VentasContext from '../../context/ventas/ventasContext';

const NotaVenta = () => {
	const { openNota } = useContext(BotoneraCarrContext);
	const { nota, handleNota } = useContext(VentasContext);

	const onChange = (e) => {
		handleNota(e.target.value);
	};

	return (
		<Collapse in={openNota} timeout="auto" unmountOnExit>
			<TextField
				value={nota}
				onChange={onChange}
				label="Nota"
				placeholder="Escribe la nota aquí..."
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

export default NotaVenta;
