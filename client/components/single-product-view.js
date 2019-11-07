import React from 'react'

export default function SingleProductView(props) {
	console.log('props in single product view', props)
	const { name, description, imageUrl, inventory, price } = props.product
	return (
		<div>
			<h1>{name}</h1>
			<a className="img">
				<img src={imageUrl} />
			</a>
			<h2>
				<div>{`price: ${price}`}</div>
				<div>{`inventory: ${inventory}`}</div>
			</h2>
			<p>{description}</p>
		</div>
	)
}
