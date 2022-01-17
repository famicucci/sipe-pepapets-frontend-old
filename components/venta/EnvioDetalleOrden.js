import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FormularioEnvio from './FormularioEnvio';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Direccion } from '../../functions/envio';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Grid } from '@material-ui/core';
import ItemInfoConLabel from '../generales/ItemInfoConLabel';
import clsx from 'clsx';
import SaveIcon from '@material-ui/icons/Save';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	saveButton: { color: theme.palette.success.dark },
}));

const EnvioDetalleOrden = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: false });
	const [edit, setEdit] = useState(false);
	const [edited, setEdited] = useState(false);

	const { shippingTypes, getShippingTypes } = useContext(GlobalDataContext);
	const { filaActiva, modificarOrden } = useContext(EditarOrdenesContext);

	useEffect(() => {
		if (!shippingTypes) getShippingTypes();
	}, []);

	const envioInit = {
		modoDirecc: 'input',
		input: filaActiva.direccionEnvio,
		select: null,
		tipo: filaActiva.TipoEnvioId,
		costo: filaActiva.tarifaEnvio,
	};

	const modShipping = (stateEnvio) => {
		const ordenId = filaActiva.id;
		const tarifaEnvio = stateEnvio.costo;
		const TipoEnvioId = stateEnvio.tipo;

		const handleAdress = () => {
			if (stateEnvio.modoDirecc === 'input') {
				return stateEnvio.input;
			} else if (stateEnvio.modoDirecc === 'select') {
				return Direccion.transformDirection(stateEnvio.select);
			}
		};

		const direccionEnvio = handleAdress();

		const data = { tarifaEnvio, TipoEnvioId, direccionEnvio };

		modificarOrden(ordenId, data);
		setExpanded({ expanded: false });
	};

	const onClickSummary = () => {
		if (expanded.expanded === true) {
			setExpanded({ expanded: false });
		} else if (expanded.expanded === false) {
			setExpanded({ expanded: true });
		}
	};

	const getShippingTypeDescription = (shippintTypeId, shippingTypes) => {
		const r = shippingTypes.find((x) => x.id === shippintTypeId);
		if (r) return r.descripcion;
	};

	const onClickEdit = () => {
		setEdit(true);
	};

	const items = [
		{
			id: 1,
			label: 'Dirección',
			contenido: filaActiva.direccionEnvio,
			ancho: 12,
		},
		{
			id: 2,
			label: 'Tipo',
			contenido: shippingTypes
				? getShippingTypeDescription(filaActiva.TipoEnvioId, shippingTypes)
				: null,
			ancho: 6,
		},
		{
			id: 3,
			label: 'Costo',
			contenido: filaActiva.tarifaEnvio,
			ancho: 6,
		},
	];

	return (
		<Accordion {...expanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={onClickSummary}
			>
				<Typography className={classes.heading}>Envío</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{!edit ? (
					<Grid container spacing={2}>
						{items.map((x) => (
							<ItemInfoConLabel
								key={x.id}
								label={x.label}
								contenido={x.contenido}
								ancho={x.ancho}
							/>
						))}
					</Grid>
				) : (
					<FormularioEnvio
						facturasOrden={filaActiva.Facturas ? filaActiva.Facturas : []}
						handleClose={() => {
							setEdit(false);
						}}
						initialState={envioInit}
						tiposEnvio={shippingTypes}
						cliente={filaActiva.Cliente}
						handleEnvio={modShipping}
						checkForChanges={setEdited}
					/>
				)}
			</AccordionDetails>
			<Divider />
			{!filaActiva.Factura ? (
				<AccordionActions>
					<CopyToClipboard
						text={`${getShippingTypeDescription(
							filaActiva.TipoEnvioId,
							shippingTypes
						)}\n${
							filaActiva.direccionEnvio ? filaActiva.direccionEnvio : ' - '
						}\n${filaActiva.tarifaEnvio}`}
					>
						<IconButton type="button" size="small">
							<FileCopyOutlinedIcon />
						</IconButton>
					</CopyToClipboard>
					<IconButton size="small" onClick={onClickEdit}>
						<EditOutlinedIcon />
					</IconButton>
					<IconButton size="small" type="submit" form="form-envio">
						{!edited ? (
							<SaveOutlinedIcon />
						) : (
							<SaveIcon
								className={clsx({
									[classes.saveButton]: edited,
								})}
							/>
						)}
					</IconButton>
				</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default EnvioDetalleOrden;
