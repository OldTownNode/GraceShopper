import React, { Component } from 'react'
import { connect } from 'react-redux'

class AllUsers extends Component {
	componentDidMount() {}
	render() {
		return (
			<div>
				<ul>
					<li>Username: {this.props.user.username}</li>
					<li>
						Name: {this.props.user.firstName}{' '}
						{this.props.user.lastName}
					</li>
					<li>Address: {this.props.user.address}</li>
					<li>Email: {this.props.user.email}</li>
				</ul>
			</div>
		)
	}
}

const mapState = state => {
	return {
		user: state.user
	}
}

export default connect(mapState)(AllUsers)
