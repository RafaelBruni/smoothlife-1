// les routes permettent de lier les différents fichiers ".html/.js" 
// ainsi que les templates de ces mêmes pages.

// route qui va chercher le fichier du nom de homeLayout.html
FlowRouter.route('/', {
	name: 'home',
	action(){
		//affiche cette page homeLayout.html
		BlazeLayout.render('homeLayout');
	}
});

// route qui va chercher le fichier make.html 
FlowRouter.route('/make', {
	name: 'make',
	action(){
		// affiche dans mainLayout le template make
		BlazeLayout.render('mainLayout', {main: 'make'});
	}
});
// route qui va chercher le fichier ingredient.html
FlowRouter.route('/ingredient', {
	name: 'ingredient',
	action(){
		//affiche dans mainLayout le template newIngredient
		BlazeLayout.render('mainLayout', {main: 'newIngredient'});
	}
});
//route qui va chercher le fichier menu.html
FlowRouter.route('/menu', {
	name: 'menu',
	action(){
		//affiche dans le mainLayout le template menu
		BlazeLayout.render('mainLayout', {main: 'menu'});
	}
});
//route qui va chercher le fichier smoothies.html
FlowRouter.route('/smoothies', {
	name: 'smoothies',
	action(){
		//affiche dans mainLayout le template newSmoothie
		BlazeLayout.render('mainLayout', {main: 'newSmoothie'});
	}
});
// route qui va chercher le fichier order.html
FlowRouter.route('/orders', {
	name: 'orders',
	action(){
		//affiche dans mainLayout le template userOrders
		BlazeLayout.render('mainLayout', {main: 'userOrders'});
	}
});