class Cliente {
	constructor(nombre, apellido) {
		this.nombre = nombre;
		this.apellido = apellido;
	}

	get nombreCompleto() {
		return `${this.nombre} ${this.apellido}`;
	}
}

class ClienteBD extends Cliente {
	constructor(clienteBD, nombre, apellido, email) {
		super(nombre, apellido, email);
		this.nombre = clienteBD.nombre;
		this.apellido = clienteBD.apellido;
	}
}

export { Cliente, ClienteBD };
