import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';

const BotonTippyHoverTabla = ({ icono, contenidoTippy }) => {
	const [nota, setNota] = useState(null);

	const handleOnShowObservaciones = (contenido) => {
		const a = <p>{contenido}</p>;
		setNota(a);
	};

	return (
		<Tippy
			content={nota}
			interactive={true}
			theme={'light-border'}
			placement={'left'}
			onShow={() => {
				handleOnShowObservaciones(contenidoTippy);
			}}
		>
			<IconButton size="small">{icono}</IconButton>
		</Tippy>
	);
};

export default BotonTippyHoverTabla;
