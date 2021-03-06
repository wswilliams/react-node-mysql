import React from "react";

import api from '../../services/api';

import { withRouter } from "react-router";

class ConsultaProdutos extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            produtos: []
        }

    }

    componentDidMount() {
        this.refreshProdutoTable();
    }

    refreshProdutoTable() {
        this.produtoData = api.get('api/produtos')
            .then(response => response.data)
            .then(data => {
                this.setState({ 
                    produtos: data,
                    setProdutos: data
                });
            });
    }
    onChange = (event)=>{
      const term =   event.target.value
      const nomeDoCampo = event.target.name
      
      if(term.length > 3){
        this.produtoData = api.get(`api/produtos/${term}`)
        .then(response => response.data)
        .then(data => {
            this.setState({ 
                produtos: data,
                setProdutos: data
            });
        });
      }else{
        this.refreshProdutoTable();
      }
            
   }
    preparaEditar = (produto) => {

        this.props.history.push(`/cadastro-produtos/${produto.id}`)
    }

    deletar = (id) => {
       api.delete(`api/produtos/${id}`)
            .then(res => {
                this.refreshProdutoTable();
            });
    }

    details = (id) => {
        this.props.history.push(`/produtos-detalhes/${id}`)
    }

    render(){
        return (

        <div className="Card">
           
            <div className="card-header">
 
                < label htmlFor = " search " > 
                    Consulta por nome :
                    < input id = "search" type = " text " onChange = {this.onChange} />    
                </ label >

            </div>

            <div className="card-body">

                <table className="table tale-houver">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descri????o</th>
                            <th>Pre??o</th>
                            <th>Data Cria????o</th>
                            <th></th>
                            
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
                            <th>
                        <button onClick={ ()=> this.preparaEditar(produto)} className="btn  btn-primary mx-2 px-4"> Editar</button>
                        
                        <button onClick={() => this.deletar(produto.id)}
                         className="btn  btn-danger mx-2 px-4"> Remover</button>

                        <button id="details" onClick={() => this.details(produto.id)}
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

export default withRouter(ConsultaProdutos);
