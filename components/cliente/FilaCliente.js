import React, { useState, useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import DireccionesCliente from './DireccionesCliente';
import BotonSinFormato from '../generales/BotonSinFormato';
import ClienteContext from '../../context/clientes/ClienteContext';
import RowColorIntercalado from '../generales/RowColorIntercalado';

const FilaCliente = ({ fila, colIndex }) => {
	const [direccionesCliente, setDireccionesCliente] = useState(null);

	const { handleFilaActiva, handleOpenModalInformacionCliente } =
		useContext(ClienteContext);

	const handleOnShowDirecciones = (direcciones) => {
		const a = <DireccionesCliente direcciones={direcciones} />;
		setDireccionesCliente(a);
	};

	return (
		<RowColorIntercalado>
			<TableCell align="left">
				<BotonSinFormato
					onClick={() => {
						handleFilaActiva(fila.id);
						handleOpenModalInformacionCliente(true);
					}}
				>
					{`${fila.nombre} ${fila.apellido}`}
				</BotonSinFormato>
			</TableCell>
			<TableCell align="left">{fila.email}</TableCell>
			{colIndex['Celular'] ? (
				<TableCell align="left">{fila.celular}</TableCell>
			) : null}
			{colIndex['Razon Social'] ? (
				<TableCell align="left">{fila.razonSocial}</TableCell>
			) : null}
			{colIndex['Nombre Local / Obs.'] ? (
				<TableCell align="left">{fila.observaciones}</TableCell>
			) : null}
			{colIndex['Cond. IVA'] ? (
				<TableCell align="left">{fila.condIva}</TableCell>
			) : null}
			{colIndex['Creación'] ? (
				<TableCell align="left">{fila.createdAt}</TableCell>
			) : null}
			{colIndex['Tipo'] ? (
				<TableCell align="left">{fila.tipo}</TableCell>
			) : null}
			{colIndex['Agregar'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={colIndex['Agregar'].contenidoBoton}
						onClick={() => {
							colIndex['Agregar'].funcBoton(fila);
						}}
					/>
				</TableCell>
			) : null}
			{colIndex['Direcciones'] ? (
				<TableCell align="left">
					<Tippy
						content={direccionesCliente}
						interactive={true}
						theme={'light-border'}
						placement={'left'}
						onShow={() => {
							handleOnShowDirecciones(fila.direcciones);
						}}
					>
						<IconButton size="small">
							{colIndex['Direcciones'].contenidoBoton}
						</IconButton>
					</Tippy>
				</TableCell>
			) : null}
			{colIndex['Ver Más'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={colIndex['Ver Más'].contenidoBoton}
						onClick={() => {
							colIndex['Ver Más'].funcBoton(fila);
						}}
					/>
				</TableCell>
			) : null}
		</RowColorIntercalado>
	);
};

export default FilaCliente;
