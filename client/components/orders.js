import React from 'react'
import { connect } from 'react-redux'

import { getAllOrders } from '../store/order'

class Orders extends React.Component {
	componentDidMount() {
		this.props.getAllOrders()
	}
	render() {
		console.log(this.props)
		return (
			<div>
				{this.props.orders &&
					this.props.orders.map(order => {
						return (
							<p key={order.id}>
								{order.id}, {order.status}
							</p>
						)
					})}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders
	}
}

const mapDispatchToState = dispatch => {
	return {
		getAllOrders: () => dispatch(getAllOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToState)(Orders)
