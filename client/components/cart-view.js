import React from 'react'
import CartListItem from './cart-list-item'
import CheckoutButton from './CheckoutButton'
import { Link } from 'react-router-dom'

export default function CartView(props) {
	const productIds = Object.keys(props.cart)
	const quantities = Object.values(props.cart)

	let totalPrice = 0.0

	return (
		<div>
			{productIds.map((id, index) => {
				let product = props.products.filter(element => {
					return element.id.toString() === id
				})[0]
				if (product) {
					totalPrice += product.price * quantities[index]
					return (
						<span key={id}>
							<CartListItem
								product={product}
								quantity={quantities[index]}
								increment={props.increment}
								decrement={props.decrement}
								delete={props.delete}
							/>
						</span>
					)
				}
			})}
			<h4>Total: ${totalPrice}</h4>
			<Link to="/checkout">
				<CheckoutButton totalPrice={totalPrice} />
			</Link>
		</div>
	)
}
