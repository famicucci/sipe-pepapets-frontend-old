import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { TextField } from '@material-ui/core';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { DetalleOrden } from '../../functions/editarordenes';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';
import DescuentoCrearFactura from './DescuentoCrearFactura';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	texto: {
		fontSize: '17px',
	},
	textoConBoton: {
		fontSize: '17px',
		marginLeft: theme.spacing(1),
	},
	box: {
		width: '100%',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(5),
	},
}));

const ImporteCrearFactura = (props) => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: true });
	const [expandeDescuento, setExpandeDescuento] = useState(false);

	const [subtotal, setSubtotal] = useState('');
	const [montoDescuento, setMontoDescuento] = useState('');
	const [total, setTotal] = useState(0);

	const { filaActiva } = useContext(EditarOrdenesContext);

	useEffect(() => {
		// calcular el importe total
		const resultado =
			subtotal - montoDescuento + parseFloat(filaActiva.tarifaEnvio);
		setTotal(resultado);
	}, [subtotal, montoDescuento]);

	useEffect(() => {
		props.tochangestate(subtotal, montoDescuento, total);
	}, [total]);

	useEffect(() => {
		const detalleOrden = new DetalleOrden(filaActiva.detalleOrden);
		const r = detalleOrden.subtotal();
		setSubtotal(r);
	}, [filaActiva.detalleOrden]);

	const onClickSummary = () => {
		if (expanded.expanded === true) {
			setExpanded({ expanded: false });
		} else if (expanded.expanded === false) {
			setExpanded({ expanded: true });
		}
	};

	return (
		<Accordion {...expanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={onClickSummary}
			>
				<Typography className={classes.heading}>Totales</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<div style={{ width: '100%' }}>
					<ImporteFlexGrow
						titulo="Subtotal"
						childrenNumDecimal
						funcContenido={
							<BotonFilaTabla
								contenido={
									!expandeDescuento ? (
										<ArrowDropDownIcon />
									) : (
										<ArrowDropUpIcon />
									)
								}
								onClick={() => {
									setExpandeDescuento(!expandeDescuento);
								}}
							/>
						}
					>
						{subtotal}
					</ImporteFlexGrow>
					<Collapse in={expandeDescuento} timeout="auto" unmountOnExit>
						<ImporteFlexGrow titulo="Descuento">
							<DescuentoCrearFactura
								tochangestate={setMontoDescuento}
								monto={subtotal}
							/>
						</ImporteFlexGrow>
					</Collapse>

					<ImporteFlexGrow titulo="Envío" childrenNumDecimal>
						{filaActiva.tarifaEnvio}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="Importe Total" childrenNumDecimal>
						{total}
					</ImporteFlexGrow>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default ImporteCrearFactura;
