import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

const CollapseTablaDetalleOrden = (props) => {
	const { ptosStockOrigen } = props;

	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
				<Collapse in={props.open} timeout="auto" unmountOnExit>
					<Table size="small" aria-label="purchases">
						<TableBody>
							{ptosStockOrigen.map((x, i) => (
								<TableRow key={i}>
									<TableCell align="left" style={{ width: 20 }}>
										{x.cantidad}
									</TableCell>
									<TableCell>{x.ptoStockDescripcion}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default CollapseTablaDetalleOrden;
