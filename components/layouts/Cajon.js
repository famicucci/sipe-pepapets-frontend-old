import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';

import Lista from './Menu/Lista';
import Logo from './Logo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	grow: {
		flexGrow: 1,
	},
}));

const Cajon = (props) => {
	const theme = useTheme();
	const classes = useStyles();

	return (
		<Drawer
			className={classes.drawer}
			variant={props.variant}
			open={props.open}
			onClose={props.onClose ? props.onClose : null}
			classes={{
				paper: classes.drawerPaper,
			}}
			anchor="left"
		>
			<div className={classes.drawerHeader}>
				{theme.direction === 'ltr' ? <Logo color="primary" /> : null}
				<div className={classes.grow} />
				<IconButton onClick={props.onClose}>
					{theme.direction === 'ltr' ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</div>
			<Divider />
			<Lista />
		</Drawer>
	);
};

export default Cajon;
