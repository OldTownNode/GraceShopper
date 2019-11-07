import React from 'react'
import { fetchAProduct } from '../store/product'
import {
	incrementProductThunkCreator,
	decrementItemThunkCreator
} from '../store/cartReducer'
import SingleProductView from './single-product-view'
import { connect } from 'react-redux'

class SingleProductContainer extends React.Component {
	componentDidMount() {
		this.props.fetchAProduct(this.props.match.params.id)
	}
	render() {
		return (
			<SingleProductView
				product={this.props.singleProduct}
				increment={this.props.increment}
				decrement={this.props.decrement}
			/>
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
		fetchAProduct: id => dispatch(fetchAProduct(id)),
		increment: product => dispatch(incrementProductThunkCreator(product)),
		decrement: product => dispatch(decrementItemThunkCreator(product))
	}
}

const ConnectedSingleProductContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleProductContainer)
export default ConnectedSingleProductContainer
