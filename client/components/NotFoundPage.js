import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div className="notFoundPageContainer">
			<h2>Whoops!</h2>
			<img
				className="notFoundPageImage"
				src="https://i.ebayimg.com/images/g/NmYAAOSwm~daXVfM/s-l1600.jpg"
			/>
			<h4>
				We lost you there, Perhaps try going back to{' '}
				<Link to="/products">Products</Link>
			</h4>
		</div>
	)
}

export default NotFoundPage
