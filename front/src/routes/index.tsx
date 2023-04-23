import {HashRouter, Route, Routes as ReactRoutes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Layout from '../components/Layout';
import useAuthStore from '../store/Auth';
import Pages from './Pages';
import {toast, ToastContainer, Zoom} from 'react-toastify';
import PrivateRoute from './PrivateRoute';
import Login from "../features/public/Login";
import api from "../services/api";
import Home from "../features/backoffice/Home";
import Employee from "../features/backoffice/Employee";
import EmployeeCreate from '../features/backoffice/Employee/EmployeeCreate/index';
import EmployeeEdit from '../features/backoffice/Employee/EmployeeEdit/index';
import EmployeeJourneyControl from '../features/backoffice/Employee/EmployeeJourneyControl/index';

export const queryClient = new QueryClient();

function Routes() {
    const { isAuthenticated, logout } = useAuthStore();

    api.addResponseTransform( response => {
        if (!response.ok) {
            if (response.status === 401) {
                toast.error(response.data.message)
                logout();
            }
            throw response;
        }
    });

  return (
    <QueryClientProvider client={queryClient}>
          <ToastContainer
              position='top-right'
              autoClose={2500}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              transition={Zoom}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'light'}
          />
        <HashRouter>
          <ReactRoutes>
            {isAuthenticated ? (
              <Route path='/' element={<Layout />}>
                  <Route
                      key={'home'}
                      path={''}
                      element={<Home />}
                  />
                  <Route
                    key={'employee'}
                    path={'employee'}
                    element={<Employee />}
                  >
                      <Route
                        key={'employee-create'}
                        path={'create'}
                        element={<EmployeeCreate />}
                      />
                      <Route
                        key={'employee-edit'}
                        path={'edit/:id'}
                        element={<EmployeeEdit />}
                      />
                      <Route
                        key={'employee-journey-control'}
                        path={'journey-control/:id'}
                        element={<EmployeeJourneyControl />}
                      />
                  </Route>
                  <Route path='*' element={<span>wildcard</span>} />
              </Route>
            ) : (
              <>
                <Route path='/' element={<Login />} />
                <Route path='*' element={<Login />} />
              </>
            )}
          </ReactRoutes>
        </HashRouter>
    </QueryClientProvider>
  );
}

export default Routes;
