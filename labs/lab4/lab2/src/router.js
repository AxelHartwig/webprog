import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from './ComposeSalad'
import ViewOrder from './ViewOrder';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';
import ConfirmOrder from './ConfirmOrder';
import inventoryLoader from './InventoryLoader';

const router = createBrowserRouter([
    {
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage/>,
            index: true
        },
        {
            path: "compose-salad",
            loader: inventoryLoader,
            element: <ComposeSalad/>
        },
        {
            path: "view-order",
            element: <ViewOrder/>,
            children: [
                {

                  path: "confirm/:id",
                  element: <ConfirmOrder />,
      
                }
              ]   
        },
        {
            path: "*",
            element: <ErrorPage/>
        }
    ]
    },
]);

export default router;