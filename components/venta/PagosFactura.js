import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, IconButton } from '@material-ui/core';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { FacturaBD } from '../../functions/Factura';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	texto: {
		fontSize: '17px',
	},
	divPadre: {
		width: '100%',
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(5),
	},
	paperPago: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	paperPagoRed: {
		backgroundColor: theme.palette.error.light,
	},
	paperPagoGreen: {
		backgroundColor: theme.palette.success.light,
	},
	paperNoHayPago: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
		backgroundColor: theme.palette.warning.light,
	},
	paperRealizarPago: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
		textAlign: 'center',
		backgroundColor: theme.palette.grey[200],
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: theme.palette.grey[300],
		},
	},
}));

const PagosFactura = (props) => {
	const classes = useStyles();

	const { paymentMethods, getPaymentMethods } = useContext(GlobalDataContext);
	const {
		filaActiva,
		handleOpenModalCrearPago,
		handleOpenConfirmCancelPayment,
	} = useContext(EditarOrdenesContext);

	useEffect(() => {
		if (!paymentMethods) getPaymentMethods();
	}, []);

	const factura = new FacturaBD(filaActiva.Factura);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Pagos</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ width: '100%' }}>
				<div className={classes.divPadre}>
					{filaActiva.Factura.Pagos.length > 0 ? (
						<>
							{filaActiva.Factura.Pagos.map((x, i) => (
								<Paper
									key={i}
									className={clsx(
										classes.paperPago,
										x.importe > 0
											? classes.paperPagoGreen
											: classes.paperPagoRed
									)}
									variant="elevation"
									elevation={6}
								>
									<Grid container>
										<Grid item xs={1} style={{ fontWeight: 'bold' }}>
											{i + 1}
										</Grid>
										<Grid item xs={3}>
											{paymentMethods
												? paymentMethods.find((y) => y.id === x.MetodoPagoId)
														.descripcion
												: null}
										</Grid>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											{moment(x.createdAt).format('DD-MM-YYYY')}
										</Grid>
										<Grid item xs={3} style={{ textAlign: 'right' }}>
											{parseFloat(x.importe).toFixed(2)}
										</Grid>
										<Grid item xs={3} style={{ textAlign: 'right' }}>
											{x.tipo !== 'nc' &&
											x.estado !== 'c' &&
											filaActiva.OrdenEstado.descripcion !== 'Finalizado' ? (
												<IconButton
													size="small"
													onClick={() => {
														props.setActivePayment({
															id: x.id,
															methodPayment: x.MetodoPagoId,
														});
														handleOpenConfirmCancelPayment(true);
													}}
												>
													<ClearIcon fontSize="small" />
												</IconButton>
											) : null}
										</Grid>
									</Grid>
								</Paper>
							))}
						</>
					) : (
						<Paper
							className={classes.paperNoHayPago}
							variant="elevation"
							elevation={6}
						>
							<Typography align="center">No hay pagos realizados</Typography>
						</Paper>
					)}
					{factura.importeFinal - factura.sumaPagos() > 0 &&
					filaActiva.OrdenEstado.descripcion !== 'Finalizado' ? (
						<Paper
							className={classes.paperRealizarPago}
							variant="elevation"
							elevation={6}
							onClick={() => {
								handleOpenModalCrearPago();
							}}
						>
							<AddIcon fontSize="small" />
						</Paper>
					) : null}
					<ImporteFlexGrow titulo="total pagado" childrenNumDecimal>
						{factura.sumaPagos()}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="queda por pagar" childrenNumDecimal>
						{factura.importeFinal - factura.sumaPagos()}
					</ImporteFlexGrow>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default PagosFactura;
