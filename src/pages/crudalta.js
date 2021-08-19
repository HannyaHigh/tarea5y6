import React from 'react'
import {Link} from 'react-router-dom'

class Crudalta extends React.Component{
    state = {
        ide:'',
        ida:'',
        apellidos:'',
        sexo:'',
        salario:'',
        foto:'',
        nombre:'',
        edad:'',
        areas:[],
        resultado:'',
    }

    campoChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    componentDidMount(){
        fetch('http://127.0.0.1:8000/api/cargaareas')
        .then(response => response.json())
        .then(areasJson => this.setState({areas:areasJson}))
    }

    subForm=(e)=>{
        e.preventDefault();
        let data ={
            ide:this.state.ide,
            nombre:this.state.nombre,
            edad:this.state.edad,
            apellidos:this.state.apellidos,
            sexo:this.state.sexo,
            salario:this.state.salario,
            foto:this.state.foto,
            ida:this.state.ida,
        };
        fetch("http://127.0.0.1:8000/api/altaempleado",{
            method:'POST',
            headers:{
                'Accept':
                'application/json',
                'Content-Type':'application/json',
            },
            mode:"cors",
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(response=>this.setState({resultado:"Alta de empleado exitosa!"}))
    }

    render(){
        const{areas}=this.state
        return(
            <div>
                <h1>Alta de un nuevo empleado.</h1>
                <br />
                <form onSubmit={this.subForm} >
                    Clave: <input type='text' name='ide' onChange={this.campoChange} />
                    <br />
                    Nombre: <input type='text' name='nombre' onChange={this.campoChange}/>
                    <br />
                    Apellidos: <input type='text' name='apellidos' onChange={this.campoChange}/>
                    <br />
                    Sexo: <input type='radio' name='sexo' value='F'onClick={this.campoChange} />Femenino
                    <input type='radio' name='sexo' value='M' onClick={this.campoChange} />Masculino
                    <br />
                    Edad: <input type='text' name='edad' onChange={this.campoChange}/>
                    <br />
                    Salario: <input type='text' name='salario' onChange={this.campoChange}/>
                    <br />
                    Foto: <input type='text' name='foto' onChange={this.campoChange}/>
                    <br />
                    Selecciona Area:
                    <select name='ida' onChange={this.campoChange}>
                        {areas.map((areas,i)=>
                            <option value={areas.ida} key={i}> {areas.nombre} </option>
                        )}
                    </select>
                    <br />
                    <input type='submit' value='Guardar' className="btn btn-info" />
                </form>
                <div>
                    {this.state.resultado
                    ? <div className="alert alert-success">{this.state.resultado}</div>
                    : <div> </div> 
                    }
                </div>
                <div>
                <Link to="/cruddetalle">
                <button type='button' className="btn btn-primary">Regresar</button>
                </Link>
                </div>
                
            </div>
        )   
    }
}

export default Crudalta