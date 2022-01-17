import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		position: 'absolute',
		top: 0,
		bottom: 0,
	},
	spinner: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		margin: 'auto',
	},
}));

const SpinnerPantalla = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Box>
				<CircularProgress
					className={classes.spinner}
					color="primary"
					thickness={5}
					size={55}
				/>
			</Box>
		</div>
	);
};

export default SpinnerPantalla;
