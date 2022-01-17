import React from 'react';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 300 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 50 },
	{ id: 4, nombre: 'Precio', align: 'center', minWidth: 70 },
	{ id: 5, nombre: 'Total', align: 'center', minWidth: 80 },
];

class FacturaToPrint extends React.PureComponent {
	render() {
		const { factura } = this.props;

		return (
			<Box style={{ margin: '35px' }}>
				<Box
					display="flex"
					alignItems="center"
					style={{ marginBottom: '25px' }}
				>
					<Box flexGrow={1}>
						<img src="/logo.jpg" alt="nadaaa" width={50} height={50} />
					</Box>
					<Box>
						<Typography color="initial">
							{moment(new Date()).format('DD-MM-YYYY')}
						</Typography>
					</Box>
				</Box>
				<TableContainer>
					<Table style={{ minWidth: 600 }}>
						<TableHead>
							<TableRow>
								{columnas.map((x) => (
									<TableCell
										key={x.id}
										align={x.align}
										style={{ minWidth: x.minWidth }}
									>
										{x.nombre}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{factura.detalleFactura.map((x) => (
								<RowColorIntercalado>
									<TableCell align="center">{x.ProductoCodigo}</TableCell>
									<TableCell align="left">{x.Producto.descripcion}</TableCell>
									<TableCell align="center">{x.cantidad}</TableCell>
									<TableCell align="center">{x.pu}</TableCell>
									<TableCell align="center">
										{(x.cantidad * x.pu).toFixed(2)}
									</TableCell>
								</RowColorIntercalado>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Box display="flex" alignItems="flex-end" style={{ marginTop: '25px' }}>
					<div style={{ width: '100%' }}>
						{factura.importe !== factura.importeFinal ? (
							<ImporteFlexGrow titulo="Subtotal" childrenNumDecimal>
								{factura.importe}
							</ImporteFlexGrow>
						) : null}
						{factura.descuento ? (
							<ImporteFlexGrow titulo="Descuento">
								{factura.descuento}
							</ImporteFlexGrow>
						) : null}
						{factura.tarifaEnvio ? (
							<ImporteFlexGrow titulo="Envío" childrenNumDecimal>
								{factura.tarifaEnvio}
							</ImporteFlexGrow>
						) : null}
						<ImporteFlexGrow titulo="Importe Total" childrenNumDecimal>
							{factura.importeFinal}
						</ImporteFlexGrow>
					</div>
				</Box>
			</Box>
		);
	}
}

export default FacturaToPrint;
