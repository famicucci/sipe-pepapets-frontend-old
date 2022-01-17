import React, { createContext, useState } from 'react';

// crear context
export const MenuContext = createContext();

const MenuProvider = (props) => {
	const [openStock, setOpenStock] = useState(false);
	const [openVentas, setOpenVentas] = useState(false);

	// indica el boton activo
	const [botonActivo, setBotonActivo] = useState('precios');

	const activarBoton = (botonActual, botonActivo) => {
		if (botonActual === botonActivo) {
			return true;
		} else {
			return false;
		}
	};

	const handleClickStock = () => {
		setOpenStock(!openStock);
	};

	const handleClickVentas = () => {
		setOpenVentas(!openVentas);
	};

	return (
		<MenuContext.Provider
			value={{
				openStock,
				openVentas,
				botonActivo,
				setOpenStock,
				handleClickStock,
				handleClickVentas,
				setBotonActivo,
				activarBoton,
			}}
		>
			{props.children}
		</MenuContext.Provider>
	);
};

export default MenuProvider;
