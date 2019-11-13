import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const calculateItemsInCart = cart => {
	const items = Object.values(cart)
	if (items.length == 0) {
		return 0
	} else {
		return items.reduce((a, b) => a + b)
	}
}

const Navbar = ({ handleClick, isLoggedIn, user, cart }) => {
	return (
		<div className="nav-header">
			<Link to="/">
				<h1>OLD TOWN NODE</h1>
			</Link>

			<nav>
				{isLoggedIn ? (
					<div>
						{/* The navbar will show these links after you fa-9x log in */}

						<a href="#" onClick={handleClick}>
							Logout
						</a>

						<Link to={`/users/${user.id}`}>Profile</Link>
						<Link to="/products">Products</Link>
						<Link to={`/users/${user.id}/cart`}>
							<i className="fas fa-shopping-cart fa-2x">
								{calculateItemsInCart(cart)}
							</i>
						</Link>
					</div>
				) : (
					<div>
						{/* The navbar will show these links before you log in */}
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
						<Link to="/products">Products</Link>
						<Link to="/users/0/cart">
							<i className="fas fa-shopping-cart fa-2x">
								{calculateItemsInCart(cart)}
							</i>
						</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		cart: state.cart,
		isLoggedIn: !!state.user.loggedInUser.id || !!state.user.user.admin,
		user: state.user.loggedInUser
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout())
		}
	}
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
