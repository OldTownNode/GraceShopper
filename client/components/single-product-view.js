import React from 'react'
import ProductForm from './product-form'
import AddButton from './add-button'
import DecrementButton from './decrement-button'
import Loading from './loading'

export default function SingleProductView(props) {
	const { name, description, imageUrl, inventory, price } = props.product
	return (
		<div className="single-product-view">
			<div className="product-detail-left-half">
				<h2>{name}</h2>

				<img className="product-detail-image" src={imageUrl} />
			</div>
			<div className="vertical-divider" />
			<div className="product-detail-right-half">
				<h2>
					<div>{`price: ${(price / 100).toFixed(2)}`}</div>
					<div>{`inventory: ${inventory}`}</div>
				</h2>
				<p>{description}</p>
				<div className="button-container">
					<AddButton
						increment={props.increment}
						product={props.product}
					/>
					<DecrementButton
						decrement={props.decrement}
						product={props.product}
					/>
				</div>
			</div>
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
