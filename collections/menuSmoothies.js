menuSmoothies = new Meteor.Collection('menuSmoothies');

menuSmoothieSchema = new SimpleSchema({
	name:{
		type: String,
		label: 'Name'
	},
	green: {
		type: ingredientSchema,
		label: 'Green'
	},
	fruit1: {
		type: ingredientSchema,
		label: 'Fruit 1'
	},
	fruit2: {
		type: ingredientSchema,
		label: 'Fruit 2'
	},
	seed: {
		type: ingredientSchema,
		label: 'Seed'
	},
	price:{
		type: Number,
		label: 'Price'
	}
});

menuSmoothies.attachSchema(menuSmoothieSchema);