import React from 'react'
import { fetchAProduct } from '../store/product'
import SingleProductView from './single-product-view'
import { connect } from 'react-redux'

class SingleProductContainer extends React.Component {
	componentDidMount() {
		this.props.fetchAProduct(this.props.match.params.id)
	}
	render() {
		return <SingleProductView product={this.props.singleProduct} />
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

const ConnectedSingleProductContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleProductContainer)
export default ConnectedSingleProductContainer
