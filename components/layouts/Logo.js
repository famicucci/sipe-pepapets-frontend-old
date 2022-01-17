import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdjustIcon from '@material-ui/icons/Adjust';

const useStyles = makeStyles((theme) => ({
	icono: {
		marginRight: theme.spacing(0.35),
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	logo: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
}));

const Logo = (props) => {
	const classes = useStyles();

	return (
		<>
			<AdjustIcon className={classes.icono} color={props.color} />
			<Typography className={classes.logo} variant="h6" color={props.color}>
				Sip-e
			</Typography>
		</>
	);
};

export default Logo;
