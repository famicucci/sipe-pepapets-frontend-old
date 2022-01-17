import React, { useState, useContext, useEffect } from 'react';
import VentasContext from '../../context/ventas/ventasContext';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';

const TotalCarrito = () => {
	const [valor, setValor] = useState(0);

	const { carrito } = useContext(VentasContext);

	useEffect(() => {
		totalCartAmount();
	}, [carrito]);

	const totalCartAmount = () => {
		let total = 0;
		carrito.forEach((x) => {
			total += x['Producto.Precios.pu'] * x.cantidad;
		});
		setValor(total);
	};

	return (
		<ImporteFlexGrow titulo="total" childrenNumDecimal>
			{valor}
		</ImporteFlexGrow>
	);
};

export default TotalCarrito;
