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
		},
		'selectedOrderClass': function(){
			var orderId = this._id;
			var selectedOrder = Session.get('selectedOrder');
			if (orderId == selectedOrder){
				return "selectedStyle";
			}
		},
		'LDT': function(date){
        	if(date)
            	return moment(date).format('l LT');
    	}
	});
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
