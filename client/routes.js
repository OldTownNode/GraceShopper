import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { me } from './store'
import Orders from './components/orders'
import {
	UserUpdate,
	AllUsers,
	UserPage,
	Login,
	Signup,
	UserHome,
	ConnectedSingleProduct,
	ConnectedProducts
} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn } = this.props

		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route
					path="/products/:id"
					component={ConnectedSingleProduct}
				/>
				<Route path="/products" component={ConnectedProducts} />

				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route path="/home" component={UserHome} />
						<Route
							path="/users/:id/update"
							component={UserUpdate}
						/>
						<Route path="/users/:id" component={UserPage} />
						<Route path="/users" component={AllUsers} />
						<Route path="/orders" component={Orders} />
					</Switch>
				)}
				{/* Displays our Login component as a fallback */}
				<Route component={Login} />
			</Switch>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.loggedInUser.id
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		}
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
