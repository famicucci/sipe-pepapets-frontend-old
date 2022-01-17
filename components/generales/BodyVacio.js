import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

const BodyVacio = ({ content, columnas, height }) => {
	if (!height) {
		height = 53;
	}

	return (
		<TableRow style={{ height: height }}>
			<TableCell align="center" colSpan={columnas.length}>
				<Typography align="center">{content}</Typography>
			</TableCell>
		</TableRow>
	);
};

export default BodyVacio;
