Meteor.publish('ingredientsPublish', function(){
	return ingredients.find();
}); // Ici on demande a Meteor de publier les differents elements selectionner du serveur chez le client//
Meteor.publish('smoothiesPublish', function(){
	var currentUserId = this.userId;
	return smoothies.find({ orderBy: currentUserId });
});
Meteor.publish('menuSmoothiesPublish', function(){
	return menuSmoothies.find();
});