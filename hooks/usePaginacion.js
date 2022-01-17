import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

// botones primer página y última página
const TablePaginationActions = (props) => {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
};

// retorna tabla footer
const usePaginacion = (rows, rowsPerPageIniciales) => {
	const [page, setPage] = useState(0);

	let initialState;
	if (rowsPerPageIniciales) {
		initialState = rowsPerPageIniciales;
	} else {
		rowsPerPageIniciales = 10;
	}

	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageIniciales);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// recorta array rows para mostrar pagina
	const cortePagina =
		rowsPerPage > 0
			? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			: rows;

	// agrega filas vacías cuando las rows no completan toda la página
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const filasVacias = emptyRows > 0 && (
		<TableRow style={{ height: 53 * emptyRows }}>
			<TableCell colSpan={10} />
		</TableRow>
	);

	const bodyVacio = (columnas, mensaje) => {
		if (!mensaje) {
			mensaje = 'No hay datos que mostrar';
		}
		return (
			<TableRow style={{ height: 53 }}>
				<TableCell align="center" colSpan={columnas.length}>
					{mensaje}
				</TableCell>
			</TableRow>
		);
	};

	const FooterTabla = () => {
		if (rows.length === 0) return null;

		return (
			<TableFooter>
				<TableRow>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
						colSpan={10}
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						labelRowsPerPage="Filas por página:"
						SelectProps={{
							inputProps: { 'aria-label': 'rows per page' },
							native: true,
						}}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/>
				</TableRow>
			</TableFooter>
		);
	};

	return [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio];
};

export default usePaginacion;
