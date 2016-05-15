// création de la base de données contenant les différents ingrédient nécessaire à la conception d'un smoothie
ingredients = new Meteor.Collection('ingredients');

ingredientSchema = new SimpleSchema({
	// nom = banane, mandarine
	nam: {
		type: String,
		label: 'Name'
	},
	// type = green (légumes), fruit, seed (graines)
	typ: {
		type: String,
		label: 'Type'
	},
	// quantité en g
	qty: {
		type: Number,
		label: 'Quantity'
	},
	// calories de la portion en Kcal
	cal: {
		type: Number,
		label: 'Calories'
	},
	// prix en franc suisse
	pri: {
		type: Number,
		label: 'Price'
	}
});
ingredients.attachSchema(ingredientSchema);