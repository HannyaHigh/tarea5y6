import React from 'react'
import { Link } from 'react-router-dom'
import '../componentes/css/crud.css'

class Cruddetalle extends React.Component {
  state = {
    usuarios: []
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/cargaempleados')
      .then(response => response.json())
      .then(usuariosJson => this.setState({ usuarios: usuariosJson }))
  }
  render() {
    const { usuarios } = this.state
    return (
      <div className="fondo">
        <h1 className="titulo">Reporte de usuario</h1><br />
        <Link to={{ pathname: '/Crudaltaprueba'}}>
          <center>
          <button type='button' className="btn btn-success">Alta empleado</button>
          </center>
        </Link>
        <br />
        <table id="customers">
          <thead className="table table-hover">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imagen</th>
              <th scope="col">Clave</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Edad</th>
              <th scope="col">Sexo</th>
              <th scope="col">Área de trabajo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usu, z) =>
              <tr key={z}>
                <td scope="row">{z + 1}</td>
                <td><img src={usu.foto} className="rounded" heigth="100" width="100" alt="Foto usuario" /></td>
                <td>{usu.ide}</td>
                {/* <td>{usu.code}</td> */}
                <td>{usu.nombre}</td>
                <td>{usu.apellidos}</td>
                <td>{usu.edad}</td>
                <td>{usu.sexo === 'F' ? 'Femenino' : 'Masculino'}</td>
                <td>{usu.areatrabajo}</td>
                <td>
                  <Link to={{ pathname: '/crudbuscar', state: { ide: usu.ide } }}>
                    <button type='button' className="btn btn-info">Detalle</button>
                  </Link>
                  <Link to={{ pathname: '/crudeliminar', state: { id_usu: usu.ide } }}>
                    <button type='button' className="btn btn-danger">Eliminar</button>
                  </Link>
                  <Link to={{ pathname: '/crudactualiza', state: { ide: usu.ide } }}>
                    <button type='button' className="btn btn-dark">Actualizar</button>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Cruddetalle
