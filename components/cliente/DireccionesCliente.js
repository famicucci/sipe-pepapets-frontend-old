import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	p: {
		lineHeight: theme.spacing(0.2),
	},
}));

const BoxSpan = (props) => {
	return (
		<Box {...props} component="span">
			{props.children}
		</Box>
	);
};

const SpanBold = withStyles((theme) => ({
	root: {
		marginRight: theme.spacing(1),
		fontWeight: 'bold',
	},
}))(BoxSpan);

const DireccionesCliente = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.direcciones.length > 0 ? (
				<>
					{props.direcciones.map((x, i) => (
						<Box key={i} display="flex">
							<Box flexGrow={1}>
								<p className={classes.p}>
									<SpanBold>{`${i + 1})`}</SpanBold>
									<SpanBold>calle:</SpanBold>
									{`${x.calle} ${x.numeroCalle}, `}
									<SpanBold>piso:</SpanBold>
									{x.piso ? `${x.piso}, ` : '- . '}
									<SpanBold>depto:</SpanBold>
									{x.depto ? `${x.depto}, ` : '- . '}
									<SpanBold>cp:</SpanBold>
									{x.codPostal ? `${x.codPostal}, ` : '- . '}
									<SpanBold>barrio:</SpanBold>
									{x.barrio ? `${x.barrio}, ` : '- , '}
									<SpanBold>ciudad:</SpanBold>
									{x.ciudad ? `${x.ciudad}, ` : '- , '}
									<SpanBold>referencia:</SpanBold>
									{x.refDireccion ? `${x.refDireccion}` : '- . '}
								</p>
								{props.type === 'edit' ? <Divider variant="fullWidth" /> : null}
							</Box>
							{props.type === 'edit' ? (
								<Box display="flex" alignItems="center">
									<IconButton
										size="medium"
										onClick={() => {
											props.deleteAdress(x.id);
										}}
									>
										<ClearIcon
											fontSize="default"
											color="error"
											fontSize="small"
										/>
									</IconButton>
								</Box>
							) : null}
						</Box>
					))}
				</>
			) : (
				<p>Este cliente no tiene direcciones cargadas</p>
			)}
		</>
	);
};

export default DireccionesCliente;
