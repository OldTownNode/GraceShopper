import React from 'react'

export default function AddButton(props) {
	console.log('propsin button', props)
	return (
		<button
			type="button"
			className="add-button"
			onClick={() => props.increment(props.product)}
		>
			+
		</button>
	)
}
