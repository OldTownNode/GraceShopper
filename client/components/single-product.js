import React from 'react'
import { Link } from 'react-router-dom'
export default function SingleProduct(props) {
	const { name, imageUrl, inventory, price, id } = props.products
	return (
		<div className="card">
			<div className="linkcontainer">
				<Link to={`/products/${id}`}>
					<h1 className="h1">{name}</h1>
				</Link>

				<a className="imgcontainer">
					<img className="img" src={imageUrl} />
				</a>
				<h2 className="priceinvcont">
					<div>{`price: ${price}`}</div>
					<div>{`inventory: ${inventory}`}</div>
				</h2>
			</div>
		</div>
	)
}
