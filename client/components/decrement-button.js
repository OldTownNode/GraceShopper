import React from 'react'
export default function DecrementButton(props) {
	return (
		<button
			type="button"
			className="decrement-button"
			onClick={() => props.decrement(props.product)}
		>
			-
		</button>
	)
}
