import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserOrders } from '../store/order'

class UserOrders extends Component {
	componentDidMount() {
		if (this.props.id) this.props.getUserOrders(this.props.id)
	}

	render() {
		return (
			<div>
				{this.props.userOrders &&
					this.props.userOrders.map(userOrder => {
						return (
							<div
								key={userOrder.id}
								className="squareBorder card"
							>
								<span>
									Order Status:{' '}
									{userOrder.status === 'inCart'
										? 'In Cart'
										: `Shipped On ${userOrder.createdAt.substring(
												0,
												10
										  )}`}
								</span>
								{'\t'}
								<span>Order ID: {userOrder.id}</span>
							</div>
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
