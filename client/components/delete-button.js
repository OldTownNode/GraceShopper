import React from 'react'
export default function DeleteButton(props) {
	return (
		<button
			type="button"
			className="delete-button"
			onClick={() => props.delete(props.product)}
		>
			Remove
		</button>
	)
}
