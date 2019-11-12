import React from 'react'

export default function ProductForm(props) {
	console.log('props in form ', props)
	// props.setState({
	// 	name: props.name,
	// 	description: props.description,
	// 	imageUrl: props.imageUrl,
	// 	inventory: props.inventory,
	// 	price: props.price,
	// 	category: props.category
	// })
	return (
		<form onSubmit={props.handleSubmit}>
			<label className="form-row" htmlFor="name">
				Product Name
				<input
					name="name"
					type="text"
					placeholder=" Enter Product Name"
					onChange={props.handleChange}
					value={props.state.name}
				/>
			</label>

			<label className="form-row" htmlFor="name">
				Product Description
				<input
					name="description"
					type="text"
					placeholder=" Enter Product Description"
					onChange={props.handleChange}
					value={props.state.description}
				/>
			</label>

			<label className="form-row" htmlFor="name">
				Image URL
				<input
					name="imageUrl"
					type="text"
					placeholder="Enter URL"
					onChange={props.handleChange}
					value={props.state.imageUrl}
				/>
			</label>

			<label className="form-row" htmlFor="name">
				Product Inventory
				<input
					name="inventory"
					type="text"
					placeholder="Enter Inventory"
					onChange={props.handleChange}
					value={props.state.inventory}
				/>
			</label>

			<label className="form-row" htmlFor="name">
				Product Price
				<input
					name="price"
					type="text"
					placeholder="Enter Price"
					onChange={props.handleChange}
					value={props.state.price}
				/>
			</label>

			<label className="form-row" htmlFor="name">
				Product Category
				<select
					name="category"
					onChange={props.handleChange}
					value={props.state.category}
				>
					<option value="apparel">Apparel</option>
					<option value="horses">Horses</option>
					<option value="equipment">Equipment</option>
					<option value="entertainment">Entertainment</option>
					<option value="miscellaneous">Miscellaneous</option>
					<option value="Rescue">Rescue</option>
				</select>
			</label>
			<button>Submit form</button>
		</form>
	)
}
