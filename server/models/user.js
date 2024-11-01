import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		title: { type: String, required: true },
		role: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
		isActive: { type: Boolean, required: true, default: true }
	},
	{ timestamps: true }
)

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

const initializeAdminUser = async () => {
	try {
		const adminEmail = 'admin@gmail.com'
		const adminPassword = adminEmail // Password same as email

		// Check if the Admin user already exists
		const existingAdmin = await User.findOne({ email: adminEmail })

		if (!existingAdmin) {
			// Hash the password
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(adminPassword, salt)

			// Create new Admin user
			const adminUser = new User({
				name: 'Admin', // You can customize this name
				title: 'Administrator',
				role: 'admin',
				email: adminEmail,
				password: adminPassword,
				isAdmin: true,
				isActive: true
			})

			await adminUser.save()
			console.log('Admin user created successfully.')
		} else {
			console.log('Admin user already exists.')
		}
	} catch (error) {
		console.error('Error initializing Admin user:', error)
	}
}

// Function to connect to the database and initialize the Admin user
const connectDBAndInitialize = async () => {
	try {
		// Replace with your MongoDB URI
		const mongoURI = 'mongodb://localhost:27017/TM_DB'
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		console.log('MongoDB connected successfully.')

		// Initialize the Admin user
		await initializeAdminUser()
	} catch (error) {
		console.error('Error connecting to MongoDB:', error)
		process.exit(1) // Exit process with failure
	}
}

// Call this function to start the server
connectDBAndInitialize()

const User = mongoose.model('User', userSchema)

export default User
