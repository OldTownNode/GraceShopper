import React from 'react'
import { fetchAProduct, putProduct } from '../store/product'
import {
	incrementProductThunkCreator,
	decrementItemThunkCreator
} from '../store/cartReducer'
import SingleProductView from './single-product-view'
import Loading from './loading'
import { connect } from 'react-redux'

class SingleProductContainer extends React.Component {
	constructor(props) {
		super(props)
		const {
			name,
			description,
			imageUrl,
			inventory,
			price,
			category
		} = this.props.singleProduct
		this.state = {
			name: name,
			description: description,
			imageUrl: imageUrl,
			inventory: inventory,
			price: price,
			category: category
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		this.props.fetchAProduct(this.props.match.params.id)
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}
	handleSubmit(event) {
		event.preventDefault()
		this.props.putProduct(this.state, this.props.match.params.id)
	}
	render() {
		return this.props.singleProduct.name ? (
			<SingleProductView
				product={this.props.singleProduct}
				increment={this.props.increment}
				decrement={this.props.decrement}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				state={this.state}
				user={this.props.user}
			/>
		) : (
			<Loading />
		)
	}
}

const mapStateToProps = state => {
	return {
		singleProduct: state.productReducer.singleProduct,
		user: state.user.loggedInUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		putProduct: (product, id) => dispatch(putProduct(product, id)),
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
