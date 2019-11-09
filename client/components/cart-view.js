import React from 'react'
import SingleProduct from './single-product'

export default function CartView(props) {
	const productIds = Object.keys(props.cart)
	const quantities = Object.values(props.cart)

	console.log('in cartview. props: ', props)

	let totalPrice = 0.0

	return (
		<div>
			{productIds.map((id, index) => {
				let product = props.products.filter(element => {
					return element.id.toString() === id
				})[0]
				totalPrice += product.price * quantities[index]
				return (
					<span key={id}>
						<SingleProduct products={product} />
						<p>In Cart: {quantities[index]}</p>
					</span>
				)
			})}
			<h4>Total: ${totalPrice}</h4>
		</div>
	)
}
