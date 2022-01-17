import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

const FilaMostrarOrdenes = ({ fila, colIndex, shippings }) => {
	const [observacionesCliente, setObservacionesCliente] = useState(null);

	const handleOnShowDirecciones = (observaciones) => {
		const a = <p>{observaciones}</p>;
		setObservacionesCliente(a);
	};

	return (
		<TableRow hover>
			{colIndex['Nº'] ? <TableCell align="center">{fila.id}</TableCell> : null}
			{colIndex['Ord. Ecommerce'] ? ( // poner como ícono
				<TableCell align="left">{fila.ordenEcommerce}</TableCell>
			) : null}
			{colIndex['Creación'] ? (
				<TableCell align="center">
					{moment(fila.createdAt).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Pto. Venta'] ? (
				<TableCell align="left">{fila.PtoVenta.descripcion}</TableCell>
			) : null}
			{colIndex['Estado'] ? (
				<TableCell align="left">{fila.OrdenEstado.descripcion}</TableCell>
			) : null}
			{colIndex['Tipo Envio'] ? (
				<TableCell align="center">{shippings[fila.TipoEnvioId]}</TableCell>
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
						onClick={() => {
							setSelectedOrder(fila);
						}}
					/>
				</TableCell>
			) : null}
		</TableRow>
	);
};

export default FilaMostrarOrdenes;
