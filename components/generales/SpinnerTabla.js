import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: '100%',
	},
}));

const SpinnerTabla = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				css={{ height: '100%' }}
				m={1}
				p={1}
				bgcolor="background.paper"
			>
				<CircularProgress />
			</Box>
		</div>
	);
};

export default SpinnerTabla;
