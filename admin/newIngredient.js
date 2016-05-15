// methodes permettent de controler lors de l'appel des foncitons, si l'utilistateur est autorisé 
// à effectuer des modifications dans la base de données 
Meteor.methods({
	//fonction qui créer un ingrédient dans la base de données, /collection/ingredient.js
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
	// permet de retirer l'élément sélectionné, sur la page html, de la base de données. /collection/ingredient.js
	'removeIngredient': function(selectedIngredient){
		ingredients.remove({_id: selectedIngredient});
	},
	// permet de mettre à jour un ingredient deja existant de la base de données. /collection/ingredient.js
	'updateIngredientMethod': function(uId, uNam, uTyp, uQty, uCal, uPri){
		check();
		ingredients.update(
			{_id: uId},
			// remplace l'ancien élément par le nouveau, le nouveau prix d'un fruit par exemple.
			{$set: {nam: uNam, typ: uTyp, qty: uQty, cal: uCal, pri: uPri}
			});
	}
});
// uniquement si la plateforme meteor tourne sur client et non pas sur server.
if (Meteor.isClient){
// template qui ajoute un nouvel ingrédient à la base de données. 
	Template.newIngredient.helpers({
		'ingredientsList': function(){
			// trie la base de données par ordre ascendant
			return ingredients.find({},{sort:{typ:1, nam:1}});
		},
		'selectedIngredientClass': function(){
			var ingredientId = this._id;
			// recupère la valeur de la variable dans la session.set de l'events NewIngerdient 
			var selectedIngredient = Session.get('selectedIngredient');
			if (ingredientId == selectedIngredient){
				return "selectedStyle";
			}
		},
		// permet de recuperer l'image de ce nouvel ingrédients pour autant qu'elle existe dans
		// le dossier /public/img
		'ingImg':function(){
			var ingImg = "<img class=\"menuImg\" src=\"img/"+this.nam+".png\">";
			return ingImg;
		}
	});
	Template.updateIngredient.helpers({
	// initialise la mise à jour du formulaire avec les nouvelles valeurs de l'ingredient
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
	// event qui permet de recuperer les informations que l'utilisateur entre dans l'html: ingredient.html
	Template.newIngredient.events({
		'click .ingredientsList': function(){
			var ingredientId = this._id;
			Session.set('selectedIngredient', ingredientId);
			var selectedIngredient = Session.get('selectedIngredient');
			// defini des variables de Session pour une mise à jour dans le template updateIngredient
			var mIngredient = ingredients.findOne({_id: ingredientId});
			Session.set('miNam', mIngredient.nam);
			Session.set('miTyp', mIngredient.typ);
			Session.set('miQty', mIngredient.qty);
			Session.set('miCal', mIngredient.cal);
			Session.set('miPri', mIngredient.pri);
		},
		// supprime l'ingrédient selectionné, en appelant la methode
		'click .removeIngredient': function(){
			var selectedIngredient = Session.get('selectedIngredient');
			Meteor.call('removeIngredient', selectedIngredient);
		}
	});
	// injecte le nouvel ingredient dans le formulaire qui s'affiche sur ingredient.html
	Template.newIngredientForm.events({
		'submit form': function(){
			event.preventDefault();
			var iNam = event.target.Name.value;
			var iTyp = event.target.Type.value;
			var iQty = event.target.Quantity.value;
			var iCal = event.target.Calories.value;
			var iPri = event.target.Price.value;
			// verifie que le nouvel ingredient n'existe pas, en comparant les noms.
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
				//appel la méthode
					Meteor.call('createIngredient', iNam, iTyp, iQty, iCal, iPri);
			}
		},
		// remet le formulaire à jour, et donc rend visible le nouvel ingredient sur la page html.
		'reset form': function(){
			document.getElementById("Name").innerHTML="";
			document.getElementById("Quantity").innerHTML="";
			document.getElementById("Calories").innerHTML="";
			document.getElementById("Price").innerHTML="";
		}
	});
	// permet de recuperer les nouvelles valeurs de l'ingredient
	Template.updateIngredient.events({
		'submit form': function(){
			event.preventDefault();
			var uId = Session.get('selectedIngredient');
			var uNam = event.target.Name.value;
			var uTyp = event.target.Type.value;
			var uQty = event.target.Quantity.value;
			var uCal = event.target.Calories.value;
			var uPri = event.target.Price.value;
			//appel la methode 
			Meteor.call('updateIngredientMethod', uId, uNam, uTyp, uQty, uCal, uPri);
			var sIng = ingredients.findOne({_id:uId});
			var sArray = menuSmoothies.find().fetch();
			var sCount = menuSmoothies.find().count();
			var i = 0;
			for (i;i<sCount;i++){
				var mSmoothie = sArray[i];
				var sId = mSmoothie._id;
				// modifie les données inscritent par l'utilisateur 
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
		// remet à jour le formulaire, et donc affiche l'ingrédient modifié sur l'html.
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
