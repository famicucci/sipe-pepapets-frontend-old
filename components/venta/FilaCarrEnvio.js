import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import VentasContext from '../../context/ventas/ventasContext';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import ClearIcon from '@material-ui/icons/Clear';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
	description: { wordWrap: 'break-word', maxWidth: '250px' },
});

const FilaCarrEnvio = () => {
	const classes = useStyles();

	const { shippingTypes, getShippingTypes } = useContext(GlobalDataContext);
	const { envio, handleEnvio } = useContext(VentasContext);

	const [description, setDescription] = useState(null);

	useEffect(async () => {
		if (!shippingTypes) await getShippingTypes();
	}, []);

	useEffect(() => {
		if (shippingTypes && envio) {
			const r = shippingTypes.find((x) => x.id === envio.tipo);
			if (r) setDescription(r.descripcion);
		}
	}, [shippingTypes]);

	if (!envio) return null;
	if (envio.costo === 0 && envio.tipo === 1) return null;

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">1</TableCell>
				<TableCell className={classes.description}>
					<p className={classes.negrita}>Envío</p>
					<p>{description}</p>
				</TableCell>
				<TableCell align="center">
					{parseFloat(envio.costo).toFixed(2)}
				</TableCell>
				<TableCell align="center">
					{parseFloat(envio.costo).toFixed(2)}
				</TableCell>
				<TableCell align="center">
					<BotonFilaTabla
						contenido={<ClearIcon color="error" fontSize="small" />}
						onClick={() => {
							handleEnvio(null);
						}}
					/>
				</TableCell>
			</TableRow>
		</>
	);
};

export default FilaCarrEnvio;
