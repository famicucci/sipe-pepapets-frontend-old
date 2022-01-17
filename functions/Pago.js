class Pago {
	constructor(id, importe, fecha, factura, metodoPago, usuario) {
		this.id = id;
		this.importe = importe;
		this.fecha = fecha;
		this.facturaId = factura;
		this.metodoPagoId = metodoPago;
		this.usuarioId = usuario;
	}

	crear() {}
}

class PagoBD extends Pago {
	constructor(pagoBD, id, importe, fecha, factura, metodoPago, usuario) {
		this.id = pagoBD.id;
		this.importe = pagoBD.importe;
		this.fecha = pagoBD.createdAt;
		this.factura = pagoBD.factura;
		this.metodoPago = pagoBD.MetodoPago;
		this.usuario = pagoBD.usuario;
	}
}

export { Pago, PagoBD };
