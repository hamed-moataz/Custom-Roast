import { v4 as uuid } from 'uuid';

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '#'
	},
	{
		id: uuid(),
		title: 'LAYOUTS & PAGES',
		grouptitle: true
	},

			{ id: uuid(), link: '/admin/machines', name: 'Machines' ,title: 'Machines'},
			{ id: uuid(), link: '/admin/grinders', name: 'Grinders' ,title: 'Grinders'},
			{ id: uuid(), link: '/admin/courses', name: 'Courses'  ,title: 'Courses'},
			{ id: uuid(), link: '/admin/coffees', name: 'Coffees' ,title: 'Coffees'},
			{ id: uuid(), link: '/admin/workshops', name: 'Workshops' ,title: 'Workshops'},
			{ id: uuid(), link: '/admin/accessories', name: 'Accessories' ,title: 'Accessories'},
			{ id: uuid(), link: '/admin/teammates', name: 'Teammates' ,title: 'Teammates'},
	


];

export default DashboardMenu;
