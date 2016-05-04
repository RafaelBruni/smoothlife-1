FlowRouter.route('/', {
	name: 'home',
	action(){
		BlazeLayout.render('homeLayout');
	}
});
FlowRouter.route('/make', {
	name: 'make',
	action(){
		BlazeLayout.render('mainLayout', {main: 'make'});
	}
});
FlowRouter.route('/ingredient', {
	name: 'ingredient',
	action(){
		BlazeLayout.render('mainLayout', {main: 'newIngredient'});
	}
});
FlowRouter.route('/menu', {
	name: 'menu',
	action(){
		BlazeLayout.render('mainLayout', {main: 'menu'});
	}
});
FlowRouter.route('/smoothies', {
	name: 'smoothies',
	action(){
		BlazeLayout.render('mainLayout', {main: 'newSmoothie'});
	}
});
FlowRouter.route('/orders', {
	name: 'orders',
	action(){
		BlazeLayout.render('mainLayout', {main: 'userOrders'});
	}
});