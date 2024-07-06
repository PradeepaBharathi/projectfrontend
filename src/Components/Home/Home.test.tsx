import React from 'react';
import { fireEvent, render, screen,waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../Store/store';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));



test('home component rendered', () => {
    render( <React.StrictMode>
        <Provider store={store}>
      
        <BrowserRouter>
                    <Home />
                </BrowserRouter>

        </Provider>
      </React.StrictMode>)
    const linkElement = screen.getByTestId('home');
    expect(linkElement).toBeInTheDocument();
  });

