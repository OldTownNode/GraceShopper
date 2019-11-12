/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import {
	findSingleUserThunk,
	updateUserThunk,
	deleteUserThunk
} from '../store/user'
import { USstates } from './index.js'

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
		this.handleOnDelete = this.handleOnDelete.bind(this)
	}
	componentDidMount() {
		if (this.props.match && this.props.match.params.id) {
			this.props.findUser(this.props.match.params.id)
			this.setState({ user: this.props.user.user })
		} else if (this.props.user.loggedInUser.id) {
			this.props.findUser(this.props.user.loggedInUser.id)
			this.setState({ user: this.props.user.loggedInUser })
		}
	}

	handleOnDelete(id, admin) {
		this.props.deleteUser(id, admin)
	}
	handleOnChange(event) {
		event.preventDefault()
		const newUser = { ...this.state.user }
		const { name, value } = event.target
		newUser[name] = value
		this.setState({
			user: newUser
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
		const { error } = this.props
		let displaybutton = 'none'
		if (this.props.loggedIn.admin) displaybutton = 'block'
		const displayStyle = {
			display: displaybutton
		}
		let delStyle = 'none'
		if (this.props.match) {
			if (
				this.props.loggedIn.id ===
					parseInt(this.props.match.params.id) ||
				this.props.loggedIn.admin
			)
				delStyle = 'block'
		}
		const displayDel = {
			display: delStyle
		}
		console.log(this.props)
		return (
			<div className="editForm container">
				<form
					onSubmit={() => this.handleOnSubmit(event)}
					className="card-vertical"
				>
					{error &&
						error.response && <div> {error.response.data} </div>}
					<label htmlFor="username">Username:</label>

					<input
						type="text"
						name="username"
						defaultValue={username}
						onChange={this.handleOnChange}
						maxLength="15"
					/>

					<label htmlFor="email">E-mail:</label>
					<input
						type="email"
						name="email"
						defaultValue={email}
						onChange={this.handleOnChange}
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
					/>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						onChange={this.handleOnChange}
						maxLength="15"
						minLength="6"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					/>
					<label htmlFor="firstName">First Name: </label>
					<input
						type="text"
						name="firstName"
						defaultValue={firstName}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						name="lastName"
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
					<USstates handleOnChange={this.handleOnChange} />
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
						value={this.state.user.admin}
					>
						<option value="0">False</option>
						<option value="1">True</option>
					</select>
					{!this.props.guest ? (
						<input type="submit" value="Submit" />
					) : (
						<button
							type="submit"
							onClick={() => this.props.dummyhandle()}
						>
							Submit
						</button>
					)}
				</form>
				<input
					className="deleteButton"
					type="delete"
					value="Terminate Account"
					style={displayDel}
					onClick={() =>
						this.handleOnDelete(
							this.props.match.params.id,
							this.props.loggedIn
						)
					}
				/>
			</div>
		)
	}
}
const mapState = state => {
	return {
		user: state.user,
		loggedIn: state.user.loggedInUser,
		error: state.user.user.error
	}
}

const mapDispatch = dispatch => {
	return {
		findUser: id => dispatch(findSingleUserThunk(id)),
		updateUser: formInfo => dispatch(updateUserThunk(formInfo)),
		deleteUser: (id, admin) => dispatch(deleteUserThunk(id, admin))
	}
}
export default connect(mapState, mapDispatch)(UpdateUser)
