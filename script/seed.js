'use strict'

const db = require('../server/db')
const { User } = require('../server/db/models')
const { Product } = require('../server/db/models')
const { Order } = require('../server/db/models')
const { OrderProduct } = require('../server/db/models')

const products = [
	{
		name: 'Range Cowboy Hat',
		description:
			'The Range 6X Cowboy Hat is constructed of 6X quality fur felt and features a regular cattleman crown and a 2-ply cord hat band with feather. 6X Quality Fur Felt. Made in USA.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/S/F/SFRNGE-1130.62-3_1.jpg',
		inventory: 10,
		price: 350.0,
		category: 'apparel'
	},
	{
		name: 'Austral 4X Cowboy Hat',
		description:
			'The Austral 4X Cowboy Hat is constructed of 4x quality wool felt and features an open rounded crown, bound edge flat brim and is finished with a grosgrain hat band. 4X Quality Wool Felt. Made in USA.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/S/B/SBAUSTB5534.12-2_7.jpg',
		inventory: 10,
		price: 145.0,
		category: 'apparel'
	},
	{
		name: 'El Patron 75 Premier 30X Cowboy Hat',
		description:
			'The El Patron 75 Premier 30X Cowboy Hat is constructed of 30X quality fur felt and features a low profile cattleman crown, roen interior leather sweatband and self-matching hat band with sterling silver buckle set accent. 30X Quality Fur Felt. Made in USA.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/S/F/SFEPTN-7540.7-3_1.jpg',
		inventory: 10,
		price: 515.0,
		category: 'apparel'
	},
	{
		name: 'Sawmill Palm Leaf Western Hat',
		description:
			'Sawmill Palm Leaf Western Hat is constructed of palm leaf straw and features a dri-lex interior sweatband and decorative leather hat band. Palm Leaf Straw. Imported.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/540x708/9df78eab33525d08d6e5fb8d27136e95/O/S/OSSMIL4034.8T-2.jpg',
		inventory: 10,
		price: 57.0,
		category: 'apparel'
	},
	{
		name: 'Goddard Burnished Blue & Brown Leather Boot',
		description:
			'The Goddard Burnished Blue & Brown Leather is a handcrafted boot that features a Waxy Brown Vamp, burnished blue 11" shaft, square toe & ¾ Welt Sole With Nails.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/1/2/12-020-8911-1657.BR-1.jpg',
		inventory: 10,
		price: 270.0,
		category: 'apparel'
	},
	{
		name: 'Puncher Harness',
		description:
			'The Puncher Harness Boot features thick, oily goat leather construction, providing exceptional durability. The harness and removable True X Insole provides additional support for long hikes. Mountain-tested and outdoorsman-approved. Imported.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/1/2/12-020-7608-0770.BR-2_1.jpg',
		inventory: 10,
		price: 215.0,
		category: 'apparel'
	},
	{
		name: 'Willa Bison Back Zip Riding Boot',
		description:
			'The Willa Bison Back Zip Riding Boot features a Brown Bison Vamp, round toe, 16" shaft & Lemonwood And Brass Nail',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/1/2/12-021-7602-0968.BR-2.jpg',
		inventory: 10,
		price: 425.0,
		category: 'apparel'
	},
	{
		name: 'Jade Harness Tall Leather Boot',
		description:
			'The Jade Harness Tall Leather Boot was inspired by the best selling Jade Harness Ankle Boot. Hued in three colors, boot features a black washed vamp, 13" John Deer vibrant green shaft with crown and is finished with a natural tan harness. Structured with leather sole and lining, lemonwood pegs and brass nail construction and cushioned insole, this a womens boot to be reckoned with. Leather, Imported.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/1/2/12-021-6105-1012.GR-3.jpg',
		inventory: 10,
		price: 57.0,
		category: 'apparel'
	},
	{
		name: 'Sundance Kid Washed Wingtip and Crown',
		description:
			'The SUNDANCE KID is a handcrafted boot that features a Burnished Cognac Ostrich Vamp, premium cow lining, round toe, 9" shaft & ¾ Welt Sole With Nails & Lemonwood Pegs.',
		imageUrl:
			'https://www.stetson.com/store/media/catalog/product/cache/1/image/1080x1416/9df78eab33525d08d6e5fb8d27136e95/1/2/12-020-6104-0835.BL-1.jpg',
		inventory: 10,
		price: 57.0,
		category: 'apparel'
	},
	{
		name: 'Scully Fringed Suede Leather Coat - Tall',
		description:
			"Enjoy your own premium Scully Leather coat from the leather craftsmen who produced leather jackets, gloves, and helmets for WWI and WWII pilots and Admiral Byrd's expedition to the Antarctic! Scully Leather Company has been crafting fine leather wear since 1906, some of which you'll find on display in the likes of the Smithsonian Institute and the Museum of Flight in Seattle, Washington. Scully leather wear is handcrafted from grade A leathers, with special consideration given to surface character and softness of hand. Scully is leather wear you can be proud to own! This rugged west inspired Scully suede leather coat is loaded with long leather fringe on front and back yokes, shoulders, sleeves, and front pockets. Luxurious hand laced trim on pockets, front, collar, lapels, and yokes. Leather lacing on sleeves and back yoke. Bead epaulets on shoulders have leather lace and tie accents. Sueded bead-like pocket trim. Concho button and loop front closures. Two handy inside welt pockets. 100% polyester lining. Imported.",
		imageUrl:
			'https://www.sheplers.com/dw/image/v2/BBCT_PRD/on/demandware.static/-/Sites-master-product-catalog-shp/default/dw3cfd14c7/images/620/082620_25_P1.JPG?sw=980&sh=980&sm=fit',
		inventory: 10,
		price: 237.0,
		category: 'apparel'
	},
	{
		name: 'Kobler Zapata Fringed Leather Jacket',
		description:
			'For nearly 30 years, Kobler leather wear has been meeting the distinct leather wear needs of outdoorsmen and cowboys alike. An affinity for the Wild West of yore has made Kobler well known among western aficionados. Kobler boasts crafting finest leather apparel and accessories in the old American tradition. All the heritage and tradition of the Southwest, brought to life in the outstanding Kobler Zapata leather jacket! Leather jacket is bursting with beaded detail, leather fringe, and bone bead accents. Stand-up collar. Two front patch pockets. Handy inside open chest pocket. Raw edge hemline. Full polyester satin lining. Back length (collar to hem) is 31 1/2.',
		imageUrl:
			'https://www.sheplers.com/dw/image/v2/BBCT_PRD/on/demandware.static/-/Sites-master-product-catalog-shp/default/dw90b6203e/images/903/082903_23_P1.JPG?sw=980&sh=980&sm=fit',
		inventory: 10,
		price: 404.0,
		category: 'apparel'
	},
	{
		name: 'The Entertainer',
		description:
			'Created by fellow members Lotrek (Oath Playing Cards), and William Kalush (Expert Playing Card Company) for the 52 Plus Joker membership, we are proud to now offer you the 2019 Club Deck. Strictly limited to only 400 decks. This limited edition deck has design elements inspired by Ragtime, Charlotte and the South. Fully customized.',
		imageUrl:
			'https://cdn.shopify.com/s/files/1/1788/4029/products/img915_45bdbe46-3026-4d2d-bb7d-f6bc54be0a86_compact.jpg?v=1572940506',
		inventory: 10,
		price: 59.99,
		category: 'entertainment'
	},
	{
		name: 'Order Imperium Playing Cards',
		description:
			'Order Imperium is the first deck of the Order Series.This deck represents the MAGNIFICENCE of our People and the glory of our Unique Party. Order Imperium is printed with superb metallic inks and beautiful artwork authorized by the Ministry of Information.',
		imageUrl: 'https://i.ebayimg.com/images/g/6M0AAOSwxW9dr2qn/s-l640.jpg',
		inventory: 10,
		price: 15.99,
		category: 'entertainment'
	},
	{
		name: 'Reno Red Cherry Casino Playing Cards.',
		description:
			'Printed by U.S. Playing Card Company, it is clear why all versions of Cherry Casino Playing Cards continue to be sought after by magicians, collectors, and gamblers worldwide. Includes specially colored court cards, and custom designed Ace of Spade and Jokers.',
		imageUrl:
			'https://cdn.shopify.com/s/files/1/0956/5418/products/62741-full_273a39ff-fafc-451b-a967-e44d8744e550_1024x1024.png?v=1553571801',
		inventory: 10,
		price: 11.99,
		category: 'entertainment'
	},
	{
		name: 'Antique Western Trail Horse Saddle',
		description:
			'tand out from everyone else in the arena or out on the trail in this one of a kind, beautiful pleasure saddle! This saddle features an antique finish with a black inlay that gives this saddle appeal and dimension. **Stirrups Will Be Leather**',
		imageUrl:
			'https://www.saddleonline.com/23871-medium_default/antique-western-pleasure-trail-horse-saddle-tack-18.jpg',
		inventory: 10,
		price: 57.0,
		category: 'equipment'
	},

	{
		name: 'Synthetic Brown Silver Trail Show Horse Saddle',
		description:
			'This is a beautiful classic synthetic western horse saddle that is great for trail and pleasure riding. The saddle is extremely lightweight and will be perfect for any rider looking for a good lightweight saddle. Because the saddle is water proof, it is a breeze to clean up; just wipe with a damp cloth and go! No need for going through the messy and long processes of oiling your saddle just to keep it in good condition. The saddle has a nylon binding around the corners that help make it tear proof. The underside is well-padded with a synthetic fleece for maximum horse comfort. It comes complete with a matching headstall, breast collar, reins, and saddle pad for a limited time while supplies last. Cinches not included.',
		imageUrl:
			'https://www.saddleonline.com/24083-medium_default/synthetic-brown-silver-trail-show-horse-saddle-tack-17.jpg',
		inventory: 10,
		price: 57.0,
		category: 'equipment'
	},

	{
		name: 'Round Skirt Western Plearure Trail Horse Saddle',
		description:
			'Enjoy a comfortable round skirted western horse saddle that is perfect for trail or endurance riding! Comes complete with a matching headstall, reins, and breast collar on sale for only $349.99!',
		imageUrl:
			'https://www.saddleonline.com/19429-medium_default/round-skirt-western-pleasure-trail-horse-saddle-tack-15-18.jpg',
		inventory: 10,
		price: 349.99,
		category: 'equipment'
	},

	{
		name: 'LF Athena - Top Potential, Amateur Friendly',
		description:
			'LF Athena - “Nikki” is a 2013, 16’3 chestnut Oldenburg mare by Quincy Car, out of Oria. Nikki successfully evented through Training level and is now making the switch to the pure dressage. Extremely laterally supple and a beautiful mover - this talented mare has loads of potential for the future',
		imageUrl:
			'https://cdn.equine.com/images/scaled/810x456:0/89c5ec10-fbdb-11e9-bb0a-c1cad3cd572c/1105dcf0-fbda-11e9-89ce-b7989d431c78__img__20191023__wa0000.jpg',
		inventory: 1,
		price: 4000.0,
		category: 'horses'
	},

	{
		name: 'Iota Hear Good News - 15.0HH, 2009, Red Roan AQHA Gelding',
		description:
			'Gospel is a gorgeous, big bodied, red roan gelding. He has the sweetest in-your-pocket, puppy dog personality that you just can not help but fall in love!! He has been on tons of trail rides and was originally trained as a show horse! He has been on overnight camping trips in the mountains and has done very well! He has a nice stop and a smooth jog. He is a great trail riding horse, great in traffic and commotion. He is easy to catch, lead, load, haul, stands tied, bathe, groom, pick feet, saddle, bridle, and quiet for the vet and farrier. Stands for mount and dismount, rides in just a loose ring snaffle or a short shank correction. Gospel picks up both of his leads, backs up, side passes, and works a gate. He would be a great horse for an obstacle rider, trail rider, weekend shows, or a western dressage mount. Watch his video and check out all his pictures, no one has walked by this guy and not made a comment about him, he is just stunning!',
		imageUrl:
			'https://cdn.equine.com/images/scaled/810x456:0/6861a340-f77e-11e9-b355-85732dbf52f7/3a2dc990-f77e-11e9-bd35-511741ea3fee__1iota__hear__good__news__trail__1__main__small.jpg',
		inventory: 1,
		price: 9000,
		category: 'horses'
	}
]
const OrderProducts = [
	{
		quantity: 1,
		price: 145.0,
		productId: '1',
		orderId: '1'
	},
	{
		quantity: 1,
		price: 350.0,
		productId: '2',
		orderId: '1'
	},
	{
		quantity: 1,
		price: 515.0,
		productId: '3',
		orderId: '1'
	},
	{
		quantity: 1,
		price: 237.0,
		productId: '10',
		orderId: '1'
	},
	{
		quantity: 1,
		price: 57.0,
		productId: '8',
		orderId: '1'
	},
	{
		quantity: 1,
		price: 4000.0,
		productId: '18',
		orderId: '1'
	},
	{
		quantity: 1,
		price: 215.0,
		productId: '6',
		orderId: '2'
	},
	{
		quantity: 1,
		price: 15.99,
		productId: '12',
		orderId: '2'
	},
	{
		quantity: 1,
		price: 57.0,
		productId: '15',
		orderId: '2'
	},
	{
		quantity: 1,
		price: 9000,
		productId: '19',
		orderId: '3'
	}
]

async function seed() {
	await db.sync({ force: true })
	console.log('db synced!')

	const users = await Promise.all([
		User.create({ email: 'cody@email.com', password: 'Ab123456*' }),
		User.create({ email: 'murphy@email.com', password: 'Bc123456*' }),
		User.create({
			email: 'tom@email.com',
			password: 'Cd123456*',
			admin: true,
			username: 'thomas',
			firstName: 'tom',
			lastName: 'smih',
			apt: '2',
			street: 'Main st',
			houseNumber: '111',
			zipcode: '11111',
			state: 'NY'
		})
	])
	const orders = await Promise.all([
		Order.create({ status: 'inCart', userId: 1 }),
		Order.create({ status: 'inCart', userId: 2 }),
		Order.create({ status: 'complete', userId: 1 })
	])
	const prod = await Promise.all(
		products.map(product => {
			return Product.create(product)
		})
	)
	const orderprod = await Promise.all(
		OrderProducts.map(orprod => {
			return OrderProduct.create(orprod)
		})
	)

	console.log(`seeded ${users.length} users`)
	console.log(`seeded ${orders.length} orders`)
	console.log(`seeded ${prod.length} products`)
	console.log(`seeded ${orderprod.length} products in orders`)
	console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log('closing db connection')
		await db.close()
		console.log('db connection closed')
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
