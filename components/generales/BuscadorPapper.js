import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

const BuscadorPapper = ({ busqueda, handleBusqueda, estilos }) => {
	const classes = useStyles();

	const onChange = (event) => {
		handleBusqueda(event.target.value);
	};

	const onClick = () => {
		handleBusqueda('');
	};

	return (
		<Paper component="form" className={classes.root} style={{ ...estilos }}>
			<IconButton className={classes.iconButton}>
				<SearchIcon />
			</IconButton>
			<InputBase
				className={classes.input}
				value={busqueda}
				onChange={onChange}
				placeholder="Producto..."
			/>
			<IconButton className={classes.iconButton} onClick={onClick}>
				<ClearIcon />
			</IconButton>
		</Paper>
	);
};

export default BuscadorPapper;
