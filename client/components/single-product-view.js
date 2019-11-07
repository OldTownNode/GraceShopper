import React from 'react'
import AddButton from './add-button'
import DecrementButton from './decrement-button'

export default function SingleProductView(props) {
	console.log('propsin SPV', props)
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
			<AddButton increment={props.increment} product={props.product} />
			<DecrementButton
				decrement={props.decrement}
				product={props.product}
			/>
		</div>
	)
}
