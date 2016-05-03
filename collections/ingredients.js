ingredients = new Meteor.Collection('ingredients');

ingredientSchema = new SimpleSchema({
	nam: {
		type: String,
		label: 'Name'
	},
	typ: {
		type: String,
		label: 'Type'
	},
	qty: {
		type: Number,
		label: 'Quantity'
	},
	cal: {
		type: Number,
		label: 'Calories'
	},
	pri: {
		type: Number,
		label: 'Price'
	}
});
ingredients.attachSchema(ingredientSchema);