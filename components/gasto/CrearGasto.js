import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotonSuccess from '../generales/botones/BotonSuccess';
import ModalCentrado from '../generales/ModalCentrado';
import GastoContext from '../../context/gasto/GastoContext';
import FormGasto from './FormGasto';

const useStyles = makeStyles(() => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
}));

const CrearGasto = () => {
	const classes = useStyles();
	const { openModalCreateExpense, handleOpenModalCreateExpense } =
		useContext(GastoContext);

	return (
		<ModalCentrado
			titulo="Nuevo Gasto"
			padding={16}
			width={600}
			openModal={openModalCreateExpense}
			handleClose={() => {
				handleOpenModalCreateExpense(false);
			}}
			footer={
				<BotonSuccess
					type="submit"
					form="form-gasto"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			}
		>
			<FormGasto
				type="create"
				handleClose={() => {
					handleOpenModalCreateExpense(false);
				}}
			/>
		</ModalCentrado>
	);
};

export default CrearGasto;
