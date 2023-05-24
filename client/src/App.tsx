import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateOutlet } from './components/outlets/private.outlet';
import { PublicOutlet } from './components/outlets/public.outlet';
import { Home } from './pages/home';

function App() {
  return (
    <BrowserRouter>
    {/* <CurrentUserProvider> TODO */}
      <Routes>
        <Route path='/' element={<PrivateOutlet />}>
          <Route path='/' element={<Home />}>
          </Route>
        </Route>

        <Route element={<PublicOutlet />}>
          <Route path='/' element={<Home />}>
          </Route>
          {/* <Route
            path='/login'
            element={
                <LoginPage />
            }
          /> */}
        </Route>
      </Routes>
      {/* </CurrentUserProvider> */}
    </BrowserRouter>
  );
}

export default App;
