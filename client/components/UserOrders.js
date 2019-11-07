import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserOrders } from '../store/order'

class UserOrders extends Component {
	componentDidMount() {
		this.props.getUserOrders(this.props.match.params.id)
	}

	render() {
		console.log(this.props)
		return (
			<div>
				{this.props.userOrders &&
					this.props.userOrders.map(userOrder => {
						return (
							<p key={userOrder.id}>
								Order ID: {userOrder.id}
								Order Status:{userOrder.status}
							</p>
						)
					})}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userOrders: state.orders
	}
}

const mapDispatchToState = dispatch => {
	return {
		getUserOrders: id => dispatch(getUserOrders(id))
	}
}

export default connect(mapStateToProps, mapDispatchToState)(UserOrders)
