smoothies = new Meteor.Collection('smoothies');

smoothieSchema = new SimpleSchema({
	green: {
		type: ingredientSchema,
		label: 'green'
	},
	fruit1: {
		type: ingredientSchema,
		label: 'fruit1'
	},
	fruit2: {
		type: ingredientSchema,
		label: 'fruit2'
	},
	seed: {
		type: ingredientSchema,
		label: 'seed'
	},
	price: {
		type: Number,
		label: 'price'
	},
	orderBy: {
		type: String,
		label: 'order by',
		autoValue: function(){
			return this.userId;
		},
		autoform: {
			type: 'hidden'
		}
	},
	orderAt: {
		type: Date,
		label: 'order at',
		autoValue: function(){
			return new Date();
		},
		autoform: {
			type: 'hidden'
		}
	}
});
smoothies.attachSchema(smoothieSchema);