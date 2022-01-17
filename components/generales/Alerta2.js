import React, { useEffect, useContext, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AlertaContext from '../../context/alertas/alertaContext';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerta2 = (props) => {
	const { ocultarAlerta } = useContext(AlertaContext);
	if (!props.mensaje) return null;

	const { msg, severity } = props.mensaje;

	const [open, setOpen] = useState();

	useEffect(() => {
		if (props.funcOcultar) {
			props.funcOcultar();
		}
	}, []);

	// si alerta viene lleno true, si viene vacio false
	useEffect(() => {
		if (props.mensaje) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [props.mensaje]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		ocultarAlerta();
	};

	return (
		<Snackbar open={open} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity}>
				{msg}
			</Alert>
		</Snackbar>
	);
};

export default Alerta2;
