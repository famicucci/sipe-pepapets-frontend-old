import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const RowColorIntercalado = (props) => {
	return <StyledTableRow>{props.children}</StyledTableRow>;
};

export default RowColorIntercalado;
