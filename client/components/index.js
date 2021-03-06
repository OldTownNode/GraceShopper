/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { default as UserPage } from './user-page'
export { default as AllUsers } from './all-users'
export { Login, Signup } from './auth-form'
export { default as UserUpdate } from './update-user'
export { default as ConnectedSingleProduct } from './single-product'
export { default as UserOrders } from './UserOrders'
export {
	default as ConnectedSingleProductContainer
} from './single-product-container'
export { default as ConnectedProductsContainer } from './products-container'
export { default as CartContainer } from './cart-container'
export { default as CheckoutForm } from './checkout-form'
export { default as NotFoundPage } from './NotFoundPage'
export { default as Checkout } from './Checkout'
export { default as WelcomePage } from './WelcomePage.js'
export { default as OrderComplete } from './complete-order'
export { default as USstates } from './usstates-component'
