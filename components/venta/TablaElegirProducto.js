import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import usePaginacion from '../../hooks/usePaginacion';
import VentasContext from '../../context/ventas/ventasContext';
import FilaElegirProducto from './FilaElegirProducto';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import useFilter from '../../hooks/useFilter';
import SpinnerTabla from '../generales/SpinnerTabla';
import { Box } from '@material-ui/core';
import StockContext from '../../context/stock/stockContext';
import PreciosContext from '../../context/precios/preciosContext';
import Alerta2 from '../generales/Alerta2';

const columnas = [
	{ id: 'producto', label: 'Producto', minWidth: 80 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'acciones', label: '', minWidth: 20 },
];

const useStyles = makeStyles({
	tableContainer: {
		flex: 1,
		minHeight: 0,
	},
	spinner: { height: '60vh' },
});

const TablaElegirProducto = () => {
	const classes = useStyles();

	const { busqueda } = useContext(BarraHerramientasContext);
	const { stocks, mensajeStock, traerStocksPtoStock } =
		useContext(StockContext);
	const { precios, traerPrecios2 } = useContext(PreciosContext);

	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 5);

	const {
		preciosPtoStock,
		ptoStock,
		listaPrecio,
		valorRadio,
		cargando,
		mensajeVentas,
		traerProductos,
	} = useContext(VentasContext);

	useEffect(() => {
		traerStocksPtoStock();
		traerPrecios2();
	}, []);

	useEffect(() => {
		if (stocks.length !== 0 && precios.length !== 0)
			traerProductos(stocks, precios);
	}, [stocks, precios]);

	useEffect(() => {
		if (valorRadio === 'total')
			getStockTotalAndPrices(preciosPtoStock, listaPrecio, true);
		else if (valorRadio === 'pto-stock')
			getStockPtoStockAndPrices(preciosPtoStock, listaPrecio, ptoStock);
		else if (valorRadio === 'sin-stock')
			getStockTotalAndPrices(preciosPtoStock, listaPrecio, false);
	}, [preciosPtoStock, valorRadio, listaPrecio, ptoStock]);

	const getStockPtoStockAndPrices = (
		preciosPtoStock,
		listaPrecioId,
		ptoStockId
	) => {
		const stockPtoStockAndPrices = preciosPtoStock.filter(
			(x) =>
				x.cantidad !== 0 &&
				x['Producto.Precios.ListaPrecioId'] === listaPrecioId &&
				x.PtoStockId === ptoStockId
		);
		setData(stockPtoStockAndPrices);
	};

	const getStockTotalAndPrices = (
		preciosPtoStock,
		listaPrecioId,
		availableStock = true
	) => {
		let sumByCode = {};
		let productsInStock = [];
		let productsOutOfStock = [];

		preciosPtoStock.forEach((x) => {
			if (x['Producto.Precios.ListaPrecioId'] === listaPrecioId) {
				sumByCode[x.ProductoCodigo] = sumByCode[x.ProductoCodigo] ?? {
					cantidad: 0,
					['Producto.descripcion']: x['Producto.descripcion'],
					['Producto.Precios.pu']: x['Producto.Precios.pu'],
				};
				sumByCode[x.ProductoCodigo]['cantidad'] += x.cantidad;
			}
		});

		Object.keys(sumByCode).forEach((x) => {
			const product = {
				ProductoCodigo: x,
				['Producto.descripcion']: sumByCode[x]['Producto.descripcion'],
				['cantidad']: sumByCode[x]['cantidad'],
				['Producto.Precios.pu']: sumByCode[x]['Producto.Precios.pu'],
			};

			if (product['cantidad'] !== 0) productsInStock.push(product);
			else if (product['cantidad'] === 0) productsOutOfStock.push(product);
		});

		if (availableStock) setData(productsInStock);
		else setData(productsOutOfStock);
	};

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
			{!cargando ? (
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columnas.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.map((fila) => (
							<FilaElegirProducto key={fila.ProductoCodigo} fila={fila} />
						))}
						{filteredData.length === 0
							? bodyVacio(columnas, 'Ningún producto coincide...')
							: filasVacias}
					</TableBody>
				</Table>
			) : (
				<Box className={classes.spinner}>
					<SpinnerTabla />
				</Box>
			)}
			{mensajeStock ? <Alerta2 mensaje={mensajeStock} /> : null}
			{mensajeVentas ? <Alerta2 mensaje={mensajeVentas} /> : null}
		</TableContainer>
	);
};

export default TablaElegirProducto;
