import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Cruddetalle from '../pages/cruddetalle'
import Crudbuscar from '../pages/crudbuscar'
import Crudeliminar from '../pages/crudeliminar'
import Crudalta from '../pages/crudalta'
import Crudactualiza from '../pages/Crudactualiza'
import Crudaaltaprueba from '../pages/crudaltaprueba'
function Rutas() {
  return(
    <BrowserRouter>
      <Switch>
          <Route exact path="/cruddetalle" component={Cruddetalle}/>
          <Route exact path="/crudbuscar" component={Crudbuscar}/>
          <Route exact path="/crudeliminar" component={Crudeliminar}/>
          <Route exact path="/crudalta" component={Crudalta}/>
          <Route exact path="/crudactualiza" component={Crudactualiza}/>
          <Route exact path="/crudaltaprueba" component={Crudaaltaprueba}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Rutas
