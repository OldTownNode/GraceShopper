import React from 'react'
import CartListItem from './cart-list-item'
import { connect } from 'react-redux'
import { completeOrderThunk } from '../store/cartReducer'
import { CheckoutForm, UserUpdate } from './index.js'

class CartView extends React.Component {
	constructor() {
		super()
		this.state = {
			formCompleted: 0
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFauxForm = this.handleFauxForm.bind(this)
	}
	componentDidMount() {
		this.setState({ formCompleted: this.props.userId })
	}
	handleSubmit(event) {
		event.preventDefault()
		this.props.completeOrderThunk()
	}
	handleFauxForm() {
		event.preventDefault()
		this.setState({ formCompleted: 1 })
	}

	render() {
		const productIds = Object.keys(this.props.cart)
		const quantities = Object.values(this.props.cart)
		let totalPrice = 0.0
		let userparam = 0
		if (this.props.userId) userparam = this.props.userId
		return (
			<div>
				{!userparam && !this.state.formCompleted ? (
					<div>
						<h2>Please fill out before you can checkout</h2>
						<UserUpdate
							guest={1}
							dummyhandle={this.handleFauxForm}
						/>
					</div>
				) : (
					<div />
				)}

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
				</div>
				<h2>Total: ${totalPrice}</h2>
				{this.state.formCompleted || this.props.userId ? (
					<div className="container">
						<div className="card">
							<h4>Total: ${totalPrice}</h4>
							<button
								type="submit"
								className="checkout-button"
								onClick={() => this.handleSubmit(event)}
							>
								Checkout
							</button>
						</div>
						<CheckoutForm sum={totalPrice} />
					</div>
				) : (
					<div className="container">
						<div className="card">
							<h4>Total: ${totalPrice}</h4>

							<button type="submit" className="checkout-button">
								Checkout
							</button>
						</div>
						<CheckoutForm sum={totalPrice} />
					</div>
				)}
			</div>
		)
	}
}
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		userId: state.user.loggedInUser.id || state.user.user.id
	}
}

const mapDispatch = dispatch => {
	return {
		completeOrderThunk: () => dispatch(completeOrderThunk())
	}
}
export default connect(mapState, mapDispatch)(CartView)
