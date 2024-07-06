import React from 'react';
import { fireEvent, render, screen,waitFor } from '@testing-library/react';
import AddProject from './EditProject'
import { Provider } from 'react-redux';
import store from '../Store/store';
import { BrowserRouter } from 'react-router-dom';
import EditProject from './EditProject';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));



test('Edit project component rendered', () => {
    render( <React.StrictMode>
        <Provider store={store}>
      
        <BrowserRouter>
                    <EditProject />
                </BrowserRouter>

        </Provider>
      </React.StrictMode>)
    const linkElement = screen.getByTestId('editProject');
    expect(linkElement).toBeInTheDocument();
  });

  test('input changes update state', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProject />
        </BrowserRouter>
      </Provider>
    );
  
    const startDateInput = screen.getByTestId('start');
    fireEvent.change(startDateInput, { target: { value: '2023-07-13T12:00' } });
    expect(startDateInput).toHaveValue('2023-07-13T12:00');
  });

  
  test('input changes update state', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProject />
        </BrowserRouter>
      </Provider>
    );
  
    const endDateInput = screen.getByTestId('end');
    fireEvent.change(endDateInput, { target: { value: '2023-07-13T12:00' } });
    expect(endDateInput).toHaveValue('2023-07-13T12:00');
  });



  test('cancel button navigates to home page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProject />
        </BrowserRouter>
      </Provider>
    );
  
    const cancelButton = screen.getByTestId('Cancel');
    fireEvent.click(cancelButton);
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });