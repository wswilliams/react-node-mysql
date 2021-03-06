import React from "react";

import api from '../../services/api';

import { withRouter } from "react-router";

class ConsultaCompras extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            compras: []
        }
    }

    componentDidMount() {
        this.refreshCompraTable();
    }

    refreshCompraTable() {

        this.compraData = api.get('api/compras')
            .then(response => response.data)
            .then(data => {
                this.setState({ 
                    compras: data,
                    setCompras: data
                });
            });
    }
    onChange = (event)=>{
      const term =  event.target.value
      
      if(term.length > 2){
        
        this.comprasData = api.get(`api/compras/${term}`)
        .then(response => response.data)
        .then(data => {
    
            this.setState({ 
                compras: data.compra,
                setCompras: data.compra
            });
        });
      }else{
        this.refreshCompraTable();
      }
            
   }
    preparaEditar = (compra) => {

        this.props.history.push(`/cadastro-compras/${compra.id}`)
    }

    deletar = (id) => {
       api.delete(`api/compras/${id}`)
            .then(res => {
                this.refreshCompraTable();
            });
    }

    details = (id) => {
        this.props.history.push(`/compras-detalhes/${id}`)
    }
    render(){

        return (

        <div className="Card">
           
            <div className="card-header">
 
                < label htmlFor = " search " > 
                    Consulta por Tipo pagamento:
                    < input id = "search" type = " text " onChange = {this.onChange} />    
                </ label >

            </div>

            <div className="card-body">

                <table className="table tale-houver">
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>Tipo de pagamento</th>
                            <th>Status</th>
                            <th>Data Cria????o</th>
                            <th></th>
                            
                        </tr>
                    </thead>

                    <tbody>
                    {  this.state.compras.map((compra , index )=> {

                        return (
                        <tr key={index}>
                            <th>{compra.total}</th>
                            <th> {compra.tipo_pagamento} </th>
                            <th> {compra.status} </th>
                            <th> {compra.data_criacao} </th>
                            <th>
                        <button onClick={ ()=> this.preparaEditar(compra)} className="btn  btn-primary mx-2 px-4"> Editar</button>
                        
                        <button onClick={() => this.deletar(compra.id)}
                         className="btn btn-danger"> Remover</button>


                        <button id="details" onClick={() => this.details(compra.id)}
                         className="btn btn-info mx-2 px-4"> Detalhes</button>
                            </th>
                            
                        </tr>
                        )

                        })

                    }
                    </tbody>
                </table>

            </div>  

        </div>
        )
    }
    
}

export default withRouter(ConsultaCompras);
