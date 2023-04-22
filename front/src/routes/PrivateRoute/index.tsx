import { createElement } from 'react';
import {Page} from '../../types/page';

const PrivateRoute = ({page}: { page: Partial<Page> }) => {
    if (!page.component) {
        return <span>vc nao tem acesso!</span>;
    }
    return createElement(page.component);
}

export default PrivateRoute;
