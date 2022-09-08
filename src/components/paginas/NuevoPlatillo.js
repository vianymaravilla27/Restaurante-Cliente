import React, {useContext, useState} from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup';
import {FirebaseContext} from '../../firebase';
import {useNavigate} from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader';


const NuevoPlatillo = () =>{
//state para las imagenes

const [subiendo, guardarSubiendo] = useState(false);
const[progreso, guardarProgreso] = useState(0);
const [ urlimagen,guardarUrlimagen] = useState('');

//COntext con las operaciones de firebase

const { firebase }  = useContext(FirebaseContext);

//console.log(firebase);

//hook para redireccionar

const navigate = useNavigate();


    //validacion y leer los datos del fomrulario
    const formik = useFormik({
        initialValues:{
            nombre: '',
            precio: '',
            categoria: '',
            imagen:'',
            descripcion: ''
        },
        validationSchema: Yup.object({
                nombre: Yup.string()
                .min(3, 'Los Platillos deben tener al menos 3 caracteres')
                .required('El nombre es obligatorio'),
                precio: Yup.number()
                .min(1, 'Debes agregar un precio')
                .required('El Precio es obligatorio'),
                categoria: Yup.string()
                .required('La categoria es obligatorio'),
                descripcion: Yup.string()
                .required('La descripcion es obligatorio')
        }),
        onSubmit: platillo =>{
           try {
               platillo.existencia = true
               platillo.imagen = urlimagen;
               firebase.db.collection('productos').add(platillo);
               //Redireccionar
               navigate('/menu');
           } catch (error) {
               console.log(error)
           }
        }
    })

    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);

    }
    const handleUploadError = error => {
        guardarSubiendo(false)
        console.log(error);
    }
    const handleUploadSuccess = async nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);

        //Almacenar url destino
        const url = await firebase.storage.ref("productos").child(nombre).getDownloadURL();
        console.log(url);
        guardarUrlimagen(url);

    }
    const handleProgress = progreso => {
        guardarProgreso(progreso)
        console.log(progreso)
    }


    return(
        <>
        <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>

        <div className="flex justify-center mt-10">
            
            <div className="w-full max-w-3xl">
              <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                      <input type="text" value={formik.values.nombre} 
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                      placeholder="Nombre Platillo" 
                      id="nombre" 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  </div>
                  {formik.touched.nombre && formik.errors.nombre ? (
                      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                          <p className="font-bold">Hubo un error!</p>
                          <p>{formik.errors.nombre}</p>
                      </div>
                  ) : null }
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                      <input type="number" 
                        value={formik.values.precio} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        min="0" 
                        placeholder="$20" 
                        id="precio" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  </div>
                  {formik.touched.precio && formik.errors.precio ? (
                      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                          <p className="font-bold">Hubo un error!</p>
                          <p>{formik.errors.precio}</p>
                      </div>
                  ) : null }
                  <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria</label>
                        <select value={formik.values.categoria}  onBlur={formik.handleBlur} onChange={formik.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="categoria" id="categoria">
                        <option value="">--Seleccione--</option>
                        <option value="HAMBURGUESAS">HAMBURGUESAS 🍔</option>
                        <option value="COMBOS">COMBOS</option>
                        <option value="HOTDOG">HOTDOG</option>
                        <option value="ALITAS">ALITAS</option>
                        <option value="CHAPATAS">CHAPATAS</option>
                        <option value="COSTILLAS">COSTILLAS</option>
                        <option value="TENDERS">TENDERS</option>
                        <option value="PAPAS">PAPAS</option>
                        <option value="QUESO">QUESO FUNDIDO</option>
                        <option value="BONELESS">BONELESS</option>
                        <option value="BANDERILLAS">BANDERILLAS</option>
                        <option value="BURRITOS">BURRITOS</option>
                        <option value="CLUBSANDWICH">CLUB SANDWICH</option>
                        <option value="QUESOCARNE">QUESO CARNE</option>
                        <option value="NUGETTS">NUGETTS</option>
                        <option value="PALOMITASDEPOLLO">PALOMITAS DE POLLO</option>
                        <option value="SALCHIPULPO">SALCHIPULPO</option>
                        <option value="NACHOS">NACHOS</option>
                        <option value="PAPASRELLENAS">PAPAS RELLENAS</option>
                        <option value="PEPITOS">PEPITOS</option>
                        <option value="GUACAMOLE">GUACAMOLE</option>
                        <option value="MOLCAJETE">MOLCAJETE</option>
                        <option value="MILANESA">MILANESA</option>
                        <option value="CREPAS">CREPAS</option>
                        <option value="WAFLES">WAFLES</option>
                        <option value="FRAPPES">FRAPPES</option>
                        <option value="CHEESECAKE">CHEESECAKE</option>
                        <option value="SMOOTHIES">SMOOTHIES</option>
                        <option value="WRAP">WRAP</option>
                        <option value="CHEESECAKE">CHEESECAKE</option>
                        <option value="SODAITALIANA">SODA ITALIANA</option>
                        <option value="MALTEADASLICUALOCAS">MALTEADAS LICUA-LOCAS</option>
                        <option value="BEBIDASLICUALOCAS">BEBIDAS LICUA-LOCAS</option>
                        <option value="BEBIDAS">BEBIDAS</option>
                     </select>
                  </div>
                  {formik.touched.categoria && formik.errors.categoria ? (
                      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                          <p className="font-bold">Hubo un error!</p>
                          <p>{formik.errors.categoria}</p>
                      </div>
                  ) : null }
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                        <FileUploader 
                        accept="image/*" 
                        id="imagen" 
                        name="imagen" 
                        randomizeFilename  
                        storageRef={firebase.storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                        />
                  </div>
                  {
                      subiendo && (
                          <div className="h-12 relative w-full border">
                              <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progreso}%` }}>
                                  {progreso}%
                              </div>
                          </div>
                      )
                  }
                  {urlimagen && (
                      <p className="bg-green-500 text-white p-3 text-center my-5">
                         La imagen se subió correctamente 
                      </p>
                  )}
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                      <textarea  
                        value={formik.values.descripcion} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        placeholder="Descripcion Platillo" 
                        id="descripcion" 
                        className="h-40  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                  </div>
                  {formik.touched.descripcion && formik.errors.descripcion ? (
                      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                          <p className="font-bold">Hubo un error!</p>
                          <p>{formik.errors.descripcion}</p>
                      </div>
                  ) : null }
                  <div className="mb-4">
            
                      <input type="submit" value="Agregar Platillo!"  className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"/>
                  </div>
                  
              </form>
            </div>
        </div>
        </>
    );
}

export default NuevoPlatillo;