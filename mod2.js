G.AddData({
name:'Example mod',
author:'Orteil',
desc:'A simple example mod that adds hot peppers and hot sauce.',
engineVersion:1,
manifest:'modManifest.js',
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	//The idea in this simple example mod is to add a few elements focused around hot sauce, because hot sauce is great and I use that stuff everywhere.
	
	//First we create a couple new resources :
	new G.Res({
		name:'Milk',
		desc:'[Milk] is loaded with nutrients and calcium, and, depending on who you ask, may produce a pleasant sensation when eaten.',
		icon:[0,0,'spicySheet'],
		turnToByContext:{'eat':{'health':10000000000000.000,'happiness':300000000000000000000000.000},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'Cheese',
		desc:'[Cheese] is made of milk, and depending on who you ask, may cause a splendid sensation.',
		icon:[1,0,''],
		turnToByContext:{'eat':{'health':20000000000000.000,'happiness':600000000000000000000000.000},'decay':{'Cheese':,'spoiled food':0.0000000000000000000000000000000000000000002}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'Pepperoni',
		desc:'[Pepperoni] is made of cured meat, and depending on who you ask, may cause a spicy and tasty sensation.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':20000000000000.000,'happiness':600000000000000000000000.000},'decay':{'Cheese':,'spoiled food':0.0000000000000000000000000000000000000000002}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'Pizza',
		desc:'[Pizza] is made out of an assortment of items, and depending on who you ask, may cause a splendid sensation.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':20000000000000000000000000000000000000000000000000000000000000000.000,'happiness':600000000000000000000000000000000000000000000000000000000000000000.000},'decay':{'Cheese':,'spoiled food':0.0000000000000000000000000000000000000000002}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	})
	new G.Res({
		name:'Pizza dough',
		desc:'[Pizza dough] is made out of herbs and water, and even though it is yummy, may cause diarrhea.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':20000000000000.000,'happiness':600000000000000000000000.000},'decay':{'Cheese':,'spoiled food':0.0000000000000000000000000000000000000000002}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});	
	
	//Then we augment the base data to incorporate our new resources :
		//adding hot pepper as something that can be gathered from grass
	G.getDict('grass').res['gather']['Milk']=3;});
	G.getDict('artisan').modes['hot']={name:'Pizza dough',desc:'Turn 3 [cured meat] and 3 [herb]s into 1 [pepperoni].',req:{'Pizza dough preparing':true},use:{'knapped tools':1}};
	G.getDict('artisan').effects.push({type:'convert',from:{'water':3,'herb':3},into:{'Pizza dough':1},every:3,mode:'Pepperoni'});
	G.getDict('artisan').modes['hot']={name:'Cheese',desc:'Turn 3 [milk] and 1 [salt]s into 1 [cheese].',req:{'Cheese Preparing':true},use:{'knapped tools':1}};
	G.getDict('artisan').effects.push({type:'convert',from:{'milk':3,'salt':3},into:{'cheese':1},every:3,mode:'Cheese'});
	G.getDict('artisan').modes['hot']={name:'Pepperoni',desc:'Turn 3 [cured meat] and 3 [herb]s into 1 [pepperoni].',req:{'Pepperoni preparation':true},use:{'knapped tools':1}};
	G.getDict('artisan').effects.push({type:'convert',from:{'cured meat':3,'herb':3},into:{'Pepperoni':1},every:3,mode:'Pepperoni'});
	G.getDict('artisan').modes['hot']={name:'Pizza',desc:'Turn 1 [Pizza dough], 2 [Pepperoni], and 5 [cheese].',req:{'Pizza Preparation'},use:'knapped tools':1}};
	G.getDict('artisan').effects.push({type:'convert',from:{'Cheese':3,'Pizza dough':1, 'Pepperoni':5},into:{'Pizza':1},every:3,mode:'Pepperoni'});
		new G.Tech({
		name:'Cheese Preparing'
		desc:'@[artisan]s can now produce [Cheese] from [Milk]s and [Salt]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	});
	new G.Tech({
		name:'Pepperoni preparation'
		desc:'@[artisan]s can now produce [Pepperoni] from [herbs]s and [cured meat]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':5]
		req:{'cooking':true},
	});
new G.Tech({
		name:'Pizza dough preparing'
		desc:'@[artisan]s can now produce [Pizza Dough] from [water]s and [herbs]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight': 5},
		req:{'cooking':true},
	});
new G.Tech({
		name:'Pizzas!'
		desc:'@[artisan]s can now produce [Pizza] from [Cheese]s, [Pepperoni]s, and [Pizza Dough]//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	});
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	new G.Trait({
		name:'PIZZA',
		desc:'@your people appreciate [Pizza] two times more.',
		icon:[1,1,'spicySheet'],
		chance:20,
		req:{'Pizza Preparing':true},
		effects:[
			{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=1200000000000000000000000000000000000000000000000000000000000000000.000;}},//this is a custom function executed when we gain the trait
		],
	});
	
	
}
});
