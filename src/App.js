
import './App.css';
import { Routes, Route } from 'react-router';

import firebase, {FirebaseContext} from './firebase/index';

import Ordenes from './components/paginas/Ordenes';
import OrdenesListas from './components/paginas/OrdenesListas';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import Sidebar from './components/ui/SIdebar';
import Bebidas from './components/paginas/Bebidas'

function App() {
  return (
    <FirebaseContext.Provider
    value={{firebase}}>
      <div className="md:flex min-h-screen">
     <Sidebar/>
      <div className="md:w-3/5 xl:w-4/5 p-6">
      <Routes> 
          <Route path="/" element={<Ordenes/>}/>
          <Route path="/ordenes-listas" element={<OrdenesListas/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/nuevo-platillo" element={<NuevoPlatillo/>}/>
          <Route path="/bebidas" element={<Bebidas/>}/>
     </Routes>
      </div>
       
     
   </div>
    </FirebaseContext.Provider>
  );
}

export default App;
