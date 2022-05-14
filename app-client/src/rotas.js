import React from "react";
import { Switch,Route } from "react-router-dom";

import Home from "./views/Home";
import CadastroProdutos from "./views/produtos/Cadastro";

import ConsultaProdutos from "./views/produtos/Consulta";

import DetalhesProdutos from "./views/produtos/Detalhes";

import CadastroCompras from "./views/compras/Cadastro";

import ConsultaCompras from "./views/compras/Consulta";

import DetalhesCompras from "./views/compras/Detalhes"


export default () => {
    return(
        <>
            
                <Switch>
                    <Route exact path="/cadastro-produtos/:id?" component={CadastroProdutos}/>
                    <Route exact path="/consulta-produtos" component={ConsultaProdutos}/>
                    <Route exact path="/produtos-detalhes/:id?" component={DetalhesProdutos}/>
                    <Route exact path="/cadastro-compras/:id?" component={CadastroCompras}/>
                    <Route exact path="/consulta-compras" component={ConsultaCompras}/>
                    <Route exact path="/compras-detalhes/:id?" component={DetalhesCompras}/>
                    <Route exact path="/" component={Home}/>
                    

                </Switch>
        
        </>
    );
}