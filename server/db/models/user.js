const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define(
	'user',
	{
		firstName: {
			type: Sequelize.STRING,
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				},
				isAlpha: {
					args: true,
					msg: 'Must not contain numbers'
				} //HM Passport Office will not print numerals (0–9) on a passport — only alphabetical characters (A–Z), hypens and apostrophes.  If you have a number in your name and it appears on your original birth certificate, HM Passport Office will write out the number alphabetically, for example, as Super Eight or Four Real.  However names containing numbers on a deed poll will be refused.
			}
		},
		lastName: {
			type: Sequelize.STRING,
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				},
				isAlpha: {
					args: true,
					msg: 'Must not contain numbers'
				}
			}
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: {
					args: true,
					msg: 'Must be valid email'
				}
			}
		},
		password: {
			type: Sequelize.STRING,
			validate: {
				//simple password check for dev:

				// isAlphanumeric:
				//   {
				//     args:true,
				//     msg: "Password can only contain valid letters and numbers"
				//   },

				//password check for presentation:
				validPw(value) {
					if (!value.match(/[0-9]/)) {
						throw new Error(
							'Password must include at least one number'
						)
					} else if (!value.match(/[!@#$%^&*]/)) {
						//check which symbols can be used maliciously:

						throw new Error(
							'Password must include at least one special character'
						)
					} else if (!value.match(/[A-Z]/)) {
						throw new Error(
							'Password must include at least one upper case character'
						)
					} else if (!value.match(/[a-z]/)) {
						throw new Error(
							'Password must include at least one lower case character'
						)
					} else if (value.match(/[;<>]/)) {
						throw new Error(
							'Password must not include illegal characters'
						)
					}
				},

				len: {
					args: [6, 15],
					msg: 'Password must be between 6 and 15 characters'
				}
			},
			get() {
				return () => this.getDataValue('password')
			}
		},
		username: {
			type: Sequelize.STRING,
			defaultValue: 'YourUsername',
			validate: {
				len: {
					args: [5, 15],
					msg: 'Username must be between 5 and 15 characters long'
				},
				isAlphanumeric: {
					args: true,
					msg: 'Username can only contain valid letters and numbers'
				}
			}
		},
		apt: {
			type: Sequelize.STRING,
			defaultValue: '',
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				}
			}
		},
		houseNumber: {
			type: Sequelize.STRING, //https://en.wikipedia.org/wiki/House_numbering
			defaultValue: '',
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				}
			}
		},
		street: {
			type: Sequelize.STRING,
			defaultValue: '',
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				}
			}
		},
		zipcode: {
			type: Sequelize.STRING, //https://www.postalcodesincanada.com/
			defaultValue: '',
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				}
			}
		},
		state: {
			type: Sequelize.STRING,
			defaultValue: '',
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				}
			}
		},
		country: {
			type: Sequelize.STRING,
			defaultValue: '',
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				},
				is: {
					args: /^[a-z]*$/i,
					msg: 'Must be valid country'
				}
			}
		},
		address: {
			type: Sequelize.STRING,
			validate: {
				validAdd(value) {
					if (value.match(/[;<>]/)) {
						throw new Error(
							'Address must not include illegal characters'
						)
					}
				}
			}
		},

		admin: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		salt: {
			type: Sequelize.STRING,
			get() {
				return () => this.getDataValue('salt')
			}
		},
		googleId: {
			type: Sequelize.STRING
		}
	},
	{
		hooks: {
			beforeCreate: user => {
				user.address = `${user.houseNumber}, ${user.street}, ${
					user.apt
				}, ${user.zipcode}, ${user.state}, ${user.country}`
			},
			beforeUpdate: user => {
				user.address = `${user.houseNumber}, ${user.street}, ${
					user.apt
				}, ${user.zipcode}, ${user.state}, ${user.country}`
			}
		}
	}
)

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
	return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
	console.log('in salt')
	if (user.changed('password')) {
		console.log('changed')
		user.salt = User.generateSalt()
		user.password = User.encryptPassword(user.password(), user.salt())
	}
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
	users.forEach(setSaltAndPassword)
})
