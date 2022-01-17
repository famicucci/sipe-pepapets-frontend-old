import React, { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Box } from '@material-ui/core';
import ProductosCrearFactura from './ProductosCrearFactura';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import ImporteCrearFactura from './ImporteCrearFactura';
import BotonSuccess from '../generales/botones/BotonSuccess';
import NotaCrearFactura from './NotaCrearFactura';
import ConfirmarCrearFactura from './ConfirmarCrearFactura';
import AlertaContext from '../../context/alertas/alertaContext';
import ModalScroll2 from '../generales/ModalScroll2';
import { useReactToPrint } from 'react-to-print';
import FacturaToPrint from './FacturaToPrint';

const useStyles = makeStyles((theme) => ({
	dividerHorizontal: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	dividerVertical: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const CrearFactura = () => {
	const classes = useStyles();

	const {
		filaActiva,
		openModalCrearFactura,
		openModalConfirmarCrearFactura,
		handleOpenModalConfirmarCrearFactura,
		handleCloseModal,
		crearFactura,
		handleOpenModalFactura,
		handleFilaActivaOrden,
	} = useContext(EditarOrdenesContext);
	const { mostrarAlerta } = useContext(AlertaContext);

	const [factura, setFactura] = useState({
		OrdenId: filaActiva.id,
		ClienteId: filaActiva.Cliente.id,
		tarifaEnvio: parseFloat(filaActiva.tarifaEnvio),
		tipo: 'fac',
		estado: 'v',
		estadoPago: 'Pendiente',
		observaciones: '',
		detalleFactura: filaActiva.detalleOrden.map((x) => ({
			cantidad: x.cantidad,
			pu: x.pu,
			ProductoCodigo: x.ProductoCodigo,
			Producto: { descripcion: x.Producto.descripcion },
		})),
		importe: '',
		descuento: '',
		importeFinal: '',
	});

	const onChangeObservaciones = (observaciones) => {
		setFactura({ ...factura, observaciones: observaciones });
	};

	const onChangeImportes = (importe, descuento, importeFinal) => {
		setFactura({
			...factura,
			importe: importe,
			descuento: descuento,
			importeFinal: importeFinal,
		});
	};

	const onClickFacturar = () => {
		if (factura.importeFinal < 0) {
			mostrarAlerta(
				'El importe final no puede ser negativo, descuento no válido',
				'error'
			);
			return;
		}

		handleOpenModalConfirmarCrearFactura();
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// submit
		(async () => {
			await crearFactura(factura);
			await handleCloseModal();
			await handleOpenModalFactura();
		})();
	};

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<ModalScroll2
			openModal={openModalCrearFactura}
			handleClose={() => {
				handleCloseModal();
				handleFilaActivaOrden(null);
			}}
			padding={2}
			titulo={`Facturar orden ${filaActiva.id}`}
			anexoTitulo={`${filaActiva.Cliente.nombre} ${filaActiva.Cliente.apellido}`}
			morevertactions={[
				{
					content: 'imprimir',
					function: handlePrint,
				},
			]}
		>
			<form
				noValidate
				autoComplete="off"
				onSubmit={onSubmit}
				id="form-crear-factura"
			>
				<div style={{ display: 'none' }}>
					<FacturaToPrint factura={factura} ref={componentRef} />
				</div>
				<ProductosCrearFactura productos={filaActiva.detalleOrden} />
				<ImporteCrearFactura tochangestate={onChangeImportes} />
				<NotaCrearFactura tochangestate={onChangeObservaciones} />
				<Divider className={classes.dividerHorizontal} variant="fullWidth" />
				<Box className={classes.footer}>
					<BotonSuccess
						type="button"
						contenido="Facturar"
						className={classes.botonAceptar}
						onClick={onClickFacturar}
					/>
				</Box>
				{openModalConfirmarCrearFactura ? <ConfirmarCrearFactura /> : null}
			</form>
		</ModalScroll2>
	);
};

export default CrearFactura;
