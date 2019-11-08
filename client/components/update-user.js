import React from 'react'
import { connect } from 'react-redux'
import { findSingleUserThunk, updateUserThunk } from '../store/user'

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
				country: '',
				password: '',
				admin: 0
			}
		}
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
	}
	componentDidMount() {
		if (this.props.match) {
			this.props.findUser(this.props.match.params.id)
			this.setState({ user: this.props.user.user })
		}
	}
	handleOnChange(event) {
		event.preventDefault()
		this.setState({
			user: { [event.target.name]: event.target.value }
		})
	}
	handleOnSubmit(event) {
		event.preventDefault()

		const data = {
			username: this.state.user.username,
			id: this.props.match.params.id,
			email: this.state.user.email,
			firstName: this.state.user.firstName,
			lastName: this.state.user.lastName,
			houseNumber: this.state.user.houseNumber,
			apt: this.state.user.apt,
			street: this.state.user.street,
			zipcode: this.state.user.zipcode,
			state: this.state.user.state,
			country: this.state.user.country,
			password: this.state.user.password,
			admin: !!parseInt(this.state.user.admin)
		}
		this.props.updateUser(data)
	}
	render() {
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
		let displaybutton = 'none'
		if (userObj.admin) displaybutton = 'block'
		const displayStyle = {
			display: displaybutton
		}
		return (
			<div className="edit-user">
				<form onSubmit={() => this.handleOnSubmit(event)}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						defaultValue={username}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="email">E-mail:</label>
					<input
						type="text"
						name="email"
						defaultValue={email}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						name="password"
						onChange={this.handleOnChange}
					/>
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						name="firstName"
						defaultValue={firstName}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						name="username"
						defaultValue={lastName}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="houseNumber">House Number:</label>
					<input
						type="text"
						name="houseNumber"
						defaultValue={houseNumber}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="street">Street:</label>
					<input
						type="text"
						name="street"
						defaultValue={street}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="apt">Apt#:</label>
					<input
						type="text"
						name="apt"
						defaultValue={apt}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="zipcode">Zipcode:</label>
					<input
						type="text"
						name="zipcode"
						defaultValue={zipcode}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="state">State:</label>
					<input
						type="text"
						name="state"
						defaultValue={state}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="country">Country:</label>
					<input
						type="text"
						name="country"
						defaultValue={country}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="admin" style={displayStyle}>
						Admin:
					</label>
					<select
						name="admin"
						onChange={this.handleOnChange}
						style={displayStyle}
					>
						<option value="0">False</option>
						<option value="1">True</option>
					</select>
					<input type="submit" value="Submit" />
				</form>
				<input type="submit" value="Delete User" style={displayStyle} />
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
		findUser: id => dispatch(findSingleUserThunk(id)),
		updateUser: formInfo => dispatch(updateUserThunk(formInfo))
	}
}
export default connect(mapState, mapDispatch)(UpdateUser)
