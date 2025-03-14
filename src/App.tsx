import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import CardPreviewScreen from './screens/CardPreviewScreen';
import CardsListScreen from './screens/CardsListScreen';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/admin/:id" element={<AdminScreen />} />
            <Route path="/preview" element={<CardPreviewScreen />} />
            <Route path="/preview/:id" element={<CardPreviewScreen />} />
            <Route path="/cards" element={<CardsListScreen />} />
            <Route path="*" element={<HomeScreen />} />
        </>
    ),
    {
        basename: '/'
    }
);

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

export default App; 