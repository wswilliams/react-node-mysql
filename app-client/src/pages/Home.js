import React, { Component } from 'react';
import qs from 'querystring';

import api from '../services/api';

import ProdutoTable from '../components/table/ProdutoTable';
import AddProdutoForm from '../components/forms/AddProdutoForm';
import EditProdutoForm from '../components/forms/EditProdutoForm';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            currentProduto: { id: null, nome: '', descricao: '', preco: '', data_criacao: '', data_atualizacao: '' },
            editing: false
        }
    }

    componentDidMount() {
        this.refreshProdutoTable();
    }

    refreshProdutoTable() {
        this.produtoData = api.get('api/produtos')
            .then(response => response.data)
            .then(data => {
                console.log(" home.data", data)

                this.setState({ 
                    produtos: data,
                    setProdutos: data
                });
            });
    }

    addProduto = produto => {

        api.post('api/produtos',produto)
            .then(res => {
                this.refreshProdutoTable();
            });
    };

    deleteProduto = id => {

        api.delete(`api/produtos/${id}`)
            .then(res => {
                this.refreshProdutoTable();
            });
    };

    updateProduto = (id, produto) => {
        
        api.put(`api/produtos/${id}`,produto)
            .then(res => {

                this.refreshProdutoTable();
            });
        
        this.setState({ 
            currentProduto: { id: null, nome: '', descricao: '', preco: '', data_criacao: '', data_atualizacao: '' }
        });

        this.setEditing(false);
    };

    editRow = produto => {

        this.setState({ 
            currentProduto: { id: produto.id, nome: produto.nome, descricao: produto.descricao, preco: produto.preco, data_criacao: produto.data_criacao, data_atualizacao: produto.data_atualizacao}
        });

        this.setEditing(true);
    };

    setEditing = isEditing => {

        this.setState({ editing: isEditing });
    };

    render () {
        const { produtos } = this.state;

        return (
            <div className="container">
                    
                <div className="row">
    
                    {
                        this.state.editing ? (
                            <div className="col s12 l6">
                                <h4>Edit Produto</h4>
                                <EditProdutoForm 
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}
                                    currentProduto={this.state.currentProduto}
                                    updateProduto={this.updateProduto} 
                                />
                            </div>
                        ) : (
                            <div className="col s4 5">
                                <h4>Add Produto</h4>
                                <AddProdutoForm addProduto={this.addProduto} />
                            </div>
                        )
                    }
                    
                    <div className="col s12 l6">
                        <h5>Produtos</h5>
                        <ProdutoTable produtos={produtos} editRow={this.editRow} deleteProduto={this.deleteProduto} />
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;