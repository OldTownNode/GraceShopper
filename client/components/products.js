import React from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/product'
import store from '../store/index'

import { connect } from 'react-redux'

class Products extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }

	componentDidMount() {
		this.props.fetchProducts()
	}
	render() {
		console.log('state', store.getState())
		console.log('props', this.props)
		return (
			<div className="container">
				{this.props.products.map(product => {
					return (
						<div key={product.id} className="card">
							<li>
								<a className="img">
									<img src={product.imageUrl} />
								</a>

								<div className="link">
									{
										<Link to={`/products/${product.id}`}>
											<div>{product.name}</div>
										</Link>
									}
								</div>
							</li>
						</div>
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

const ConnectedProducts = connect(mapStateToProps, mapDispatchToProps)(Products)
export default ConnectedProducts
