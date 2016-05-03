Meteor.publish('ingredientsPublish', function(){
	return ingredients.find();
});
Meteor.publish('smoothiesPublish', function(){
	return smoothies.find();
});
Meteor.publish('menuSmoothiesPublish', function(){
	return menuSmoothies.find();
});