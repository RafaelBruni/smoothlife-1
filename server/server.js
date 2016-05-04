Meteor.publish('ingredientsPublish', function(){
	return ingredients.find();
});
Meteor.publish('smoothiesPublish', function(){
	var currentUserId = this.userId;
	return smoothies.find({ orderBy: currentUserId });
});
Meteor.publish('menuSmoothiesPublish', function(){
	return menuSmoothies.find();
});