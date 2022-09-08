import React, {useState,useContext} from 'react'
import {FirebaseContext} from '../../firebase';
import moment from "moment";
import 'moment/locale/es';



const Orden = ({orden}) =>{
    moment.locale('es');
    const [tiempoentrega, guardarTiempoEntrega] = useState(0);
    console.log(orden.orden)

    const {firebase} = useContext(FirebaseContext);

    //define tiempo entrega en tiempo real
    const definirTiempo = id =>{
        try {
            firebase.db.collection('ordenes').doc(id).update({tiempoentrega})
        } catch (error) {
            
        }
    }

    //completa el status de una orden
    const completarOrden = id =>{
        try {
            firebase.db.collection('ordenes').doc(id).update({completado:true})
        } catch (error) {
            console.log(error)
            
        }
    }
    return(
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
        <div className="p-3 shadow-md bg-white">
           
            {orden.orden.map( (platillos , i)=>(
                <div>
                  
                    <p  className="text-yellow-600 font-black text-3xl inline"> {platillos.cantidad} </p><p className="text-gray-800 text-2xl inline">{platillos.nombre}</p>
                    
                
                </div>
                
            ))}
           
                    
                    {orden.detalles != "" && ( 
                        <p className="text-gray-600"> Detalles: {orden.detalles}</p>
                    )}
                     {orden.mesa != "" && ( 
                        <p className="text-gray-600 font-black text-3xl"> Mesa: {orden.mesa}</p>
                    )}
                     {orden.id != "" && ( 
                        <p className="text-gray-600 font-light text-small"> _id: {orden.id}</p>
                    )}
                    {orden.creado != "" && ( 
                        <p className="text-gray-600"> Recibido: { moment(orden.creado).format('lll')}</p>
                    )}
                    
                 
            
            {orden.tiempoentrega === 0 && (
                <div className="mb-4">
                    
                   {1== 2 ?<div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tiempo de Entrega
                    </label>
                    <input type="number" 
                        value={tiempoentrega}  
                        onChange={e => guardarTiempoEntrega(parseInt(e.target.value))}
                        placeholder="20" 
                        min="0" 
                        max="20"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">

                    </input>
                    <button 
                    type="submit" 
                    onClick={()=> definirTiempo(orden.id)}
                    className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold" >
                        Definir tiempo
                    </button>
                   </div>:null}

                    </div>
            )}
            {orden.tiempoentrega > 0 && (
                <p className="text-gray-700">   Tiempo de Entrega: 
                <span className="font-bold">{orden.tiempoentrega} Minutos</span></p>
            )}
            {!orden.completado && orden.tiempoentrega >= 0 &&(
                <button type="button" className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
                onClick={ () => completarOrden(orden.id)}
                >
                    Marcar como lista
                </button>
            )}
        </div>
 
    </div>
    );
}

export default Orden;