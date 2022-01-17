import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import SelectOrdenEstado from './SelectOrdenEstado';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import BotonTippyHoverTabla from '../generales/BotonTippyHoverTabla';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import BotonCustomFilaTabla from '../generales/BotonCustomFilaTabla';
import BotonSinFormato from '../generales/BotonSinFormato';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { pink, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	estadoPago: {
		color: (props) =>
			props.estadoPago === 'Pago'
				? theme.palette.success.main
				: theme.palette.error.main,
		fontWeight: theme.typography.fontWeightMedium,
	},
}));

const FilaEditarClientes = ({ fila, colIndex }) => {
	const classes = useStyles(fila);

	const {
		handleFilaActivaOrden,
		handleOpenModalDetalleOrden,
		handleOpenModalInformacionCliente,
		handleOpenModalCrearFactura,
		handleOpenModalFactura,
	} = useContext(EditarOrdenesContext);

	return (
		<RowColorIntercalado>
			{colIndex['Nº'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={fila.idOrden}
						onClick={() => {
							handleFilaActivaOrden(fila.idOrden);
							handleOpenModalDetalleOrden();
						}}
					/>
				</TableCell>
			) : null}
			{colIndex['Estado'] ? (
				<TableCell align="center">
					<SelectOrdenEstado
						idOrden={fila.idOrden}
						showFinalizado={
							fila.idFactura && fila.estadoPago === 'Pago' ? true : false
						}
						ordenEstadoId={fila.ordenEstadoId}
					/>
				</TableCell>
			) : null}
			{colIndex['Cliente'] ? (
				<TableCell align="center">
					<BotonSinFormato
						onClick={() => {
							handleFilaActivaOrden(fila.idOrden);
							handleOpenModalInformacionCliente();
						}}
					>
						{`${fila.nombreCliente} ${fila.apellidoCliente}`}
					</BotonSinFormato>
				</TableCell>
			) : null}
			{colIndex['Fecha'] ? (
				<TableCell align="center">
					{moment(fila.fecha).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Nº Fact.'] ? (
				<TableCell align="center">
					{fila.idFactura ? (
						<BotonCustomFilaTabla
							tochangestate={() => {
								handleFilaActivaOrden(fila.idOrden);
								handleOpenModalFactura();
							}}
							backGroundColor={deepPurple[500]}
							backGroundColorHover={deepPurple[700]}
						>
							{fila.idFactura}
						</BotonCustomFilaTabla>
					) : (
						<BotonCustomFilaTabla
							tochangestate={() => {
								handleFilaActivaOrden(fila.idOrden);
								handleOpenModalCrearFactura();
							}}
							backGroundColor={pink[500]}
							backGroundColorHover={pink[700]}
							disabled={fila.tipoEnvioId !== 9 ? false : true}
						>
							Crear Factura
						</BotonCustomFilaTabla>
					)}
				</TableCell>
			) : null}
			{colIndex['Estado Pago'] ? (
				// this component has to control payments invoice
				<TableCell align="center">
					{fila.estadoPago ? (
						<span className={classes.estadoPago}>{fila.estadoPago}</span>
					) : (
						'-'
					)}
				</TableCell>
			) : null}
			{colIndex['M. Envío'] ? (
				<TableCell align="center">{fila.tipoEnvioDescripcion}</TableCell>
			) : null}
			{colIndex['Nota'] ? (
				<TableCell align="left">
					{fila.observaciones ? (
						<BotonTippyHoverTabla
							icono={colIndex['Nota'].contenidoBoton}
							contenidoTippy={fila.observaciones}
						/>
					) : null}
				</TableCell>
			) : null}
		</RowColorIntercalado>
	);
};

export default FilaEditarClientes;
