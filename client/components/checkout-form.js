import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { connect } from 'react-redux'
import { findSingleUserThunk } from '../store/user'

function App(props) {
	async function handleToken(token, addresses) {
		const price = props.sum
		const response = await axios.post('/stripe', { token, price })
		const { status } = response.data
		console.log('Response:', response.data)
		// if (status === "success") {
		//   toast("Success! Check email for details", { type: "success" });
		// } else {
		//   toast("Something went wrong", { type: "error" });
		// }
	}

	return (
		<div className="card card-stripe">
			<h2>Pay with Stripe</h2>
			<div className="card">
				<h3>Cart Total · ${(props.sum / 100).toFixed(2)}</h3>
			</div>
			<StripeCheckout
				stripeKey="pk_test_QZiXdK0ubHiHFR1WhJg8PaQg00z05GFUJz"
				token={handleToken}
				amount={props.sum} // stripe uses cents for transactions
				name="Your Cart"
				billingAddress //internal keys - create billing and shipping addresses windows
				shippingAddress // in stripe
			/>
		</div>
	)
}

const mapState = state => {
	return {
		user: state.user,
		loggedIn: state.user.loggedInUser,
		error: state.user.user.error,
		isLoggedIn: !!state.user.loggedInUser.id
	}
}

const mapDispatch = dispatch => {
	return {
		findUser: id => dispatch(findSingleUserThunk(id))
	}
}
export default connect(mapState, mapDispatch)(App)
