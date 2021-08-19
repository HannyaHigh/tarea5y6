import React from 'react'
import {Link} from 'react-router-dom'
import '../componentes/css/crud.css'

class Eliminar extends React.Component {
  state = {
    usuarios:[]
  }
  componentDidMount(){
    fetch('http://127.0.0.1:8000/api/buscaempleadoporide/'+this.props.location.state.id_usu)
    .then(response => response.json())
    .then(usuariosJson => this.setState({usuarios:usuariosJson}))

    fetch('http://127.0.0.1:8000/api/eliminaempleado/'+this.props.location.state.id_usu,{method:'delete'})
  }
  render() {
    const{usuarios}=this.state
    return(
      <div>
        <h1 className="titulo">Eliminar usuario</h1><br/>
        <center>
          <div class="alerta alert-success"><br/>
            <strong>Correcto!!</strong> El usuario {usuarios.nombre} {usuarios.apellidos}<br/>
            con clave {usuarios.ide} ha sido <strong>Eliminado correctamente!!</strong>
          </div>
          <Link to="/Cruddetalle">
            <button type='button' className="btn btn-primary">Regresar</button>
          </Link>
        </center>
      </div>
    )
  }
}
export default Eliminar
