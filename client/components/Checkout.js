import React, { Component } from 'react'
import { CheckoutForm, UserPage, UserUpdate } from './index.js'

export default class Checkout extends Component {
	render() {
		return (
			<div>
				<UserUpdate />
				<p>Total: {this.props.totalPrice.toFixed(2)}</p>
				<div className="container">
					<div className="card card-stripe">
						<h2>Checkout</h2>
						<div className="card">
							<h3>
								Cart Total · ${this.props.totalPrice.toFixed(2)}
							</h3>
						</div>
						<button type="button">Checkout</button>
					</div>

					<CheckoutForm sum={this.props.totalPrice} />
				</div>
			</div>
		)
	}
}
