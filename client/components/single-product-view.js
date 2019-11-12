import React from 'react'
import ProductForm from './product-form'
import AddButton from './add-button'
import DecrementButton from './decrement-button'
import Loading from './loading'

export default function SingleProductView(props) {
	console.log('props in spv', props.user.admin)
	const { name, description, imageUrl, inventory, price } = props.product
	return (
		<div className="single-product-view">
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
			{props.state.name && props.user.admin ? (
				<ProductForm
					state={props.state}
					handleChange={props.handleChange}
					handleSubmit={props.handleSubmit}
				/>
			) : null}
		</div>
	)
}
