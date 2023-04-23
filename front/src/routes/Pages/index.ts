import {Page} from '../../types/page';
import Home from "../../features/backoffice/Home";
import Employee from "../../features/backoffice/Employee";
import EmployeeCreate from "../../features/backoffice/Employee/EmployeeCreate/index";
import EmployeeEdit from '../../features/backoffice/Employee/EmployeeEdit/index';
import EmployeeJourneyControl from '../../features/backoffice/Employee/EmployeeJourneyControl/index';


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
        component: EmployeeCreate,
      },
      {
        title: 'edit',
        route: 'edit/:id',
        component: EmployeeEdit,
      },
      {
        title: 'journey-control',
        route: 'journey-control/:id',
        component: EmployeeJourneyControl,
      }
    ],
  },
];

export default Pages;
