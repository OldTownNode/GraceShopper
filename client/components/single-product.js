import React from 'react'
import { Link } from 'react-router-dom'
export default function SingleProduct(props) {
	const { name, imageUrl, inventory, price, id } = props.products
	return (
		<div className="card">
			<div className="linkcontainer">
				<Link to={`/products/${id}`}>
					<h2 className="h1">{name}</h2>
				</Link>
				<div className="divider" />
				<a className="imgcontainer">
					<img className="img" src={imageUrl} />
				</a>
				<h3 className="priceinvcont">{`price: $${(price / 100).toFixed(
					2
				)}`}</h3>
				<h3 className="priceinvcont">{`inventory: ${inventory}`}</h3>
			</div>
		</div>
	)
}
