import React, { Component } from 'react'
import { CheckoutForm, UserPage } from './index.js'

export default class Checkout extends Component {
	render() {
		return (
			<div>
				<UserPage />
				<p>Total: {this.props.totalPrice}</p>
				<CheckoutForm sum={this.props.totalPrice} />
			</div>
		)
	}
}
