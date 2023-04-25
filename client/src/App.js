import './App.css';
import { Route, Routes } from 'react-router-dom'; // Cambie la version de react-router-dom de 5.3.4 a 6.3.0 para poder usar el Routes
import { Landing } from './components/Landing/Landing';
import { Home } from './components/Home/Home';
import { DetailCountry } from './components/DetailCountry/DetailCountry';
import Form from './components/Form/Form';
import { useEffect } from 'react';
import fetchData from './redux/fetchData';
import { useDispatch } from 'react-redux';

function App() {
  const  dispatch = useDispatch()

  useEffect(()=> {
    fetchData(dispatch)
  }, [])

  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/countries' element={<Home/>}/>
      <Route path='countries/:idPais' element={<DetailCountry/>}/>
      <Route path='/createactivity' element={<Form></Form>}/>
      </Routes>
    </div>
  );
}

export default App;
