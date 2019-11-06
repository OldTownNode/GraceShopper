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
		console.log('store', store)
		console.log('props', this.props)
		return (
			<div className="container">
				{this.props.products.map(product => {
					return (
						<div key={product.id} className="card"> {/* product component here would be cool */}
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
