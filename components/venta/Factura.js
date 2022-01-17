import React, { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Box, Divider } from '@material-ui/core';
import ModalScroll2 from '../generales/ModalScroll2';
import { ClienteBD } from '../../functions/Cliente';
import { FacturaBD } from '../../functions/Factura';
import TablaListaProductos from '../generales/TablaListaProductos';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';
import PagosFactura from './PagosFactura';
import ConfirmarCancelarFactura from './ConfirmarCancelarFactura';
import ConfirmarCancelarPago from './ConfirmarCancelarPago';
import { useReactToPrint } from 'react-to-print';
import FacturaToPrint from './FacturaToPrint';

const useStyles = makeStyles((theme) => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	contenido: { fontSize: theme.typography.pxToRem(17) },
	divider: { marginTop: theme.spacing(3), marginBottom: theme.spacing(0) },
	boxPadre: { width: '100%' },
	boxImportes: { width: '50%' },
}));

const Factura = () => {
	const classes = useStyles();

	const {
		filaActiva,
		openModalFactura,
		openModalConfirmarCancelarFactura,
		handleCloseModal,
		handleFilaActivaOrden,
		handleOpenModalConfirmarCancelarFactura,
		openModalConfirmarCancelarPago,
	} = useContext(EditarOrdenesContext);

	const [activePayment, setActivePayment] = useState(null);

	const cliente = new ClienteBD(filaActiva.Cliente);
	const factura = new FacturaBD(filaActiva.Factura);

	const getStatusButtonCancel = (payments) => {
		let sum = 0;
		payments.forEach((x) => {
			sum += parseFloat(x.importe);
		});

		if (sum === 0) return { disabled: false };
		else return { disabled: true };
	};

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<ModalScroll2
			openModal={openModalFactura}
			handleClose={() => {
				handleCloseModal();
				handleFilaActivaOrden(null);
			}}
			padding={2}
			maxWidth={900}
			titulo={`Factura ${factura.id}`}
			anexoTitulo={cliente.nombreCompleto}
			morevertactions={[
				{
					content: 'imprimir',
					function: handlePrint,
				},
				{
					content: 'cancelar',
					function: () => {
						handleOpenModalConfirmarCancelarFactura(true);
					},
					status: getStatusButtonCancel(filaActiva.Factura.Pagos),
				},
			]}
		>
			<div style={{ display: 'none' }}>
				<FacturaToPrint factura={filaActiva.Factura} ref={componentRef} />
			</div>
			<TablaListaProductos productos={filaActiva.Factura.detalleFactura} />
			<Divider className={classes.divider} variant="fullWidth" />
			<Box
				className={classes.boxPadre}
				display="flex"
				justifyContent="flex-end"
			>
				<Box className={classes.boxImportes}>
					<ImporteFlexGrow titulo="subtotal" childrenNumDecimal>
						{factura.importe}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="descuento" childrenNumDecimal>
						{factura.descuento}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="envio" childrenNumDecimal>
						{factura.tarifaEnvio}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="importe total" childrenNumDecimal>
						{factura.importeFinal}
					</ImporteFlexGrow>
				</Box>
			</Box>
			<PagosFactura setActivePayment={setActivePayment} />
			{openModalConfirmarCancelarFactura ? <ConfirmarCancelarFactura /> : null}
			{openModalConfirmarCancelarPago ? (
				<ConfirmarCancelarPago
					id={activePayment.id}
					methodPayment={activePayment.methodPayment}
				/>
			) : null}
		</ModalScroll2>
	);
};

export default Factura;
