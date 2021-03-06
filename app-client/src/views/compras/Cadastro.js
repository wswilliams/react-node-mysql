import React from "react";

import ProdutoService from "../../services/compraService";
import api from '../../services/api';
import {withRouter} from 'react-router-dom'
 


class CadastroCompras extends React.Component{

       
        constructor(props) {
            super(props);
    
            this.state = {
                total:0,
                tipo_pagamento:'credito',
                status:'Finalizado',
                produtos:[],
                produtos_formulario: [],
                sucesso: false,
                adicionado: true,
                errors:[],
                atualizando: false,
                isItem: false
            }
            this.service = new ProdutoService();
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        onChange = (event)=>{
          const valor =   event.target.value
          const nomeDoCampo = event.target.name
          this.setState ({[nomeDoCampo]: valor})
        }

        handleChange(event) {
            this.setState({tipo_pagamento: event.target.value});
          }
        handleChangeStatus(event) {
            this.setState({status: event.target.value});
          }
        
          handleSubmit(event) {
            event.preventDefault();
         }

        onSubmit = (event)=>{

            const compras = {
                total: this.state.total,
                tipo_pagamento: this.state.tipo_pagamento,
                status: this.state.status,
                produtos: this.state.produtos_formulario
            }
                try{
                    const id =  this.props.match.params.id

                    if (id){
                        const count = this.service.obterCompras();
                   
                        if(count.length > 0){
                    
                            api.put(`api/compras/${id}`,compras)
                            .then(res => {
                                this.limpaCampos()
                                this.setState({sucesso: true, atualizando: true})
                                this.props.history.push(`/consulta-compras`)
                            }).catch(erro => {
                                const data = [erro.response.data]
                                this.setState({errors: data})
                            })
                        }else{
                            const errors =  ['obrigat??rio ao menos um produto']
                            this.setState({errors: errors})
                        }
                    }else{
                        api.post('api/compras',compras)
                        .then(res => {
                            this.limpaCampos()
                            this.setState({sucesso: true, atualizando: false})
                        }).catch(erro => {
                            const data = [erro.response.data]
                            this.setState({errors: data})
                        })
                        
                    }
                   
                } catch(erro){
                   const errors =  erro.errors
                   this.setState({errors: errors})
                }
           
        }
            
        

        limpaCampos = ()=> {
            this.setState ({
            total:0,
            tipo_pagamento:'credito',
            status: 'Finalizado',
            produtos_formulario: []
            });
            this.service.deletarAll();
        }

        componentDidMount(){

            this.refreshProdutoTable();
            
         const id =  this.props.match.params.id

          if (id){
    
            api.get(`api/compras/${id}`)
            .then(response => response.data)
            .then(data => {
                this.setState({...data.compra , atualizando: true})
                this.service.salvarAll(data.produtos)
                this.refreshCompraTableCar();
            });
          }else{
         
            this.service.deletarAll();
            this.refreshCompraTableCar();
          }
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

        refreshCompraTableCar() {

            const compras = this.service.obterCompras()
            this.setState({produtos_formulario: compras})
        }

        addItem(produto){

           const item = this.service.obterIndex(produto.id);

           this.setState({isItem: false})

           if(item !== null)
                this.setState({isItem: true})
           else{
                this.setState({isItem: false})

                this.service.salvar(produto)

                this.state.total += produto.preco;
                this.state.adicionado = true;
                this.refreshCompraTableCar();
            }
        }
        removeItem(item){

           this.service.deletar(item.id)
           this.state.total -= item.preco;
           this.refreshCompraTableCar();
        }
    render(){
        return(
            

            <div className="Card">
                <div className="card-header">
                   {this.state.atualizando  ? 'Atualiza????o ' : 'Cadastro '}
                   de Compras
                </div>
                <div className="card-body">


                    {
                        this.state.sucesso && this.state.atualizando &&
                            <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Bem feito!</strong> Atualiza????o Realizado com sucesso .
                         </div>
                        
                    }
                    {
                         this.state.sucesso && !this.state.atualizando &&
                         <div className="alert alert-dismissible alert-success">
                         <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                         <strong>Bem feito!</strong> Cadastro Realizado com sucesso .
                         </div>
                    }

                        {
                         this.state.errors.length > 0 &&

                            this.state.errors.map(msg => {
                                return (
                                    <div className="alert alert-dismissible alert-danger"  key={'uniqueValue'}>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                    <strong>Erro!</strong> {msg}.
                                    </div>
                                )
                            })
                    }
                    {
                        this.state.isItem > 0 &&
                        <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Erro!</strong> Item j?? existente no carinho
                        </div>
                    }

                <table className="table tale-houver">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descri????o</th>
                            <th>Pre??o</th>
                            <th>Data Cria????o</th>
                            <th>Comprar</th>
                            
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
                            <th className="form-group">   
                        <button onClick={() => this.addItem(produto)}
                         className="btn btn-primary"> Adicionar</button>
                            </th>
                            
                        </tr>
                        )

                        })

                    }
                    </tbody>
                </table>


                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Total: </label>
                                <input type="text" disabled
                                name="total" 
                                onChange = {this.onChange}
                                value={this.state.total} 
                                className="form-control" />
                            </div>

                        </div>

                        <div className="col-md-6">
                        <div className="form-group">
                        <label>Tipo Pagamento: </label>
                            
                                <select className="form-control" value={this.state.tipo_pagamento} onChange={this.handleChange}>
                                    <option value="credito">Cart??o de credito</option>
                                    <option value="debito">Cart??o de debito</option>
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="pix">Pix</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Status: </label>
                                <select className="form-control" value={this.state.status} onChange={this.handleChangeStatus}>
                                    <option value="FInalizado">FInalizado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>

                        </div>

                    </div>   

                    <div className="row mt-3">

                        <div className="col-md-1 mx-3">
                            <button onClick={this.onSubmit} className="btn btn-success"> 
                            {this.state.atualizando ? 'Atualizar ' : 'Salvar '}
                            </button>
                        </div>

                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} className="btn btn-primary"> Limpar</button>
                        </div>
                        
                    </div> 

                    { this.state.adicionado &&
                   
                    <div className="Card" >
                        <div className="card-body">
                            <table className="table tale-houver">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descri????o</th>
                                        <th>Pre??o</th>
                                        <th>Data Cria????o</th>
                                        <th>Comprar</th>
                                        
                                    </tr>
                                </thead>

                                <tbody>
                                {  this.state.produtos_formulario.map((item , index )=> {

                                    return (
                                    <tr key={index}>
                                        <th>{item.nome}</th>
                                        <th> {item.descricao} </th>
                                        <th> {item.preco} </th>
                                        <th> {item.data_criacao} </th>
                                        <th>  
                                            <button onClick={() => this.removeItem(item)}
                                            className="btn btn-primary"> Remover</button>
                                                </th>                                        
                                    </tr>
                                    )

                                    })

                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }

                </div>
            </div>

        
        );
    }
}



export default  withRouter (CadastroCompras);