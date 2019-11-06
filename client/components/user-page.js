import React from 'react'
import { connect } from 'react-redux'
import { me } from '../store'
import axios from 'axios'
import { findSingleUserThunk } from '../store/user'

class UserPage extends React.Component {
	constructor() {
		super()
		this.state = {
			user: {}
		}
	}
	async componentDidMount() {
		if (this.props.match) {
			try {
				console.log('props', this.props)
				const { data } = await axios.get(
					`/api/users/${this.props.match.params.id}`
				)
				console.log('data', data)
				this.setState({ user: data[0] })
			} catch (err) {
				console.error(err)
			}
		}
		// console.log(this.props.match.params.id)
		// if(this.props.match) this.props.findUser(this.props.match.params.id)
	}
	render() {
		//console.log('prop', this.props.user.user)
		let uservalue
		// if(Object.keys(this.state.user).length>0) uservalue = this.state.user
		// else uservalue = this.props.user
		if (this.props.user) uservalue = this.props.user
		else uservalue = this.state.user
		console.log(uservalue)
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
			</div>
		)
	}
}
// export const UserPage = props => {
// 	const { username, firstName, lastName, address, email } = props.user
// 	return (
// 		<div>
// 			<ul>
// 				<li>Username: {username}</li>
// 				<li>
// 					Name: {firstName} {lastName}
// 				</li>
// 				<li>Address: {address}</li>
// 				<li>Email: {email}</li>
// 			</ul>
// 		</div>
// 	)
// }
// const mapState = state => {
// 	return {
// 		user: state.user
// 	}
// }
const mapDispatch = dispatch => {
	return {
		findUser: id => dispatch(findSingleUserThunk(id))
	}
}
export default connect(null, mapDispatch)(UserPage)
// export default UserPage
