Meteor.methods({
	'removeSmoothie': function(selectedSmoothie){
		menuSmoothies.remove({_id: selectedSmoothie});
	},
	'createMenuSmoothie': function(iNam, iGreen, iFruit1, iFruit2, iSeed, iPrice){
		check();
		menuSmoothies.insert({
			name: iNam,
			green: iGreen,
			fruit1: iFruit1,
			fruit2: iFruit2,
			seed: iSeed,
			price: iPrice
		});
	},
	'updateMenuSmoothie': function(uId, uNam, uGreen, uFruit1, uFruit2, uSeed, uPrice){
		check();
		menuSmoothies.update(
			{_id: uId},
			{$set: {name: uNam, green: uGreen, fruit1: uFruit1, fruit2: uFruit2, seed: uSeed, price: uPrice}
			});
	}
});
if (Meteor.isClient){

	Template.newSmoothie.helpers({
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
	Template.newSmoothieForm.helpers({
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
	}
	});
	Template.menuSmoothieUpdate.helpers({
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
	/* Initialize Update Form with Selected Smoothie Values */
	'initName': function(){
		var msName = Session.get('msName');
		return msName;
	},
	'initGreen': function(){
		var msGreen = Session.get('msGreen');
		return msGreen;
	},
	'initFruit1': function(){
		var msFruit1 = Session.get('msFruit1');
		return msFruit1;
	},
	'initFruit2': function(){
		var msFruit2 = Session.get('msFruit2');
		return msFruit2;
	},
	'initSeed': function(){
		var msSeed = Session.get('msSeed');
		return msSeed;
	}
	});
	Template.newSmoothie.events({
		'click .smoothiesList': function(){
			var smoothieId = this._id;
			Session.set('selectedSmoothie', smoothieId);
			var selectedSmoothie = Session.get('selectedSmoothie');
			/* Set Session Variables for Update in menuSmoothieUpdate Template */
			var mSmoothie = menuSmoothies.findOne({_id: smoothieId});
			Session.set('msName', mSmoothie.name);
			Session.set('msGreen', mSmoothie.green.nam);
			Session.set('msFruit1', mSmoothie.fruit1.nam);
			Session.set('msFruit2', mSmoothie.fruit2.nam);
			Session.set('msSeed', mSmoothie.seed.nam);
		},
		'click .removeSmoothie': function(){
			var selectedSmoothie = Session.get('selectedSmoothie');
			Meteor.call('removeSmoothie', selectedSmoothie);
		}
	});
	Template.newSmoothieForm.events({
		'submit form': function(){
			event.preventDefault();
			var iNam = event.target.Name.value;
			console.log(iNam);
			var iGreen = ingredients.findOne({nam: event.target.Green.value});
			var iFruit1 = ingredients.findOne({nam: event.target.Fruit1.value});
			var iFruit2 = ingredients.findOne({nam: event.target.Fruit2.value});
			var iSeed = ingredients.findOne({nam: event.target.Seed.value});
			var iPrice = iGreen.pri + iFruit1.pri + iFruit2.pri + iSeed.pri;
			Meteor.call('createMenuSmoothie', iNam, iGreen, iFruit1, iFruit2, iSeed, iPrice);
		},
	'reset form': function(){
		document.getElementById("Name").innerHTML="";
	}
	});
	Template.menuSmoothieUpdate.events({
		'submit form': function(){
			event.preventDefault();
			var uId = Session.get('selectedSmoothie');
			var uNam = event.target.Name.value;
			var uGreen = ingredients.findOne({nam: event.target.Green.value});
			var uFruit1 = ingredients.findOne({nam: event.target.Fruit1.value});
			var uFruit2 = ingredients.findOne({nam: event.target.Fruit2.value});
			var uSeed = ingredients.findOne({nam: event.target.Seed.value});
			var uPrice = uGreen.pri + uFruit1.pri + uFruit2.pri + uSeed.pri;
			Meteor.call('updateMenuSmoothie', uId, uNam, uGreen, uFruit1, uFruit2, uSeed, uPrice);
		},
		'reset form': function(){
		event.preventDefault();
		var msName = Session.get('msName');
		event.target.Name.value=msName;
		var msGreen = Session.get('msGreen');
		event.target.Green.value=msGreen;
		var msFruit1 = Session.get('msFruit1');
		event.target.Fruit1.value=msFruit1;
		var msFruit2 = Session.get('msFruit2');
		event.target.Fruit2.value=msFruit2;
		var msSeed = Session.get('msSeed');
		event.target.Seed.value=msSeed;
		}
	});
}