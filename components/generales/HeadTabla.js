import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme) => ({
	head: {
		fontSize: 15.5,
		color: theme.palette.common.black,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const HeadTabla = (props) => {
	const { columnas } = props;

	return (
		<TableHead>
			<TableRow>
				{columnas.map((columna) => (
					<StyledTableCell
						key={columna.id}
						align={columna.align}
						style={{ minWidth: columna.minWidth }}
					>
						{!columna.boton ? columna.nombre : null}
					</StyledTableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default HeadTabla;
