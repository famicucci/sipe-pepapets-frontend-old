import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import RowColorIntercalado from '../generales/RowColorIntercalado';

const FilaProductosAMover = (props) => {
	const { fila } = props;

	return (
		<RowColorIntercalado>
			<TableCell align="left">{fila.ProductoCodigo}</TableCell>
			<TableCell align="left">{fila.descripcion}</TableCell>
			<TableCell align="center">{fila.cantidad}</TableCell>
			<TableCell align="center">
				{fila.Pto_Stock_Producto_Descripcion}
			</TableCell>
			<TableCell align="center">
				{fila.Pto_Stock_Pto_Venta_Descripcion}
			</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaProductosAMover;
