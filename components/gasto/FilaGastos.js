import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import GastoContext from '../../context/gasto/GastoContext';
import SelectStatusPayment from './SelectStatusPayment';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const FilaGastos = (props) => {
	const { expenseCategories, expenseSubcategories } =
		useContext(GlobalDataContext);
	const { handleOpenModalEditExpense } = useContext(GastoContext);

	return (
		<RowColorIntercalado>
			<TableCell align="center">
				<SelectStatusPayment
					content={props.fila.estado}
					expenseId={props.fila.id}
				/>
			</TableCell>
			<TableCell align="center">{props.fila.createdAt}</TableCell>
			<TableCell align="left">{props.fila.categoria}</TableCell>
			<TableCell align="left">{props.fila.subcategoria}</TableCell>
			<TableCell align="left">{props.fila.descripcion}</TableCell>
			<TableCell align="center">
				{parseFloat(props.fila.importe).toFixed(2)}
			</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => {
						handleOpenModalEditExpense(props.fila.id);
					}}
				>
					<EditOutlinedIcon />
				</IconButton>
			</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaGastos;
