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

    preparaEditar = (produto) => {

        this.props.history.push(`/cadastro-produtos/${produto.id}`)
    }

    deletar = (id) => {
       api.delete(`api/produtos/${id}`)
            .then(res => {
                this.refreshProdutoTable();
            });
    }

    render(){
        return (

        <div className="Card">
            <div className="card-header">
                Consulta Produtos
            </div>
            <div className="card-body">

                <table className="table tale-houver">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Data Criação</th>
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
                         className="btn btn-danger"> Remover</button>
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
