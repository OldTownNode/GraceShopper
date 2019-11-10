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
			wusername: 'hidden',
			wemail: 'hidden',
			wpassword: 'hidden',
			wfirstName: 'hidden',
			wlastName: 'hidden',
			whouseNumber: 'hidden',
			wstreet: 'hidden',
			wapt: 'hidden',
			wzipcode: 'hidden',
			wcountry: 'hidden',
			finalC: 0
		}
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnDelete = this.handleOnDelete.bind(this)
		this.validateName = validateName.bind(this)
		this.validateXSS = validateXSS.bind(this)
		this.validateFirst = validateFirst.bind(this)
		this.setStateToHidden = setStateToHidden.bind(this)
		this.validateEmail = validateEmail.bind(this)
		this.notEmpty = notEmpty.bind(this)
		this.fullCheck = fullCheck.bind(this)
		this.checkPw = checkPw.bind(this)
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
		event.preventDefault()
		const newUser = { ...this.state.user }
		const { name, value } = event.target
		newUser[name] = value
		this.setState({
			user: newUser
		})
		this.setState({
			eventName:
				event.target.name[0].toUpperCase() +
				event.target.name.substring(1)
		})
		let lastEntry = event.target.value
		let target = 'w' + event.target.name

		this.setStateToHidden()
		switch (event.target.name) {
			case 'username':
				this.validateXSS(lastEntry, target)
				this.validateName(lastEntry, target)
				break
			case 'firstName':
				this.validateXSS(lastEntry, target)
				this.validateFirst(lastEntry, target)
				break
			case 'email':
				this.validateXSS(lastEntry, target)
				this.validateEmail(lastEntry, target)
				break
			case 'lastName':
				this.validateXSS(lastEntry, target)
				this.validateFirst(lastEntry, target)
				break
			case 'apt':
				this.validateXSS(lastEntry, target)
				break
			case 'password':
				this.validateXSS(lastEntry, target)
				this.checkPw(lastEntry, target)
				break
			default:
				this.validateXSS(lastEntry, target)
				this.notEmpty(lastEntry, target)
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
		if (this.state.finalC === 0) warningStyle = 'visible'
		else if (this.state.finalC === 1) warningStyle = 'hidden'
		const warningBox = {
			visibility: warningStyle
		}
		let borderStyle = 'none'
		if (this.state.finalC) borderStyle = '5px solid red'
		else if (!this.state.finalC) borderStyle = 'none'
		// const warningBorder = {
		// 	border: borderStyle,
		// }
		return (
			<div className="editForm container">
				<form
					onSubmit={() => this.handleOnSubmit(event)}
					className="card-vertical"
				>
					<label htmlFor="username">
						Username:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wusername }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wusername,
							borderBottom: borderStyle
						}}
					/>

					<input
						type="text"
						name="username"
						defaultValue={username}
						onChange={this.handleOnChange}
					/>

					<label htmlFor="email">
						E-mail:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wemail }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wemail,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="text"
						name="email"
						defaultValue={email}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="password">
						Password:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wpassword }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wpassword,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="password"
						name="password"
						onChange={this.handleOnChange}
					/>
					<label htmlFor="firstName">
						First Name:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wfirstName }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wfirstName,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="text"
						name="firstName"
						defaultValue={firstName}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="lastName">
						Last Name:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wlastName }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wlastName,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="text"
						name="lastName"
						defaultValue={lastName}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="houseNumber">
						House Number:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.whouseNumber }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.whouseNumber,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="text"
						name="houseNumber"
						defaultValue={houseNumber}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="street">
						Street:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wstreet }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wstreet,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="text"
						name="street"
						defaultValue={street}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="apt">
						Apt#:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wapt }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wapt,
							borderBottom: borderStyle
						}}
					/>
					<input
						type="text"
						name="apt"
						defaultValue={apt}
						onChange={this.handleOnChange}
					/>
					<label htmlFor="zipcode">
						Zipcode:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wzipcode }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wzipcode,
							borderBottom: borderStyle
						}}
					/>
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
					<label htmlFor="country">
						Country:{' '}
						{!this.state.finalC ? (
							<span
								className="warning"
								style={{ visibility: this.state.wcountry }}
							>
								{this.state.eventName} must {this.state.warning}
							</span>
						) : (
							<span />
						)}
					</label>
					<span
						style={{
							visibility: this.state.wcountry,
							borderBottom: borderStyle
						}}
					/>
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
					<input
						type="submit"
						value="Submit"
						onMouseOver={this.fullCheck}
					/>
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

function validateXSS(lastEntry, target) {
	if (
		lastEntry[lastEntry.length - 1] === ';' ||
		lastEntry[lastEntry.length - 1] === '<' ||
		lastEntry[lastEntry.length - 1] === '>' ||
		lastEntry.indexOf(';') !== -1 ||
		lastEntry.indexOf('<') !== -1 ||
		lastEntry.indexOf('>') !== -1
	) {
		this.setState({
			warning: 'not include illegal characters ; < >',
			[target]: 'visible'
		})
	}
}

function validateName(lastEntry, target) {
	if (lastEntry.length < 5 || lastEntry.length > 15) {
		this.setState({
			warning: 'be between 5 and 15 characters long',
			[target]: 'visible'
		})
	}
}

function validateFirst(lastEntry, target) {
	this.notEmpty(lastEntry, target)
	if (
		(lastEntry.charCodeAt(lastEntry.length - 1) < 97 &&
			lastEntry.charCodeAt(lastEntry.length - 1) > 90) ||
		lastEntry.charCodeAt(lastEntry.length - 1) < 65 ||
		lastEntry.charCodeAt(lastEntry.length - 1) > 122
	) {
		this.setState({ warning: 'be a valid name', [target]: 'visible' })
	}
}

function validateEmail(lastEntry, target) {
	this.notEmpty(lastEntry, target)
	if (lastEntry.indexOf('.') === -1 || lastEntry.indexOf('@') === -1) {
		this.setState({
			warning: 'be a valid email',
			[target]: 'visible'
		})
	}
}
function checkPw(lastEntry, target) {
	this.notEmpty(lastEntry, target)
	if (lastEntry.length < 6 || lastEntry.length > 15) {
		this.setState({
			warning: 'be between 6 and 15 characters long',
			[target]: 'visible'
		})
	}
	if (lastEntry.match(/[A-Z]/) === null) {
		this.setState({
			warning: 'include at least one capital letter',
			[target]: 'visible'
		})
	}
	if (lastEntry.match(/[a-z]/) === null) {
		this.setState({
			warning: 'include at least one lower case letter',
			[target]: 'visible'
		})
	}
	if (lastEntry.match(/[0-9]/) === null) {
		this.setState({
			warning: 'include at least one number',
			[target]: 'visible'
		})
	}
	if (lastEntry.match(/[!@#$%^&*]/) === null) {
		this.setState({
			warning: 'include at least one special character',
			[target]: 'visible'
		})
	}
}
function notEmpty(lastEntry, target) {
	if (lastEntry.length < 1) {
		this.setState({
			warning: 'not be empty',
			[target]: 'visible'
		})
	}
}

function setStateToHidden() {
	this.setState({
		wusername: 'hidden',
		wemail: 'hidden',
		wpassword: 'hidden',
		wfirstName: 'hidden',
		wlastName: 'hidden',
		whouseNumber: 'hidden',
		wstreet: 'hidden',
		wapt: 'hidden',
		wzipcode: 'hidden',
		wcountry: 'hidden',
		finalC: 0
	})
}

function fullCheck() {
	this.setState({ finalC: 1 })
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
	for (let key in this.state.user) {
		if (typeof this.state.user[key] === 'string') {
			this.validateXSS(this.state.user[key], 'w' + key)
		}
	}
	this.validateName(username, 'wusername')
	this.validateFirst(firstName, 'wfirstName')
	this.validateEmail(email, 'wemail')
	this.validateFirst(lastName, 'wlastName')
	this.notEmpty(houseNumber, 'whouseNumber')
	this.notEmpty(street, 'wstreet')
	this.notEmpty(zipcode, 'wzipcode')
	this.notEmpty(country, 'wcountry')
}
