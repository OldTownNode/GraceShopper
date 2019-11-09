import React from 'react'
import { Link } from 'react-router-dom'
export default function SingleProduct(props) {
	console.log('in SingleProduct. props: ', props)
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
				<div />
			</h2>
		</div>
	)
}
