import React from 'react'
import {Link} from 'react-router-dom'

const ideRegex = RegExp(/^[0-9]{5}$/);
const nombreRegex = RegExp(/^[A-Za-z, ,á,é,í,ó]+$/);
const apellidosRegex = RegExp(/^[A-Z][a-z, ,á,é,í,ó]+$/);
const salarioRegex = RegExp(/^[0-9]+[.][0-9]{2}$/);
const fotoRegex = RegExp(/^[f][o][t][o][s][/][a-z]+[.][a-z]+$/);
const edadRegex = RegExp(/^[0-9]+$/);
// const nombresRegex = RegExp(/^[F][A][R]-[G][I]-[2][0][2][1]$/);
// const lugareRegex = RegExp(/^[A-Za-z, ,á,é,í,ó]+$/);
// const fotoRegex = RegExp(/^[f][o][t][o][s][/][a-z]+[0-9][.][a-z]+$/);
// const cadenasnombrecompRegex = RegExp(/^[A-Za-z ]+$/);

const formValid = ({errores,...rest}) => {
    let valid = true;
    Object.values(errores).forEach(val=>{val.length>0 && (valid=false);
  })
  Object.values(rest).forEach(val=>{val===null && (valid=false);
  })
  return valid;
}

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
        statusform: null,

        errores:{
            ide:"",
            ida:"",
            apellidos:"",
            sexo:"",
            salario:"",
            foto:"",
            nombre:"",
            edad:"",

        }
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

        if(formValid(this.state)){
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
        }else{
            this.setState({ statusform: "Corregir la información del formulario!"})
        }
        

        
    }

    handleChange =e =>{
        const {name, value} = e.target
        let errores = {...this.state.errores};
        switch(name){
            case "ide":
                errores.ide = ideRegex.test(value)
                                ? ""
                                : "Solo se permiten números";
                break;
            case "nombre":
                errores.nombre = nombreRegex.test(value)
                                ? ""
                                : "Solo se aceptan caracteres";
                break;
            case "apellidos":
                errores.apellidos = apellidosRegex.test(value)
                                ? ""
                                : "Solo se aceptan caracteres";
                break;
            case "sexo":
                errores.sexo = value ===""
                                ? "Se requiere seleccionar una opción"
                                : "";
                break;
            case "salario":
                errores.salario = salarioRegex.test(value)
                                ? ""
                                : "Solo se aceptan números";
                break;
            case "foto":
                errores.foto = fotoRegex.test(value)
                                ? ""
                                : "Solo se aceptan archivos .JPG o PNG";
                break;
            case "edad":
                errores.edad = edadRegex.test(value)
                                ? ""
                                : "Solo se aceptan números";
                break;
            default:
                break;
            
        }
        this.setState({errores, [name]:value})
    }

    render(){
        const {errores}=this.state
        const{areas}=this.state
        return(
            <div>
                <h1>Alta de un nuevo empleado.</h1>
                <br />
                <form onSubmit={this.subForm} >
                    Clave: <input type='text' name='ide' onChange={this.campoChange} onKeyUp={this.handleChange} id={errores.ide.length>0 ?"error":null} placeholder="5 digitos" />
                    {errores.ide.length >0 &&(
                            <span className="errorMessage">{errores.ide}</span>
                    )}
                    <br />
                    Nombre: <input type='text' name='nombre' onChange={this.campoChange} onKeyUp={this.handleChange} id={errores.nombre.length>0 ? "error":null}/>
                    {errores.nombre.length >0 &&(
                            <span className="errorMessage">{errores.nombre}</span>
                    )}
                    <br />
                    Apellidos: <input type='text' name='apellidos' onChange={this.campoChange} onKeyUp={this.handleChange} id={errores.apellidos.length>0 ? "error":null}/>
                    {errores.apellidos.length >0 &&(
                            <span className="errorMessage">{errores.apellidos}</span>
                    )}
                    <br />
                    Sexo: <input type='radio' name='sexo' value='F'onClick={this.campoChange} onClick={this.handleChange} />Femenino
                    <input type='radio' name='sexo' value='M' onClick={this.campoChange} onClick={this.handleChange}/>Masculino
                    {errores.sexo.length>0 &&(
                        <span className="errorMessage">{errores.sexo} </span>
                    )}
                    <br />
                    Edad: <input type='text' name='edad' onChange={this.campoChange} onKeyUp={this.handleChange} id={errores.edad.length>0 ?"error":null} />
                    {errores.edad.length >0 &&(
                            <span className="errorMessage">{errores.edad}</span>
                    )}
                    <br />
                    Salario: <input type='text' name='salario' onChange={this.campoChange} onKeyUp={this.handleChange} id={errores.salario.length>0 ?"error":null}/>
                    {errores.salario.length >0 &&(
                            <span className="errorMessage">{errores.salario}</span>
                    )}
                    <br />
                    Foto: <input type='text' name='foto' onChange={this.campoChange} onKeyUp={this.handleChange} id={errores.foto.length>0 ?"error":null}/>
                    {errores.foto.length >0 &&(
                            <span className="errorMessage">{errores.foto}</span>
                    )}
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
                    <p>{this.state.statusform}</p>
                </div>
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