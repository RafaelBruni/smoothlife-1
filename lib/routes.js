FlowRouter.route('/', {
	name: 'home',
	action(){
		BlazeLayout.render('homeLayout');
	}
});
FlowRouter.route('/order', {
	name: 'order',
	action(){
		BlazeLayout.render('mainLayout', {main: 'orders'});
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