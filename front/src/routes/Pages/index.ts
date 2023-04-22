import {Page} from '../../types/page';
import Home from "../../features/backoffice/Home";
import Employee from "../../features/backoffice/Employee";
import Create from "../../features/backoffice/Employee/Create/index";
import Edit from '../../features/backoffice/Employee/Edit/index';


const Pages: Page[] = [
  {
    icon: undefined,
    title: '',
    route: '',
    component: Home,
    authenticated: true,
  },
  {
    icon: undefined,
    title: '',
    route: 'employee',
    component: Employee,
    authenticated: true,
    showInMenu: false,
    children: [
      {
        title: 'create',
        route: 'create',
        component: Create,
      },
      {
        title: 'create',
        route: 'edit/:id',
        component: Edit,
      },
    ],
  },
];

export default Pages;
