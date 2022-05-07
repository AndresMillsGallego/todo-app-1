import { render, screen, fireEvent } from '@testing-library/react'
import AuthProvider, { AuthContext } from '../context/auth';
import Login from '../components/auth/Login';
import Auth from '../components/auth/Auth'
import '@testing-library/jest-dom'
import '@testing-library/user-event'



describe('Testing our auth context and components', () => {

  test('Should contain appropriate information regarding the user and isLoggedIn', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {auth => (
            <>
              <p data-testid='isLoggedIn'>{auth.isLoggedIn.toString()}</p>
              <p data-testid='username'>{auth.user.name}</p>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
    expect(screen.getByTestId('username')).toHaveTextContent('');
  })

  test('Should be able to successfully log in with the Login component', () => {
    render (
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    let userInput = screen.getByTestId('username');
    let passInput = screen.getByTestId('password');

    fireEvent.change(userInput, { target: { value: 'Andres'}});
    fireEvent.change(passInput, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(screen.getByText(/logout/i)).toBeInTheDocument();

    // In order for the next to pass we have to simulate the logout function, otherwise it won't exist in the render
    fireEvent.click(screen.getByText(/logout/i))
  })

  test('Should be able to render the Auth component when logged in', async () => {
    render (
      <AuthProvider>
        <Login />
        <Auth capability='read'>
          <p>I am King, Hear Me Roar!</p>
        </Auth>
      </AuthProvider>
    );

    expect(screen.queryByText(/i am king, hear me roar!/i)).not.toBeInTheDocument();

    let userInput = screen.getByTestId('username');
    let passInput = screen.getByTestId('password');
  
    fireEvent.change(userInput, { target: { value: 'Andres' } });
    fireEvent.change(passInput, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    let kingKong = await screen.findByText(/i am king, hear me roar!/i);

    expect(kingKong).toBeInTheDocument();
  })
});
