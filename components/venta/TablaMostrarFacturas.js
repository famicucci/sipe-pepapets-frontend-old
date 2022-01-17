import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaMostrarFacturas from './FilaMostrarFacturas';
import SpinnerTabla from '../generales/SpinnerTabla';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const TablaMostrarFacturas = ({ columnas, filas, cargando }) => {
	const classes = useStyles();

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

	// extraer los id de las columnas
	const colIndex = columnas.reduce(
		(acc, el) => ({ ...acc, [el.nombre]: el }),
		{}
	);

	return (
		<TableContainer component={Paper}>
			{!cargando ? (
				<Table className={classes.table}>
					<HeadTabla columnas={columnas} />
					<TableBody>
						{cortePagina.map((x) => (
							<FilaMostrarFacturas key={x.id} fila={x} colIndex={colIndex} />
						))}
						{cortePagina.length === 0 && !cargando
							? bodyVacio(columnas)
							: filasVacias}
					</TableBody>
					<FooterTabla />
				</Table>
			) : (
				<SpinnerTabla />
			)}
		</TableContainer>
	);
};

export default TablaMostrarFacturas;
