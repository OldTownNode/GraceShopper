import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
	<div>
		<h1>OLD TOWN NODE</h1>
		<nav>
			{isLoggedIn ? (
				<div>
					{/* The navbar will show these links after you fa-9x log in */}

					<Link to="/home">Home</Link>

					<a href="#" onClick={handleClick}>
						Logout
					</a>

					<Link to={`/users/${user.id}`}>Profile</Link>
					<Link to="/products">Products</Link>
					<Link to={`/users/${user.id}/cart`}>
						<i className="fas fa-shopping-cart fa-2x" />
					</Link>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/products">Products</Link>
					<Link to="/users/0/cart">
						<i className="fas fa-shopping-cart fa-2x" />
					</Link>
				</div>
			)}
		</nav>
		<hr />
	</div>
)

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.user.loggedInUser.id || !!state.user.user,
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
