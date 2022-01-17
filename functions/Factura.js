class DetalleFactura {
	static crearDetalleFactura(detalleOrden) {
		const detalleFactura = detalleOrden.map((x) => ({
			cantidad: x.cantidad,
			pu: x.pu,
			ProductoCodigo: x.ProductoCodigo,
		}));

		return detalleFactura;
	}
}

class Factura {
	constructor(
		id,
		importe,
		descuento,
		tarifaEnvio,
		importeFinal,
		estadoPago,
		observaciones,
		pagos
	) {
		this.id = id;
		this.importe = importe;
		this.descuento = descuento;
		this.tarifaEnvio = tarifaEnvio;
		this.importeFinal = importeFinal;
		this.estadoPago = estadoPago;
		this.observaciones = observaciones;
		this.pagos = pagos;
	}

	sumaPagos() {
		const arraySuma = this.pagos.map((x) => parseFloat(x.importe));
		const resultado = arraySuma.reduce((acc, el) => acc + el, 0);
		return resultado;
	}

	getEstadoPago() {
		const quedaPorPagar = this.importeFinal - this.sumaPagos();

		let estadoPago;
		if (quedaPorPagar === 0) {
			estadoPago = 'Pago';
		} else {
			estadoPago = 'Pendiente';
		}
		return estadoPago;
	}
}

class FacturaBD extends Factura {
	constructor(
		facturaBD,
		id,
		importe,
		descuento,
		tarifaEnvio,
		importeFinal,
		observaciones,
		pagos
	) {
		super(id, importe, descuento, tarifaEnvio, importeFinal, observaciones);
		this.id = facturaBD.id;
		this.importe = facturaBD.importe;
		this.descuento = facturaBD.descuento;
		this.tarifaEnvio = facturaBD.tarifaEnvio;
		this.importeFinal = facturaBD.importeFinal;
		this.estadoPago = facturaBD.estadoPago;
		this.observaciones = facturaBD.observaciones;
		this.pagos = facturaBD.Pagos;
	}
}

export { Factura, FacturaBD, DetalleFactura };
