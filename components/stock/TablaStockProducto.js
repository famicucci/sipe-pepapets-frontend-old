import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import StockContext from '../../context/stock/stockContext';
import FilaStockProducto from './FilaStockProducto';

const TablaStockProducto = () => {
	const { productoActivo } = useContext(StockContext);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{productoActivo.map((fila) => (
						<FilaStockProducto key={fila.id} fila={fila} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaStockProducto;
