import {Page} from '../../types/page';
import Home from "../../features/backoffice/Home";
import Employee from "../../features/backoffice/Employee";


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
  },
  // {
  //   icon: undefined,
  //   title: 'Chat',
  //   route: 'chat',
  //   component: Chat,
  //   authenticated: true,
  //   showInMenu: false,
  //   children: [
  //     {
  //       title: 'Chat',
  //       route: ':id',
  //       component: ChatWrapper,
  //     },
  //   ],
  // },
];

export default Pages;
