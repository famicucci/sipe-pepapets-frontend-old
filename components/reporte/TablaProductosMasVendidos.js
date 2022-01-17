import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FilaProductosMasVendidos from './FilaProductosMasVendidos';
import moment from 'moment';
import SpinnerTabla from '../generales/SpinnerTabla';

const columnas = [
	{ id: 'codigo', label: 'Código', minWidth: 20, align: 'left' },
	{ id: 'descripcion', label: 'Descripción', minWidth: 100, align: 'left' },
	{ id: 'cantidad', label: 'Cantidad', minWidth: 50, align: 'center' },
	{
		id: 'facturacion',
		label: 'Facturación\u00a0($)',
		minWidth: 50,
		align: 'center',
	},
];

const useStyles = makeStyles({
	tableContainer: {
		flex: 1,
		minHeight: 0,
		height: '100%',
	},
});

const TablaProductosMasVendidos = () => {
	const classes = useStyles();
	const { dates, invoices, loadingGlobalData, getInvoicing } =
		useContext(GlobalDataContext);

	const [data, setData] = useState([]);

	useEffect(() => {
		if (invoices.length === 0) getInvoicing(dates.startDate, dates.endDate);
	}, []);

	useEffect(() => {
		getInvoicing(dates.startDate, dates.endDate);
	}, [dates]);

	useEffect(() => {
		if (invoices.length > 0)
			getDataTable(invoices, dates.startDate, dates.endDate);
	}, [invoices]);

	const getDataTable = (invoices, startDate, endDate) => {
		const filteredInvoices = invoices.filter(
			(x) =>
				moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') <
					moment(x.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') &&
				moment(x.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') <
					moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') &&
				x.tipo === 'fac' &&
				x.estado !== 'c' &&
				x.estadoPago === 'Pago'
		);

		let products = filteredInvoices.map((x) => x.detalleFactura).flat();

		let mostSelledProducts = {};
		products.forEach((x) => {
			mostSelledProducts[x.Producto.codigo] = mostSelledProducts[
				x.Producto.codigo
			] ?? {
				codigo: x.Producto.codigo,
				descripcion: x.Producto.descripcion,
				cantidad: 0,
				facturacion: 0,
			};
			mostSelledProducts[x.Producto.codigo]['cantidad'] += parseFloat(
				x.cantidad
			);
			mostSelledProducts[x.Producto.codigo]['facturacion'] += parseFloat(x.pu);
		});

		let arrayMostSelledProducts = Object.values(mostSelledProducts);

		arrayMostSelledProducts.sort((a, b) => b.facturacion - a.facturacion);

		setData(arrayMostSelledProducts);
	};

	return (
		<>
			{!loadingGlobalData ? (
				<TableContainer className={classes.tableContainer}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{columnas.map((columna) => (
									<TableCell
										key={columna.id}
										align={columna.align}
										style={{ minWidth: columna.minWidth }}
									>
										{columna.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((x) => (
								<FilaProductosMasVendidos key={x.codigo} fila={x} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<SpinnerTabla />
			)}
		</>
	);
};

export default TablaProductosMasVendidos;
