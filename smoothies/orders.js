Meteor.methods({
	'createSmoothie': function(oGreen, oFruit1, oFruit2, oSeed, oPrice){
		check();
		smoothies.insert({
			green: oGreen,
			fruit1: oFruit1,
			fruit2: oFruit2,
			seed: oSeed,
			price: oPrice
		});
	},
	'removeOrder': function(selectedOrder){
		smoothies.remove({_id: selectedOrder});
	}
});
if (Meteor.isClient){
Template.orders.helpers({
	'smoothieList': function(){
		var userId=Meteor.userId();
		return smoothies.find({orderBy: userId}, {sort: {orderAt: -1}});
	},
	'greenList': function(){
		var type="Green";
			return ingredients.find({typ: type});
	},
	'fruitList': function(){
		var type="Fruit";
			return ingredients.find({typ: type});
	},
	'seedList': function(){
		var type="Seed";
			return ingredients.find({typ: type});
	},
	'LDT': function(date){
        if(date)
            return moment(date).format('l LT');
    },
	'selectedOrderClass': function(){
		var orderId = this._id;
		var selectedOrder = Session.get('selectedOrder');
		if (orderId == selectedOrder){
			return "selectedStyle";
		}
	},
	'sumQty': function(){
		if (isNaN(Session.get('greenQty'))) {
			var greenQty = 0;
		}
		else {
			var greenQty = Session.get('greenQty');
		}
		if (isNaN(Session.get('fruit1Qty'))) {
			var fruit1Qty = 0;
		}
		else {
			var fruit1Qty = Session.get('fruit1Qty');
		}
		if (isNaN(Session.get('fruit2Qty'))) {
			var fruit2Qty = 0;
		}
		else {
			var fruit2Qty = Session.get('fruit2Qty');
		}
		if (isNaN(Session.get('seedQty'))) {
			var seedQty = 0;
		}
		else {
			var seedQty = Session.get('seedQty');
		}
		var sumQty = greenQty + fruit1Qty + fruit2Qty + seedQty;
		return sumQty;
	},
	'sumCal': function(){
		if (isNaN(Session.get('greenCal'))) {
			var greenCal = 0;
		}
		else {
			var greenCal = Session.get('greenCal');
		}
		if (isNaN(Session.get('fruit1Cal'))) {
			var fruit1Cal = 0;
		}
		else {
			var fruit1Cal = Session.get('fruit1Cal');
		}
		if (isNaN(Session.get('fruit2Cal'))) {
			var fruit2Cal = 0;
		}
		else {
			var fruit2Cal = Session.get('fruit2Cal');
		}
		if (isNaN(Session.get('seedCal'))) {
			var seedCal = 0;
		}
		else {
			var seedCal = Session.get('seedCal');
		}
		var sumCal = greenCal + fruit1Cal + fruit2Cal + seedCal;
		return sumCal;
	},
	'sumPri': function(){
		if (isNaN(Session.get('greenPri'))) {
			var greenPri = 0;
		}
		else {
			var greenPri = Session.get('greenPri');
		}
		if (isNaN(Session.get('fruit1Pri'))) {
			var fruit1Pri = 0;
		}
		else {
			var fruit1Pri = Session.get('fruit1Pri');
		}
		if (isNaN(Session.get('fruit2Pri'))) {
			var fruit2Pri = 0;
		}
		else {
			var fruit2Pri = Session.get('fruit2Pri');
		}
		if (isNaN(Session.get('seedPri'))) {
			var seedPri = 0;
		}
		else {
			var seedPri = Session.get('seedPri');
		}
		var sumPri = greenPri + fruit1Pri + fruit2Pri + seedPri;
		return sumPri;
	}

});
Template.orders.events({
	'submit form': function(){
		event.preventDefault();
		var oGreen = ingredients.findOne({nam: event.target.Green.value});
		var oFruit1 = ingredients.findOne({nam: event.target.Fruit1.value});
		var oFruit2 = ingredients.findOne({nam: event.target.Fruit2.value});
		var oSeed = ingredients.findOne({nam: event.target.Seed.value});
		/* Calculate Smoothie Price from Ingredients Prices */
		var oPrice = oGreen.pri + oFruit1.pri + oFruit2.pri + oSeed.pri;
		/* Call Method to Create Smoothie in Collection */
		Meteor.call('createSmoothie', oGreen, oFruit1, oFruit2, oSeed, oPrice);
	},
	'reset form': function(){
		Session.set('greenQty', 0);
		Session.set('greenCal', 0);
		Session.set('greenPri', 0);
		document.getElementById("GreenQty").innerHTML="";
		document.getElementById("GreenCal").innerHTML="";
		document.getElementById("GreenPri").innerHTML="";
		document.getElementById("GreenImg").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		Session.set('fruit1Qty', 0);
		Session.set('fruit1Cal', 0);
		Session.set('fruit1Pri', 0);
		document.getElementById("Fruit1Qty").innerHTML="";
		document.getElementById("Fruit1Cal").innerHTML="";
		document.getElementById("Fruit1Pri").innerHTML="";
		document.getElementById("Fruit1Img").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		Session.set('fruit2Qty', 0);
		Session.set('fruit2Cal', 0);
		Session.set('fruit2Pri', 0);
		document.getElementById("Fruit2Qty").innerHTML="";
		document.getElementById("Fruit2Cal").innerHTML="";
		document.getElementById("Fruit2Pri").innerHTML="";
		document.getElementById("Fruit2Img").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		Session.set('seedQty', 0);
		Session.set('seedCal', 0);
		Session.set('seedPri', 0);
		document.getElementById("SeedQty").innerHTML="";
		document.getElementById("SeedCal").innerHTML="";
		document.getElementById("SeedPri").innerHTML="";
		document.getElementById("SeedImg").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";

	},
	'click .ordersList': function(){
		var orderId = this._id;
		Session.set('selectedOrder', orderId);
		var selectedOrder = Session.get('selectedOrder');
	},
	'click .removeOrder': function(){
		var selectedOrder = Session.get('selectedOrder');
		Meteor.call('removeOrder', selectedOrder);
	},
	'change .greenOption': function(){
		var greenOption = document.getElementById("Green").value;
		var oGreen = ingredients.findOne({nam: document.getElementById("Green").value});
		if (oGreen) {
		var gQty = oGreen.qty;
		Session.set('greenQty', gQty);
		var gCal = oGreen.cal;
		Session.set('greenCal', gCal);
		var gPri = oGreen.pri;
		Session.set('greenPri', gPri);
		document.getElementById("GreenQty").innerHTML=oGreen.qty;
		document.getElementById("GreenCal").innerHTML=oGreen.cal;
		document.getElementById("GreenPri").innerHTML=oGreen.pri;
		document.getElementById("GreenImg").innerHTML="<img class=\"icoIng\" src=\"img/"+oGreen.nam+".png\">";
		}
		else{
			Session.set('greenQty', 0);
			Session.set('greenCal', 0);
			Session.set('greenPri', 0);
			document.getElementById("GreenQty").innerHTML="";
			document.getElementById("GreenCal").innerHTML="";
			document.getElementById("GreenPri").innerHTML="";
			document.getElementById("GreenImg").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		}
	},
	'change .fruit1Option': function(){
		var fruit1Option = document.getElementById("Fruit1").value;
		var oFruit1 = ingredients.findOne({nam: document.getElementById("Fruit1").value});
		if (oFruit1) {
		var f1Qty = oFruit1.qty;
		Session.set('fruit1Qty', f1Qty);
		var f1Cal = oFruit1.cal;
		Session.set('fruit1Cal', f1Cal);
		var f1Pri = oFruit1.pri;
		Session.set('fruit1Pri', f1Pri);
		document.getElementById("Fruit1Qty").innerHTML=oFruit1.qty;
		document.getElementById("Fruit1Cal").innerHTML=oFruit1.cal;
		document.getElementById("Fruit1Pri").innerHTML=oFruit1.pri;
		document.getElementById("Fruit1Img").innerHTML="<img class=\"icoIng\" src=\"img/"+oFruit1.nam+".png\">";
		}
		else{
			Session.set('fruit1Qty', 0);
			Session.set('fruit1Cal', 0);
			Session.set('fruit1Pri', 0);
			document.getElementById("Fruit1Qty").innerHTML="";
			document.getElementById("Fruit1Cal").innerHTML="";
			document.getElementById("Fruit1Pri").innerHTML="";
			document.getElementById("Fruit1Img").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		}
	},
	'change .fruit2Option': function(){
		var fruit2Option = document.getElementById("Fruit2").value;
		var oFruit2 = ingredients.findOne({nam: document.getElementById("Fruit2").value});
		if (oFruit2) {
		var f2Qty = oFruit2.qty;
		Session.set('fruit2Qty', f2Qty);
		var f2Cal = oFruit2.cal;
		Session.set('fruit2Cal', f2Cal);
		var f2Pri = oFruit2.pri;
		Session.set('fruit2Pri', f2Pri);
		document.getElementById("Fruit2Qty").innerHTML=oFruit2.qty;
		document.getElementById("Fruit2Cal").innerHTML=oFruit2.cal;
		document.getElementById("Fruit2Pri").innerHTML=oFruit2.pri;
		document.getElementById("Fruit2Img").innerHTML="<img class=\"icoIng\" src=\"img/"+oFruit2.nam+".png\">";
		}
		else{
			Session.set('fruit2Qty', 0);
			Session.set('fruit2Cal', 0);
			Session.set('fruit2Pri', 0);
			document.getElementById("Fruit2Qty").innerHTML="";
			document.getElementById("Fruit2Cal").innerHTML="";
			document.getElementById("Fruit2Pri").innerHTML="";
			document.getElementById("Fruit2Img").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		}
	},
	'change .seedOption': function(){
		var seedOption = document.getElementById("Seed").value;
		var oSeed = ingredients.findOne({nam: document.getElementById("Seed").value});
		if (oSeed) {
		var sQty = oSeed.qty;
		Session.set('seedQty', sQty);
		var sCal = oSeed.cal;
		Session.set('seedCal', sCal);
		var sPri = oSeed.pri;
		Session.set('seedPri', sPri);
		document.getElementById("SeedQty").innerHTML=oSeed.qty;
		document.getElementById("SeedCal").innerHTML=oSeed.cal;
		document.getElementById("SeedPri").innerHTML=oSeed.pri;
		document.getElementById("SeedImg").innerHTML="<img class=\"icoIng\" src=\"img/"+oSeed.nam+".png\">";
		}
		else{
			Session.set('seedQty', 0);
			Session.set('seedCal', 0);
			Session.set('seedPri', 0);
			document.getElementById("SeedQty").innerHTML="";
			document.getElementById("SeedCal").innerHTML="";
			document.getElementById("SeedPri").innerHTML="";
			document.getElementById("SeedImg").innerHTML="<img class=\"icoIng\" src=\"img/blankIco.png\">";
		}
	}
	});
}