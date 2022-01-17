import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaMostrarOrdenes from './FilaMostrarOrdenes';
import SpinnerTabla from '../generales/SpinnerTabla';
import ModalScroll2 from '../generales/ModalScroll2';
import TablaListaProductos from '../generales/TablaListaProductos';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles({
	table: {
		minWidth: 750,
	},
});

const TablaMostrarOrdenes = ({ columnas, filas, cargando }) => {
	const classes = useStyles();

	const { shippingTypes, getShippingTypes } = useContext(GlobalDataContext);
	const [shippings, setShippings] = useState({});
	const [openDetalleOrden, setOpenDetalleOrden] = useState(true);
	const [selectedOrder, setSelectedOrder] = useState({});
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

	useEffect(() => {
		getShippingTypes();
	}, []);

	useEffect(() => {
		if (shippingTypes) {
			const shippings = {};
			shippingTypes.forEach((x) => (shippings[x.id] = x.descripcion));
			setShippings(shippings);
		}
	}, [shippingTypes]);

	// extraer los id de las columnas
	const colIndex = columnas.reduce(
		(acc, el) => ({ ...acc, [el.nombre]: el }),
		{}
	);

	return (
		<>
			<TableContainer component={Paper}>
				{!cargando ? (
					<Table className={classes.table}>
						<HeadTabla columnas={columnas} />
						<TableBody>
							{cortePagina.map((x) => (
								<FilaMostrarOrdenes
									key={x.id}
									fila={x}
									colIndex={colIndex}
									shippings={shippings}
								/>
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
			{/* <ModalScroll2
				openModal={openDetalleOrden}
				handleClose={() => {
					setOpenDetalleOrden(!openDetalleOrden);
				}}
				titulo="Mostrar Detalle Orden"
				padding={2}
			>
				{/* <TablaListaProductos productos={selectedOrder.detalleOrden} /> */}
			{/* </ModalScroll2> */}
		</>
	);
};

export default TablaMostrarOrdenes;
