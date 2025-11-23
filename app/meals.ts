type Meal = {
	id: string;
	name: string;
	sideDishes: {
		id: string;
		title: string;
	}[];
};

export const meals: Meal[] = [
	{
		id: "hamburger",
		name: "Hamburger",
		sideDishes: [
			{
				id: "salad",
				title: "Salad",
			},
			{
				id: "fries",
				title: "Fries",
			},
			{
				id: "lemonade",
				title: "Lemonade",
			},
		],
	},
	{
		id: "pasta",
		name: "Pasta",
		sideDishes: [
			{
				id: "salad",
				title: "Salad",
			},
			{
				id: "mushroom-sauce",
				title: "Mushroom sauce",
			},
			{
				id: "fried-veggies",
				title: "Fried veggies",
			},
		],
	},
	{
		id: "ice-cream",
		name: "Ice cream",
		sideDishes: [
			{
				id: "caramel-syrup",
				title: "Caramel syrup",
			},
		],
	},
	{
		id: "duck",
		name: "Duck",
		sideDishes: [
			{
				id: "onigiri",
				title: "Onigiri",
			},
		],
	},
	{
		id: "chili-con-carne",
		name: "Chili con carne",
		sideDishes: [
			{
				id: "baked-potatoes",
				title: "Baked potatoes",
			},
		],
	},
];
