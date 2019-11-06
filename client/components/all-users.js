import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allUsersThunk, me } from '../store'
import { UserPage } from './index.js'
import { Link } from 'react-router-dom'

class AllUsers extends Component {
	componentDidMount() {
		console.log(this.props)
		this.props.loadData()
	}

	render() {
		return (
			<div>
				{this.props.allUsers &&
					this.props.allUsers.map(user => {
						return (
							<Link to={`/users/${user.id}`}>
								<div key={user.id}>
									<UserPage user={user} />
								</div>
							</Link>
						)
					})}
			</div>
		)
	}
}

const mapState = state => {
	return {
		allUsers: state.user.allUsers
	}
}
const mapDispatch = dispatch => {
	return {
		loadData: () => dispatch(allUsersThunk())
	}
}

export default connect(mapState, mapDispatch)(AllUsers)
