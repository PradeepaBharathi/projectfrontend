import React from 'react';
import { fireEvent, render, screen,waitFor } from '@testing-library/react';
import AddProject from './AddProject';
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
                        <AddProject />
                   )
        const linkElement = screen.getByTestId("project");
        expect(linkElement).toBeInTheDocument();
      })
      it('input changes update state',()=>{
        render(
           
                <AddProject />
            
          );
          const projectNameInput = screen.getByPlaceholderText('Test Project 1');
          fireEvent.change(projectNameInput, { target: { value: 'New Project' } });
          expect(projectNameInput).toHaveValue('New Project');
      })
      it('cancel button navigates to home page',()=>{
        render(
           
                <AddProject />
           
          );
          const cancelButton = screen.getByTestId('Cancel');
          fireEvent.click(cancelButton);
          expect(mockNavigate).toHaveBeenCalledWith('/home');
      })
    
  });



