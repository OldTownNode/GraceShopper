import React from 'react'
import { Link } from 'react-router-dom'
import AddButton from './add-button'
import DecrementButton from './decrement-button'
import DeleteButton from './delete-button'

export default function CartListItem(props) {
	const { name, imageUrl, price, id } = props.product
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
					<div>{`quantity: ${props.quantity}`}</div>
					<div>
						<AddButton
							increment={props.increment}
							product={props.product}
						/>
						<DecrementButton
							decrement={props.decrement}
							product={props.product}
						/>
						<DeleteButton
							delete={props.delete}
							product={props.product}
						/>
					</div>
				</h2>
			</div>
		</div>
	)
}
