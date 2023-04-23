export type Page = {
  icon?: any;
  title: string;
  route: string;
  component: React.FC;
  authenticated: boolean;
  showInMenu?: boolean;
  isOpen?: boolean;
  children?: Omit<Page, 'authenticated' | 'icon' | 'isOpen'>[];
};
