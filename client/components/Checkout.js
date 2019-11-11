import React, { Component } from 'react'
import { CheckoutForm, UserPage, UserUpdate } from './index.js'

export default class Checkout extends Component {
	render() {
		return (
			<div>
				<UserUpdate />
				<p>Total: {this.props.totalPrice}</p>
				<CheckoutForm sum={this.props.totalPrice} />
			</div>
		)
	}
}
