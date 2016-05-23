// Le but des fonctions specifiques a cette page est de permettre au client de choisir parmis les smoothies  du menu//
// devant toujours contenir un Green, un fruit 1 un fruit 2 et un complement ou graines le tout ayant un prix et des calories//
Meteor.methods({
Meteor.methods({
	'insertMenuSmoothie': function(sGreen, sFruit1, sFruit2, sSeed, sPrice){
		check();
		smoothies.insert({
			green: sGreen,
			fruit1: sFruit1,
			fruit2: sFruit2,
			seed: sSeed,
			price: sPrice
		});
	}
});
//va chercher dans la base de donnee et liste pour l'utilisateur des smoothie du menu//
if (Meteor.isClient) {
	Template.menu.helpers({
		'smoothiesList': function(){
			return menuSmoothies.find({},{sort:{name:1}});
		},
		'selectedSmoothieClass': function(){
			var smoothieId = this._id;
			var selectedSmoothie = Session.get('selectedSmoothie');
			if (smoothieId == selectedSmoothie){
				return "selectedStyle";
			}
		},
		// les differentes fonctions pour la quantite, les calories et le prix
		'smoothieQty': function(){
			var sQty = this.green.qty + this.fruit1.qty + this.fruit2.qty + this.seed.qty;
			return sQty;
		},
		'smoothieCal': function(){
			var sCal = this.green.cal + this.fruit1.cal + this.fruit2.cal + this.seed.cal;
			return sCal;
		},
		'smoothiePri': function(){
			var sPri = this.green.pri + this.fruit1.pri + this.fruit2.pri + this.seed.pri;
			return sPri;
		}
	});
Template.menu.events({
		'click .orderMenuSmoothie': function (){
			var smoothieId = Session.get('selectedSmoothie');
			var oSmoothie = menuSmoothies.findOne({_id: smoothieId});
			var sGreen = oSmoothie.green;
			var sFruit1 = oSmoothie.fruit1;
			var sFruit2 = oSmoothie.fruit2;
			var sSeed = oSmoothie.seed;
			var sPrice = sGreen.pri + sFruit1.pri + sFruit2.pri + sSeed.pri;
			Meteor.call('insertMenuSmoothie', sGreen, sFruit1, sFruit2, sSeed, sPrice);
		},
		/* Display Smoothie Details */
		'click .smoothiesList': function(){
			var smoothieId = this._id;
			Session.set('selectedSmoothie', smoothieId);
			var selectedSmoothie = Session.get('selectedSmoothie');
			/* Display Columns Titles */
			document.getElementById("typeTitle").innerHTML="Type";
			document.getElementById("ingredientTitle").innerHTML="Name";
			document.getElementById("qtyTitle").innerHTML="Quantity";
			document.getElementById("calTitle").innerHTML="Calories";
			document.getElementById("priTitle").innerHTML="Price";
			document.getElementById("imgTitle").innerHTML="Image";
			/* Display Smoothie Image, Name and Price */
			document.getElementById("sImg").innerHTML="<img class=\"menuImg\" src=\"img/"+this.name+".png\">";
			document.getElementById("menuSmoothieName").innerHTML=this.name;
			document.getElementById("menuSmoothiePrice").innerHTML=this.price+" Frs.";
			/* Display Green Composition and Image */
			document.getElementById("greenTitle").innerHTML="Green";
			document.getElementById("greenName").innerHTML=this.green.nam;
			document.getElementById("greenQty").innerHTML=this.green.qty;
			document.getElementById("greenCal").innerHTML=this.green.cal;
			document.getElementById("greenPri").innerHTML=this.green.pri;
			document.getElementById("greenImg").innerHTML="<img class=\"icoIng\" src=\"img/"+this.green.nam+".png\">";
			/* Display Fruit 1 Composition and Image */
			document.getElementById("fruit1Title").innerHTML="Fruit 1";
			document.getElementById("fruit1Name").innerHTML=this.fruit1.nam;
			document.getElementById("fruit1Qty").innerHTML=this.fruit1.qty;
			document.getElementById("fruit1Cal").innerHTML=this.fruit1.cal;
			document.getElementById("fruit1Pri").innerHTML=this.fruit1.pri;
			document.getElementById("fruit1Img").innerHTML="<img class=\"icoIng\" src=\"img/"+this.fruit1.nam+".png\">";
			/* Display Fruit 2 Composition and Image */
			document.getElementById("fruit2Title").innerHTML="Fruit 2";
			document.getElementById("fruit2Name").innerHTML=this.fruit2.nam;
			document.getElementById("fruit2Qty").innerHTML=this.fruit2.qty;
			document.getElementById("fruit2Cal").innerHTML=this.fruit2.cal;
			document.getElementById("fruit2Pri").innerHTML=this.fruit2.pri;
			document.getElementById("fruit2Img").innerHTML="<img class=\"icoIng\" src=\"img/"+this.fruit2.nam+".png\">";
			/* Display Seed Composition and Image */
			document.getElementById("seedTitle").innerHTML="Seed";
			document.getElementById("seedName").innerHTML=this.seed.nam;
			document.getElementById("seedQty").innerHTML=this.seed.qty;
			document.getElementById("seedCal").innerHTML=this.seed.cal;
			document.getElementById("seedPri").innerHTML=this.seed.pri;
			document.getElementById("seedImg").innerHTML="<img class=\"icoIng\" src=\"img/"+this.seed.nam+".png\">";
		}
	});
}