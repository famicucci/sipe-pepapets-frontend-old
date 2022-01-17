import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import VentasContext from '../../context/ventas/ventasContext';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import ClearIcon from '@material-ui/icons/Clear';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
	nombre: {
		marginLeft: theme.spacing(2),
	},
}));

const ClienteCarr = () => {
	const classes = useStyles();

	const { cliente, handleCliente, handleEnvio } = useContext(VentasContext);

	let open;
	if (cliente) {
		open = true;
	} else {
		open = false;
	}

	return (
		<>
			{open ? (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Divider variant="fullWidth" />
					<Box display="flex" p={1} bgcolor="background.paper">
						<Box display="flex" alignItems="center" flexGrow={1}>
							<Typography variant="body2">Cliente:</Typography>
							<Typography className={classes.nombre} variant="body2">
								{`${cliente.nombre} ${cliente.apellido}`}
							</Typography>
						</Box>
						<Box>
							<BotonFilaTabla
								contenido={<ClearIcon fontSize="small" />}
								onClick={() => {
									handleCliente(null);
									handleEnvio(null);
								}}
							/>
						</Box>
					</Box>
				</Collapse>
			) : null}
		</>
	);
};

export default ClienteCarr;
