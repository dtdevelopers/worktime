import {ForwardRefExoticComponent, RefAttributes} from 'react';
import { IconProps } from 'phosphor-react';

export type Page = {
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  title: string;
  route: string;
  component: React.FC;
  authenticated: boolean;
  showInMenu?: boolean;
  isOpen?: boolean;
  children?: Omit<Page, 'authenticated' | 'icon' | 'isOpen'>[];
};
