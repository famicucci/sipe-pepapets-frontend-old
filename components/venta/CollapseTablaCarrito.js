import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PtoStockCarrito from './PtoStockCarrito';

const CollapseTablaCarrito = (props) => {
	const { ptosStockOrigen, codigo, direccion } = props.product;

	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
				<Collapse in={props.open} timeout="auto" unmountOnExit>
					{ptosStockOrigen && codigo ? (
						<Table size="small" aria-label="purchases">
							<TableBody>
								{ptosStockOrigen.map((x, i) => (
									<PtoStockCarrito key={i} ptoStock={x} codigo={codigo} />
								))}
							</TableBody>
						</Table>
					) : null}
					{direccion ? direccion.value : null}
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default CollapseTablaCarrito;
