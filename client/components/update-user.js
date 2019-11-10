/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import {
	findSingleUserThunk,
	updateUserThunk,
	deleteUserThunk
} from '../store/user'

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
			},
			eventName: '',
			warning: '',
			displayWarning: false
		}
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnDelete = this.handleOnDelete.bind(this)
	}
	componentDidMount() {
		if (this.props.match) {
			this.props.findUser(this.props.match.params.id)
			this.setState({ user: this.props.user.user })
		}
	}

	handleOnDelete(id, admin) {
		this.props.deleteUser(id, admin)
	}
	handleOnChange(event) {
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
			country,
			password
		} = this.state.user
		event.preventDefault()
		this.setState({
			user: { [event.target.name]: event.target.value }
		})
		this.setState({
			eventName:
				event.target.name[0].toUpperCase() +
				event.target.name.substring(1)
		})
		let lastEntry = event.target.value
		switch (event.target.name) {
			case 'username':
				this.validateName(lastEntry)
				break
			default:
		}
	}
	validateName = lastEntry => {
		if (
			lastEntry[lastEntry.length - 1] === ';' ||
			lastEntry[lastEntry.length - 1] === '<' ||
			lastEntry[lastEntry.length - 1] === '>' ||
			lastEntry.indexOf(';') !== -1 ||
			lastEntry.indexOf('<') !== -1 ||
			lastEntry.indexOf('>') !== -1
		) {
			this.setState({ warning: 'not include illegal characters ; < >' })
			this.setState({ displayWarning: true })
		} else if (lastEntry.length < 5 || lastEntry.length > 15) {
			this.setState({ warning: 'be between 5 and 15 characters long' })
			this.setState({ displayWarning: true })
		} else {
			this.setState({ warning: '' })
			this.setState({ displayWarning: false })
		}
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
		if (this.props.loggedIn.admin) displaybutton = 'block'
		const displayStyle = {
			display: displaybutton
		}
		let delStyle = 'none'
		if (
			this.props.loggedIn.id === parseInt(this.props.match.params.id) ||
			this.props.loggedIn.admin
		)
			delStyle = 'block'
		const displayDel = {
			display: delStyle
		}
		let warningStyle = 'hidden'
		if (this.state.displayWarning) warningStyle = 'visible'
		else if (!this.state.displayWarning) warningStyle = 'hidden'
		const warningBox = {
			visibility: warningStyle
		}
		return (
			<div className="editForm container">
				<form
					onSubmit={() => this.handleOnSubmit(event)}
					className="card-vertical"
				>
					<label htmlFor="username">
						Username:{' '}
						<span className="warning" style={warningBox}>
							{this.state.eventName} must {this.state.warning}
						</span>
					</label>
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
						type="password"
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
					<select
						name="state"
						onChange={this.handleOnChange}
						value={this.state.userstate}
					>
						<option value="">Select State</option>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District Of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>
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
					<input type="submit" value="Submit" />
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
		loggedIn: state.user.loggedInUser
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
