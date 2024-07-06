import React from 'react';
import { fireEvent, render, screen,waitFor } from '@testing-library/react';
import Login from './Login';
import { useAppSelector } from '../Store/react-hooks';
import { testUseAppSelector } from '../Store/test-app-selctor';


jest.mock('../Store/react-hooks')
const MockedTheClass = useAppSelector as jest.Mock<any>;
const mockNavigate = jest.fn()
;
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));



describe('add', () => {
    beforeEach(()=>{
        MockedTheClass.mockImplementation(testUseAppSelector)
      })
      afterEach(()=>{
        jest.clearAllMocks()
      })
      it('add project component rendered',()=>{
        render( 
                        <Login />
                   )
        const linkElement = screen.getByTestId("login");
        expect(linkElement).toBeInTheDocument();
      })
      it('email changes update state',()=>{
        render(
           
                <Login />
            
          );
          const projectNameInput = screen.getByPlaceholderText('Email');
          fireEvent.change(projectNameInput, { target: { value: 'New@gmail.com' } });
          expect(projectNameInput).toHaveValue('New@gmail.com');
      })
      
      it('password changes update state',()=>{
        render(
           
                <Login />
            
          );
          const projectNameInput = screen.getByPlaceholderText('Password');
          fireEvent.change(projectNameInput, { target: { value: '123456' } });
          expect(projectNameInput).toHaveValue('123456');
      })
   
  });



