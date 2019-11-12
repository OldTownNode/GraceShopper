import React from 'react'
import ConnectedProductsContainer from './products-container'

const WelcomePage = () => {
	return (
		<div className="welcome-page">
			<div className="box">
				<img
					className="welcome-image"
					src="https://preview.redd.it/bzuih23jswm21.jpg?width=960&crop=smart&auto=webp&s=e1449292c443d2d1e78d3f1d2d019bad569c1b30"
				/>
				<div className="box-text">
					<h1>Old Town Node Country Store</h1>
				</div>
			</div>
			<ConnectedProductsContainer />
		</div>
	)
}

export default WelcomePage
