class DetalleOrden {
	constructor(detalleOrden) {
		this.detalleOrden = detalleOrden;
	}

	subtotal() {
		const arraySuma = this.detalleOrden.map((x) => x.cantidad * x.pu);
		const resultado = arraySuma.reduce((acc, el) => acc + el, 0);

		return resultado;
	}
}

export { DetalleOrden };
