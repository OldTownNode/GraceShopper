import React from 'react'

import { fetchAProduct } from '../store/product'

import { connect } from 'react-redux'

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.fetchAProduct(this.props.match.params.id)
	}
	render() {
		const {
			name,
			description,
			imageUrl,
			inventory,
			price
		} = this.props.singleProduct
		return (
			<div>
				<h1>{name}</h1>
				<a className="img">
					<img src={imageUrl} />
				</a>
				<h2>
					<div>{`price: $${price}`}</div>
					<div>{`inventory: ${inventory}`}</div>
				</h2>
				<p>{description}</p>
			</div>
		)
	}
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
