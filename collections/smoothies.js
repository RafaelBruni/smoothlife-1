//création d'une base de données contenant les smoothies commandés par les utilisateurs
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
	// permet de savoir qui a commandé le smoothie
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
	// permet de savoir à quel moment le smoothie à été commander
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