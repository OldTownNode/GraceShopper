import React from 'react'
import { connect } from 'react-redux'

export const UserPage = props => {
	const { username, firstName, lastName, address, email } = props.user
	return (
		<div>
			<ul>
				<li>Username: {username}</li>
				<li>
					Name: {firstName} {lastName}
				</li>
				<li>Address: {address}</li>
				<li>Email: {email}</li>
			</ul>
		</div>
	)
}

// const mapState = state => {
// 	return {
// 		user: state.user
// 	}
// }
//connect(mapState)
export default UserPage
