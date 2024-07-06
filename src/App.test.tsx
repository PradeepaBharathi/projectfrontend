import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { useAppSelector } from './Components/Store/react-hooks';
import { testUseAppSelector } from './Components/Store/test-app-selctor';


jest.mock('./Components/Store/react-hooks')
const MockedTheClass = useAppSelector as jest.Mock<any>;
describe('App', () => {
  beforeEach(()=>{
    MockedTheClass.mockImplementation(testUseAppSelector)
  })
  afterEach(()=>{
    jest.clearAllMocks()
  })
  it("app rendered" ,()=>{
    render(
      <App/>);
      const linkElement = screen.getByTestId("start");
      expect(linkElement).toBeInTheDocument();
  })
});
