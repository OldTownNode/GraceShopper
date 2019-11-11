import React from 'react'
import CartListItem from './cart-list-item'
import { connect } from 'react-redux'
import { completeOrderThunk } from '../store/cartReducer'

class CartView extends React.Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.completeOrderThunk()
	}

	render() {
		const productIds = Object.keys(this.props.cart)
		const quantities = Object.values(this.props.cart)

		let totalPrice = 0.0
		let userparam = 0
		if (this.props.userId) userparam = this.props.userId
		return (
			<div>
				{productIds.map((id, index) => {
					let product = this.props.products.filter(element => {
						return element.id.toString() === id
					})[0]
					if (product) {
						totalPrice += product.price * quantities[index]
						return (
							<span key={id}>
								<CartListItem
									product={product}
									quantity={quantities[index]}
									increment={this.props.increment}
									decrement={this.props.decrement}
									delete={this.props.delete}
								/>
							</span>
						)
					}
				})}

				<h4>Total: ${totalPrice}</h4>
				<form onSubmit={() => this.handleSubmit(event)}>
					<button type="submit" className="checkout-button">
						Checkout
					</button>
				</form>
			</div>
		)
	}
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
		completeOrderThunk: () => dispatch(completeOrderThunk())
	}
}
export default connect(mapState, mapDispatch)(CartView)
