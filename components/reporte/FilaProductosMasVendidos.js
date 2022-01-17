import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';

const FilaProductosMasVendidos = (props) => {
	const { codigo, descripcion, cantidad, facturacion } = props.fila;

	return (
		<RowColorIntercalado>
			<TableCell component="th" scope="row">
				{codigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="center">{cantidad}</TableCell>
			<TableCell align="center">{facturacion}</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaProductosMasVendidos;
