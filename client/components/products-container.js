import React from 'react'
import { fetchProducts } from '../store/product'
import { connect } from 'react-redux'
import SingleProduct from './single-product'

class Products extends React.Component {
	componentDidMount() {
		this.props.fetchProducts()
	}
	render() {
		return (
			<div className="container">
				{this.props.products.map(product => {
					return (
						<SingleProduct
							key={product.id}
							products={product}
							increment={this.props.increment}
						/>
					)
				})}
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		products: state.productReducer.products
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => dispatch(fetchProducts())
	}
}

const ConnectedProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
	Products
)
export default ConnectedProductsContainer
