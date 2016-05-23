Meteor.methods({
	'removeOrder': function(selectedOrder){
		smoothies.remove({_id: selectedOrder});
	}
});
if (Meteor.isClient){
	Template.userOrders.helpers({
		'smoothieList': function(){
			var userId=Meteor.userId();
			return smoothies.find({orderBy: userId}, {sort: {orderAt: -1}});
		},// Permet d'afficher les choix du client sur l'HTML //
		'selectedOrderClass': function(){
			var orderId = this._id;
			var selectedOrder = Session.get('selectedOrder');
			if (orderId == selectedOrder){
				return "selectedStyle";
			}
		}, // Donne la date au client lors de la finalisation de sa commande//
		'LDT': function(date){
        	if(date)
            	return moment(date).format('l LT');
    	}
	});// La fonction qui permet d'annuler la commande//
	Template.userOrders.events({
		'click .removeOrder': function(){
			var selectedOrder = Session.get('selectedOrder');
			Meteor.call('removeOrder', selectedOrder);
	},
		'click .ordersList': function(){
			var orderId = this._id;
			Session.set('selectedOrder', orderId);
	}
	});
}
