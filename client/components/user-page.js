import React from 'react'
import { connect } from 'react-redux'

export const UserPage = props => {
	return (
		<div>
			<ul>
				<li>Username: {props.user.username}</li>
				<li>
					Name: {props.user.firstName} {props.user.lastName}
				</li>
				<li>Address: {props.user.address}</li>
				<li>Email: {props.user.email}</li>
			</ul>
		</div>
	)
}

const mapState = state => {
	return {
		user: state.user
	}
}

export default connect(mapState)(UserPage)
