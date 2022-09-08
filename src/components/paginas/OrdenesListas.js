
import React, {useEffect,useState,useContext} from 'react'
import {FirebaseContext, firebaseContext} from '../../firebase';
import Orden from '../ui/Orden';

const OrdenesListas = () =>{

    //consulta en RT
    const {firebase} = useContext(FirebaseContext);

    const [ordenesfin, guardarOrdenesfin] = useState([]);

    useEffect(() =>{
      
        const obtenerOrdenesTerminadas = () =>{
            firebase.db.collection('ordenes').where('completado', "==" ,true).onSnapshot(manejarSnapshotTerminado);
        }
        obtenerOrdenesTerminadas();

    },[]);
   

    function manejarSnapshotTerminado(snapshot){
        const ordenesfin = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                ...doc.data()
                }
        });
        guardarOrdenesfin(ordenesfin);
    }


    return(
        <>

        <h1 className="text-3xl font-light mb-4">Ordenes terminadas</h1>
        <div className="sm:flex sm:flex-wrap -mx-3">
        {ordenesfin.map(orden =>(
         <Orden key={orden.id} orden={orden} />   
        ))}
        </div>
        </>

        
    );
}

export default OrdenesListas;