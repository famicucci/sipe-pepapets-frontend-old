import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import TablaDetalleOrden from './TablaDetalleOrden';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	productsActions: { width: '100%' },
}));

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 400 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{
		id: 4,
		nombre: 'Ver Más',
		align: 'center',
		minWidth: 60,
		boton: true,
	},
];

const Productos = (props) => {
	const classes = useStyles();
	const router = useRouter();

	const { handleCloseModal, handleFilaActivaOrden } =
		useContext(EditarOrdenesContext);

	const onClickEditOrder = () => {
		const cartToEdit = props.filaActiva.detalleOrden.map((x) => ({
			cantidad: x.cantidad,
			['Producto.Precios.pu']: x.pu,
			origen: x.origen,
			ProductoCodigo: x.ProductoCodigo,
			PtoStockId: x.PtoStock ? x.PtoStock.id : 0,
			['PtoStock.descripcion']: x.PtoStock
				? x.PtoStock.descripcion
				: 'Producción',
			['Producto.descripcion']: x.Producto.descripcion,
		}));

		handleCloseModal();
		handleFilaActivaOrden(null);
		props.editOrder(props.filaActiva.id, cartToEdit);
		router.push({
			pathname: '/ventas/editar-orden',
			query: { id: props.filaActiva.id },
		});
	};

	const sumTotalQty = (products) => {
		let qty = 0;
		products.forEach((x) => {
			qty += x.cantidad;
		});
		return qty;
	};

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Productos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box>
					<TablaDetalleOrden
						productos={props.filaActiva.detalleOrden}
						columnas={columnas}
					/>
					<ImporteFlexGrow titulo="Total productos" fontSize={13} marginTop={2}>
						{sumTotalQty(props.filaActiva.detalleOrden)}
					</ImporteFlexGrow>
				</Box>
			</AccordionDetails>
			<Divider />
			{!props.filaActiva.Factura ? (
				<AccordionActions>
					<Box
						className={classes.productsActions}
						display="flex"
						justifyContent="flex-end"
					>
						<IconButton size="small" edge="start" onClick={onClickEditOrder}>
							<EditOutlinedIcon />
						</IconButton>
					</Box>
				</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default Productos;
