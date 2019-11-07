import React from 'react'

import { fetchAProduct } from '../store/product'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
function SingleProduct(props) {
	const { name, imageUrl, inventory, price, id } = props.products

	return (
		<div>
			<Link to={`/products/${id}`}>
				<h1>{name}</h1>
			</Link>

			<a className="img">
				<img src={imageUrl} />
			</a>
			<h2>
				<div>{`price: ${price}`}</div>
				<div>{`inventory: ${inventory}`}</div>
			</h2>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		singleProduct: state.productReducer.singleProduct
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchAProduct: id => dispatch(fetchAProduct(id))
	}
}

const ConnectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
	SingleProduct
)
export default ConnectedSingleProduct
