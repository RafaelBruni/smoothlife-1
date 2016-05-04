Meteor.methods({
	'createIngredient': function(iNam, iTyp, iQty, iCal, iPri){
		check();
		ingredients.insert({
			nam: iNam,
			typ: iTyp,
			qty: iQty,
			cal: iCal,
			pri: iPri
		});
	},
	'removeIngredient': function(selectedIngredient){
		ingredients.remove({_id: selectedIngredient});
	},
	'updateIngredientMethod': function(uId, uNam, uTyp, uQty, uCal, uPri){
		check();
		ingredients.update(
			{_id: uId},
			{$set: {nam: uNam, typ: uTyp, qty: uQty, cal: uCal, pri: uPri}
			});
	}
});
if (Meteor.isClient){

	Template.newIngredient.helpers({
		'ingredientsList': function(){
			return ingredients.find({},{sort:{typ:1, nam:1}});
		},
		'selectedIngredientClass': function(){
			var ingredientId = this._id;
			var selectedIngredient = Session.get('selectedIngredient');
			if (ingredientId == selectedIngredient){
				return "selectedStyle";
			}
		},
		'ingImg':function(){
			var ingImg = "<img class=\"menuImg\" src=\"img/"+this.nam+".png\">";
			return ingImg;
		}
	});
	Template.updateIngredient.helpers({
	/* Initialize Update Form with Selected Smoothie Values */
	'initNam': function(){
		var msNam = Session.get('miNam');
		return msNam;
	},
	'initTyp': function(){
		var msTyp = Session.get('miTyp');
		return msTyp;
	},
	'initQty': function(){
		var msQty = Session.get('miQty');
		return msQty;
	},
	'initCal': function(){
		var msCal = Session.get('miCal');
		return msCal;
	},
	'initPri': function(){
		var msPri = Session.get('miPri');
		return msPri;
	}
	});
	Template.newIngredient.events({
		'click .ingredientsList': function(){
			var ingredientId = this._id;
			Session.set('selectedIngredient', ingredientId);
			var selectedIngredient = Session.get('selectedIngredient');
			/* Set Session Variables for Update in updateIngredient Template */
			var mIngredient = ingredients.findOne({_id: ingredientId});
			Session.set('miNam', mIngredient.nam);
			Session.set('miTyp', mIngredient.typ);
			Session.set('miQty', mIngredient.qty);
			Session.set('miCal', mIngredient.cal);
			Session.set('miPri', mIngredient.pri);
		},
		'click .removeIngredient': function(){
			var selectedIngredient = Session.get('selectedIngredient');
			Meteor.call('removeIngredient', selectedIngredient);
		}
	});
	Template.newIngredientForm.events({
		'submit form': function(){
			event.preventDefault();
			var iNam = event.target.Name.value;
			var iTyp = event.target.Type.value;
			var iQty = event.target.Quantity.value;
			var iCal = event.target.Calories.value;
			var iPri = event.target.Price.value;
			/* checks if an ingredient with the same name already exists */
			var iArray = ingredients.find().fetch();
			var iCount = ingredients.find().count();
			var i = 0;
			var nExists = 0;
			for (i;i<iCount;i++){
				var mIngredient = iArray[i];
				var mNam = mIngredient.nam;
				if (mNam.toLowerCase()===iNam.toLowerCase()){
					console.log("Already exists");
					nExists = 1;
				} 
			}
			if (nExists===0) {
					Meteor.call('createIngredient', iNam, iTyp, iQty, iCal, iPri);
			}
		},
		'reset form': function(){
			document.getElementById("Name").innerHTML="";
			document.getElementById("Quantity").innerHTML="";
			document.getElementById("Calories").innerHTML="";
			document.getElementById("Price").innerHTML="";
		}
	});
	Template.updateIngredient.events({
		'submit form': function(){
			event.preventDefault();
			var uId = Session.get('selectedIngredient');
			var uNam = event.target.Name.value;
			var uTyp = event.target.Type.value;
			var uQty = event.target.Quantity.value;
			var uCal = event.target.Calories.value;
			var uPri = event.target.Price.value;
			Meteor.call('updateIngredientMethod', uId, uNam, uTyp, uQty, uCal, uPri);
			var sIng = ingredients.findOne({_id:uId});
			var sArray = menuSmoothies.find().fetch();
			var sCount = menuSmoothies.find().count();
			var i = 0;
			for (i;i<sCount;i++){
				var mSmoothie = sArray[i];
				var sId = mSmoothie._id;
				if (mSmoothie.green.nam==uNam){
					menuSmoothies.update({_id: sId}, {$set: {green: sIng}});
				}
				if (mSmoothie.fruit1.nam==uNam) {
					menuSmoothies.update({_id: sId}, {$set: {fruit1: sIng}});
				}
				if (mSmoothie.fruit2.nam==uNam) {
					menuSmoothies.update({_id: sId}, {$set: {fruit2: sIng}});
				}
				if (mSmoothie.seed.nam==uNam) {
					menuSmoothies.update({_id: sId}, {$set: {seed: sIng}});
				}
			}
		},
		'reset form': function(){
		event.preventDefault();
		var miNam = Session.get('miNam');
		event.target.Name.value=miNam;
		var miTyp = Session.get('miTyp');
		event.target.Type.value=miTyp;
		var miQty = Session.get('miQty');
		event.target.Quantity.value=miQty;
		var miCal = Session.get('miCal');
		event.target.Calories.value=miCal;
		var miPri = Session.get('miPri');
		event.target.Price.value=miPri;
		}
	});
}
