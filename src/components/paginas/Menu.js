import React , {useState,useEffect,useContext}from 'react';
import {Link } from 'react-router-dom';
import {FirebaseContext} from '../../firebase'
import Platillo from '../ui/Platilo';

const Menu = () =>{
    //Definir el state para los platillos
    const [platillos,guardarPlatillos] = useState([]);

    const { firebase} = useContext(FirebaseContext);
// consultar la base de datos al cargar
useEffect(() => {
    const obtenerPlatillos =  () =>{
        firebase.db.collection('productos').onSnapshot(manejarSnapshot);
    }
    obtenerPlatillos();
},[]);


//snapshot nos permite una bd en real time

function manejarSnapshot(snapshot){
    const platillos = snapshot.docs.map(doc => {
        return{
            id: doc.id,
            ...doc.data()

        }
    });
    //almacenar en base de datos
    guardarPlatillos(platillos);
}

    return(
        <>
        <h1 className="text-3xl font-light mb-4">Menu comida y bebida</h1>
        <Link to="/nuevo-platillo" className=" bg-blue-800 hover:bg-700, inline-block mb-5 p-2 text-white uppercase font-bold">NUevo Platillo</Link>
        {platillos.map(platillo =>(
            <Platillo key={platillo.id} platillo={platillo} />
        ))}
        </>
    );
}

export default Menu;