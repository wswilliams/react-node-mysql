import React from "react";

import api from '../../services/api';
import {withRouter} from 'react-router-dom'
 


class DetalhesCompras extends React.Component{

       
        constructor(props) {
            super(props);
    
            this.state = {
                total:0,
                tipo_pagamento:'',
                status:'',
                data_criacao: '',
                produtos:[],
                adicionado: true
            }
        }
        
        onChange = (event)=>{
            const valor =   event.target.value
            const nomeDoCampo = event.target.name
            this.setState ({[nomeDoCampo]: valor})
          }
        
        componentDidMount(){
          const id =  this.props.match.params.id

          if (id){
            api.get(`api/compras/${id}`)
            .then(response => response.data)
            .then(data => {

                this.setState({...data.compra , atualizando: true, produtos: data.produtos})
            });
          }
        }
        retornar = () => {
            this.props.history.push(`/consulta-compras`)
        }

    render(){
        return(
            

            <div className="Card">
                <div className="card-header">
                  Detalhes da Compra
                </div>
                <div className="card-body">


                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Toral: </label>
                                <input type="text"  disabled
                                name="total" 
                                onChange = {this.onChange}
                                value={this.state.total} 
                                className="form-control" />
                            </div>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Tipo Pagamento: </label>
                                <input type="text" disabled className="form-control" 
                                    name="tipo_pagamento"
                                    onChange = {this.onChange}
                                    value={this.state.tipo_pagamento} >

                                </input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Data da compra: </label>
                                <input type="text"  disabled
                                value={this.state.data_criacao} 
                                name="data_criacao" 
                                onChange = {this.onChange}
                                className="form-control" />
                            </div>

                        </div>

                    </div>   

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Status: </label>
                                <input type="text"  disabled
                                value={this.state.status} 
                                name="status" 
                                onChange = {this.onChange}
                                className="form-control" />
                            </div>

                        </div>

                    </div>   

                    <div className="row">
                    <label > Produtos: </label>
                    <table className="table tale-houver">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Data Criação</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                    {  this.state.produtos.map((produto , index )=> {

                        return (
                        <tr key={index}>
                            <th>{produto.nome}</th>
                            <th> {produto.descricao} </th>
                            <th> {produto.preco} </th>
                            <th> {produto.data_criacao} </th>
                            
                        </tr>
                        )

                        })

                    }
                    </tbody>
                </table>
                    </div>   

                    <div className="row mt-3">

                        <div className="col-md-1 mx-3">
                            <button onClick={this.retornar} className="btn btn-success"> 
                            Voltar
                            </button>
                        </div>
                        
                    </div> 
     

                </div>
            </div>

        
        );
    }
}



export default  withRouter (DetalhesCompras);