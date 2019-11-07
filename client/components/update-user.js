import React from 'react'
import { connect } from 'react-redux'
import { findSingleUserThunk } from '../store/user'

class UpdateUser extends React.Component {
	constructor() {
		super()
		this.state = {
			allUsers: [],
			user: {
				username: '',
				email: '',
				firstName: '',
				lastName: '',
				houseNumber: '',
				apt: '',
				street: '',
				zipcode: '',
				state: '',
				country: ''
			}
		}
	}
	componentDidMount() {
		if (this.props.match) {
			this.props.findUser(this.props.match.params.id)
			this.setState({ user: this.props.user.user })
		}
	}
	componentWillUnmount() {
		this.setState({
			user: {
				username: '',
				email: '',
				firstName: '',
				lastName: '',
				houseNumber: '',
				apt: '',
				street: '',
				zipcode: '',
				state: '',
				country: ''
			}
		})
	}

	render() {
		console.log('props', this.props)
		console.log('state', this.state)
		let userObj
		if (this.state.user.username) userObj = this.state.user
		else if (this.props.user) userObj = this.props.user.user
		let {
			email,
			username,
			firstName,
			lastName,
			houseNumber,
			apt,
			street,
			zipcode,
			state,
			country
		} = userObj

		return (
			<div className="edit-user">
				<form>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						defaultValue={username}
					/>
					<label htmlFor="email">E-mail:</label>
					<input type="text" name="email" defaultValue={email} />
					<label htmlFor="password">Password:</label>
					<input type="text" name="password" />
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						name="firstName"
						defaultValue={firstName}
					/>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						name="username"
						defaultValue={lastName}
					/>
					<label htmlFor="houseNumber">House Number:</label>
					<input
						type="text"
						name="houseNumber"
						defaultValue={houseNumber}
					/>
					<label htmlFor="street">Street:</label>
					<input type="text" name="street" defaultValue={street} />
					<label htmlFor="apt">Apt#:</label>
					<input type="text" name="apt" defaultValue={apt} />
					<label htmlFor="zipcode">Zipcode:</label>
					<input type="text" name="zipcode" defaultValue={zipcode} />
					<label htmlFor="state">State:</label>
					<input type="text" name="state" defaultValue={state} />
					<label htmlFor="country">Country:</label>
					<input type="text" name="country" defaultValue={country} />
				</form>
			</div>
		)
	}
}
const mapState = state => {
	return {
		user: state.user
	}
}

const mapDispatch = dispatch => {
	return {
		findUser: id => dispatch(findSingleUserThunk(id))
	}
}
export default connect(mapState, mapDispatch)(UpdateUser)
