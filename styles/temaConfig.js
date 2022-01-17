import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: indigo[700],
		},
		secondary: {
			main: teal[500],
		},
		success: {
			light: green[300],
			main: green[600],
			dark: green[800],
		},
		error: { light: red[300], main: red[600], dark: red[800] },
		warning: { light: yellow[300], main: yellow[600], dark: yellow[700] },
		accion: {
			main: cyan[700],
			dark: cyan[800],
		},
	},
});

export default theme;
