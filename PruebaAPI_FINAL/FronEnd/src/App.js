import './App.css';
import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'


function ListaCategoria() {
  const URL = "https://localhost:44311/api/Books";
  const [data,setData]= useState([])
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  
  const [gestorseleccionado, setGestorseleccionado] = useState({
      idBook:'',
      nombre:''
  })
  const handleChange=e=>{
      const {name,value}=e.target;
      setGestorseleccionado({
          ...gestorseleccionado,
          [name]:value
      })
      console.log(gestorseleccionado);
  }

  const controlModalInsertar=()=>{
      setModalInsertar(!modalInsertar)
  }
  const controlModalEditar=()=>{
      setModalEditar(!modalEditar)
  }
  const controlModalEliminar=()=>{
      setModalEliminar(!modalEliminar)
  }

  const peticionGet= async()=>{
      await axios.get(URL)
      .then(response =>{
          setData(response.data);
      }).catch(error=>{
          console.log(error)
      });
  }

  const peticionPost= async()=>{
      delete gestorseleccionado.idBook
      await axios.post(URL, gestorseleccionado)
      .then(response =>{
          setData(data.concat(response.data));
         
          controlModalInsertar();
      }).catch(error=>{
          console.log(error)
      });
  }

  
const peticionPut= async()=>{
  await axios.put(URL+"/"+gestorseleccionado.idBook, gestorseleccionado)
  .then(response =>{
      var respuesta = response.data;
      var dataAux = data
      dataAux.forEach(gestor =>{
          if(gestor.idBook===gestorseleccionado.idBook)
          {
            if(gestor.idBook===gestorseleccionado.idBook)
            {
                gestor.nombre=respuesta.nombre;
            }
          }
      })
      controlModalEditar();
  }).catch(error=>{
      console.log(error)
  });
}

  const peticionDelete= async()=>{
      await axios.delete(URL+"/"+gestorseleccionado.idBook)
      .then(response =>{
         setData(data.filter(gestor=> gestor.idBook!==response.data));
        
          controlModalEliminar();
      }).catch(error=>{
          console.log(error)
      });
  }

  const seleccionarGestor=(gestorr,caso)=>{
      setGestorseleccionado(gestorr);
      (caso==="Editar")?
      controlModalEditar():controlModalEliminar() ;
  }
  useEffect(()=>{
      peticionGet()
  },[])
  return (
    <>
    <div className="create">
        <br/>
        <button onClick={()=>controlModalInsertar()} className=" btn btn-success" style={{marginLeft:"10%"}}>Agregar Categoria</button>
        <br/>
        <br/>
        <center>
        
        <table className="table table-bordered" style={{width:"80%"}}>
          <thead>
              <tr>
                  <th> ID</th>
                  <th> Nombre</th>
                  <th> Acciones</th>
              </tr>
          </thead>
          <tbody>
              {data.map(g=>(
                 <tr key={g.id}>
                    <td>{g.idBook}</td> 
                    <td>{g.nombre}</td>
                    <td>
                        <button className="btn btn-info" onClick={()=>seleccionarGestor(g,'Editar')}>Editar</button> {""}
                        <button className="btn btn-danger"onClick={()=>seleccionarGestor(g,'Eliminar')}>Eliminar</button>

                    </td>
                 </tr> 
              ))}
          </tbody>
        </table>
        </center>
        
        <br/>
        <br/>
        <Modal isOpen={modalInsertar}>
            <ModalHeader> Agregar Book</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Nombre Book</label>
                    <br/>
                    <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>peticionPost()}>Guardar</button> {""}
              <button className="btn btn-danger" onClick={()=>controlModalInsertar()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
            <ModalHeader> Editar Book</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>ID:</label>
                    <input type="text" className="form-control" readOnly value ={gestorseleccionado && gestorseleccionado.idBook}/>
                    <label>Nombre Categoria:</label>
                    <br/>
                    <input type="text" className="form-control" name="nombre" onChange={handleChange} value ={gestorseleccionado && gestorseleccionado.nombre}/>
                </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button> {""}
              <button className="btn btn-danger" onClick={()=>controlModalEditar()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
            
            <ModalBody>
                Estas seguro que desea eliminar el Book {gestorseleccionado && gestorseleccionado.nombre} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary"onClick={()=>peticionDelete()} >Si</button> {""}
              <button className="btn btn-secondary" onClick={()=>controlModalEliminar()} >No</button>
            </ModalFooter>
        </Modal>

    </div>
    </>
  );
}
export default ListaCategoria;