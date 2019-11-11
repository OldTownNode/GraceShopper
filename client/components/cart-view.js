import React from 'react'
import CartListItem from './cart-list-item'
import { CheckoutForm } from './index.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
function CartView(props) {
	const productIds = Object.keys(props.cart)
	const quantities = Object.values(props.cart)

	let totalPrice = 0.0
	let userparam = 0
	if (props.userId) userparam = props.userId
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
			<Link to={`/users/${userparam}/update`}>
				<button>Checkout</button>
			</Link>
			<h4>Total: ${totalPrice}</h4>
			<CheckoutForm sum={totalPrice} />
		</div>
	)
}
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		userId: state.user.loggedInUser.id
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		}
	}
}
export default connect(mapState, mapDispatch)(CartView)
