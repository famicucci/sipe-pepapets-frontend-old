import React, { createContext, useState } from 'react';

// crear context
export const BotoneraCarrContext = createContext();

const BotoneraCarrProvider = (props) => {
	const [openNota, setOpenNota] = useState(false);
	const [openVerMas, setOpenVerMas] = useState(false);
	const [openModalCliente, setOpenModalCliente] = useState(false);
	const [openModalAgregarEnvioCarrito, setOpenModalAgregarEnvioCarrito] =
		useState(false);

	const handleOpenNota = () => {
		if (openVerMas) {
			setOpenVerMas(false);
		}
		setOpenNota(!openNota);
	};

	const handleVerMas = () => {
		if (openNota) {
			setOpenNota(false);
		}
		setOpenVerMas(!openVerMas);
	};

	const handleOpenCliente = () => {
		setOpenModalCliente(true);
	};

	const handleOpenEnvio = () => {
		setOpenModalAgregarEnvioCarrito(true);
	};

	const handleClose = () => {
		setOpenModalCliente(false);
		setOpenModalAgregarEnvioCarrito(false);
	};

	return (
		<BotoneraCarrContext.Provider
			value={{
				openNota,
				openVerMas,
				openModalCliente,
				openModalAgregarEnvioCarrito,
				handleOpenNota,
				handleVerMas,
				handleOpenCliente,
				handleOpenEnvio,
				setOpenModalCliente,
				handleClose,
			}}
		>
			{props.children}
		</BotoneraCarrContext.Provider>
	);
};

export default BotoneraCarrProvider;
