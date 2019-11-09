import React from 'react'
import SingleProduct from './single-product'

export default function CartView(props) {
	const productIds = Object.keys(props.cart)
	const quantities = Object.values(props.cart)

	console.log('in cartview. props: ', props)

	return (
		<div>
			<ul>
				{productIds.map((id, index) => {
					return (
						<li key={id}>
							<SingleProduct
								products={
									props.products.filter(product => {
										return product.id.toString() === id
									})[0]
								}
							/>
							<p>In Cart: {quantities[index]}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
