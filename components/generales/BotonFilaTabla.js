import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const BotonFilaTabla = (props) => {
	const { contenido, onClick } = props;

	return (
		<IconButton size="small" edge="start" onClick={onClick} {...props}>
			{contenido}
		</IconButton>
	);
};

export default BotonFilaTabla;
