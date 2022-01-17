class Direccion {
	constructor(direccionesCliente, valActualSelect) {
		this.direcciones = direccionesCliente;
		this.valActualSelect = valActualSelect;
	}

	creaDireccionesSelect() {
		let dataDirecciones = [];

		if (this.direcciones.length === 0) {
			dataDirecciones = [
				{ id: 0, descripcion: 'No hay direcciones para este cliente' },
			];
		} else {
			dataDirecciones = this.direcciones.map((x) => ({
				id: x.id,
				descripcion: `${x.calle} ${x.numeroCalle}, ${x.piso}, ${x.depto}, ${x.barrio}, ${x.ciudad}`,
			}));
		}

		return dataDirecciones;
	}

	static transformDirection = (objDirection) => {
		const checkProperty = (objDirection, key) => {
			let string = '';
			if (objDirection.hasOwnProperty(key)) {
				string = objDirection[key];
			}
			return string;
		};

		const street = checkProperty(objDirection, 'calle');
		const streetNumber = checkProperty(objDirection, 'numeroCalle');
		const floor = checkProperty(objDirection, 'piso');
		const cp = checkProperty(objDirection, 'codPostal');
		const aparment = checkProperty(objDirection, 'depto');
		const neighborhood = checkProperty(objDirection, 'barrio');
		const city = checkProperty(objDirection, 'ciudad');
		const reference = checkProperty(objDirection, 'refDireccion');

		const adressInit = '';
		const adress = adressInit.concat(
			street,
			' ',
			streetNumber,
			', ',
			cp,
			', ',
			floor,
			', ',
			aparment,
			', ',
			neighborhood,
			', ',
			city,
			', ',
			reference
		);

		return adress;
	};

	creaInitSelectDireccion() {
		const dataDirecciones = this.creaDireccionesSelect();

		let initSelectDireccion;
		if (this.direcciones.length === 0) {
			initSelectDireccion = dataDirecciones[0].id;
		} else {
			if (this.valActualSelect) {
				initSelectDireccion = this.valActualSelect;
			} else {
				initSelectDireccion = dataDirecciones[0].id;
			}
		}
		return initSelectDireccion;
	}
}

class Envio {
	constructor(
		modoDirecc,
		valDireccionEnvioSelect,
		direccionEnvioinput,
		direccionesCliente
	) {
		this.modoDirecc = modoDirecc;
		this.valDireccionEnvioSelect = valDireccionEnvioSelect;
		this.direccionEnvioinput = direccionEnvioinput;
		this.direccionesCliente = direccionesCliente;
	}

	getDireccionSegunModoDirecc() {
		let direccionEnvio;
		if (this.modoDirecc === 'select') {
			direccionEnvio = this.constructor.getDireccionSegunValue(
				this.valDireccionEnvioSelect,
				this.direccionesCliente
			);
		} else if (this.modoDirecc === 'input') {
			direccionEnvio = this.direccionEnvioinput;
		}
		return direccionEnvio;
	}

	static getDireccionSegunValue(value, direccionesCliente) {
		const r = direccionesCliente.find((x) => x.id === value);

		const direccion = r.descripcion;

		return direccion;
	}
}

class TipoEnvio {
	constructor(tiposEnvio, tipoEnvioId) {
		this.tiposEnvio = tiposEnvio;
		this.tipoEnvioId = tipoEnvioId;
	}

	getIdYDescripcion() {
		const tipoEnvio = this.tiposEnvio.find((x) => x.id === this.tipoEnvioId);

		return tipoEnvio;
	}

	getDescripcion() {
		const r = this.getIdYDescripcion();

		const descripcion = r.descripcion;

		return descripcion;
	}
}

export { Direccion, Envio, TipoEnvio };
