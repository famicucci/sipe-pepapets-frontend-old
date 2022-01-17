import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

const FilaMostrarFacturas = ({ fila, colIndex }) => {
	const [observacionesCliente, setObservacionesCliente] = useState(null);

	const handleOnShowDirecciones = (observaciones) => {
		const a = <p>{observaciones}</p>;
		setObservacionesCliente(a);
	};

	const estado = (estado) => {
		if (estado === 'v') {
			estado = 'Vigente';
		} else if (estado === 'c') {
			estado = 'Cancelada';
		}

		return estado;
	};

	return (
		<TableRow hover>
			{colIndex['Nº'] ? <TableCell align="center">{fila.id}</TableCell> : null}
			{colIndex['Tipo'] ? (
				<TableCell align="center">{fila.tipo}</TableCell>
			) : null}
			{colIndex['Estado'] ? (
				<TableCell align="center">{estado(fila.estado)}</TableCell>
			) : null}
			{colIndex['Importe Final'] ? (
				<TableCell align="center">{fila.importeFinal}</TableCell>
			) : null}
			{colIndex['Creación'] ? (
				<TableCell align="center">
					{moment(fila.createdAt).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Nº Orden'] ? (
				<TableCell align="center">{fila.OrdenId}</TableCell>
			) : null}
			{colIndex['Estado Pago'] ? (
				<TableCell align="center">{fila.estadoPago}</TableCell>
			) : null}
			{colIndex['Observaciones'] ? (
				<TableCell align="left">
					<Tippy
						content={observacionesCliente}
						interactive={true}
						theme={'light-border'}
						placement={'left'}
						onShow={() => {
							handleOnShowDirecciones(fila.observaciones);
						}}
					>
						{fila.observaciones ? (
							<IconButton size="small">
								{colIndex['Observaciones'].contenidoBoton}
							</IconButton>
						) : null}
					</Tippy>
				</TableCell>
			) : null}
			{colIndex['Ver Detalle'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={colIndex['Ver Detalle'].contenidoBoton}
						// onClick={() => {
						// 	colIndex['Ver Detalle'].funcBoton(fila);
						// }}
					/>
				</TableCell>
			) : null}
		</TableRow>
	);
};

export default FilaMostrarFacturas;
