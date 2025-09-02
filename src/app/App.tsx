import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} /> 
    </Provider>
  )
};

export default App;
