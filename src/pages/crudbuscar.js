import React from 'react'
import {Link} from 'react-router-dom'


class Detalle extends React.Component {
  state = {
    usuarios:[]
  }
  componentDidMount(){
    fetch('http://127.0.0.1:8000/api/buscaempleadoporide/'+this.props.location.state.ide)
    .then(response => response.json())
    .then(usuariosJson => this.setState({usuarios:usuariosJson}))
  }
  render() {
    const{usuarios}=this.state
    return(
      <div>
        <h1 className="titulo">Detalle de usuarios</h1><br/>
        <div className="body">
            <div className="target"><br/>
                <img src = {usuarios.foto} className="rounded" heigth="169" width="169" alt="Foto usuario"/><br/>
                Código de empleado: {usuarios.ide}<br/>
                Nombre: {usuarios.nombre} {usuarios.apellidos}<br/>
                Cargo: {usuarios.edad}<br/>
                Horas pagadas: {usuarios.sexo=== 'F' ? 'Femenino' : 'Masculino'}<br/>
                Seccion trabajo: {usuarios.seccion_trabajo}<br/>
                Tipo de pago: {usuarios.areatrabajo}<br/>
                <Link to="/cruddetalle">
                <button type='button' className="btn btn-primary">Regresar</button>
                </Link>
            </div>
        </div>
      </div>
    )
  }
}
export default Detalle
