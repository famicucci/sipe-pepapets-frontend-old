import React, { useContext, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AlertaContext from '../../context/alertas/alertaContext';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerta = () => {
	const { alerta, ocultarAlerta } = useContext(AlertaContext);

	const [open, setOpen] = useState();

	// si alerta viene lleno true, si viene vacio false
	useEffect(() => {
		if (alerta !== null) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [alerta]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		ocultarAlerta();
	};

	return (
		<Snackbar open={open} onClose={handleClose}>
			<Alert onClose={handleClose} severity={alerta.categoria}>
				{alerta.msg}
			</Alert>
		</Snackbar>
	);
};

export default Alerta;
