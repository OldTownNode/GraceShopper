import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { findSingleUserThunk } from '../store/user'

class UserPage extends React.Component {
	constructor() {
		super()
		this.state = {
			allUsers: [],
			user: {}
		}
	}
	componentDidMount() {
		if (this.props.match) this.props.findUser(this.props.match.params.id)
	}
	render() {
		let uservalue
		if (this.props.user.user) uservalue = this.props.user.user
		else uservalue = this.props.user
		const { username, firstName, lastName, address, email } = uservalue
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
				<Link to={`/users/${uservalue.id}/update`}>
					<button>Edit User</button>
				</Link>
			</div>
		)
	}
}
const mapState = (state, ownProps) => {
	return {
		user: ownProps.user || state.user
	}
}

const mapDispatch = dispatch => {
	return {
		findUser: id => dispatch(findSingleUserThunk(id))
	}
}
export default connect(mapState, mapDispatch)(UserPage)
