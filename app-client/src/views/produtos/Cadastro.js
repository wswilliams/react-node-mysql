import React from "react";

import api from '../../services/api';
import {withRouter} from 'react-router-dom'
 


class CadastroProdutos extends React.Component{

       
        constructor(props) {
            super(props);
    
            this.state = {
                nome:'',
                descricao:'',
                preco:0,
                sucesso: false,
                errors:[],
                atualizando: false
            }
        }

        onChange = (event)=>{
          const valor =   event.target.value
          const nomeDoCampo = event.target.name
          this.setState ({[nomeDoCampo]: valor})
        }

        onSubmit = (event)=>{

            const produto = {
                nome: this.state.nome,
                descricao: this.state.descricao,
                preco: this.state.preco
            }
                try{
                    const id =  this.props.match.params.id

                    if (id){
                       
                        api.put(`api/produtos/${id}`,produto)
                        .then(res => {
                            this.limpaCampos()
                            this.setState({sucesso: true, atualizando: true})
                            this.props.history.push(`/consulta-produtos`)
                        });
                    }else{
                        api.post('api/produtos',produto)
                        .then(res => {
                            this.limpaCampos()
                            this.setState({sucesso: true, atualizando: false})
                        });
                    }
                   
                } catch(erro){
                   const errors =  erro.errors
                   this.setState({errors: errors})
                }

           
        }
            
        

        limpaCampos = ()=> {
            this.setState ({
            nome:'',
            descricao:'',
            preco:0
            });
        }

        componentDidMount(){
          const id =  this.props.match.params.id

          if (id){
            api.get(`api/produtos/${id}`)
            .then(response => response.data)
            .then(data => {

                this.setState({...data , atualizando: true})
            });
          }
        }

    render(){
        return(
            

            <div className="Card">
                <div className="card-header">
                   {this.state.atualizando  ? 'Atualização ' : 'Cadastro '}
                   de Produto
                </div>
                <div className="card-body">


                    {
                        this.state.sucesso && this.state.atualizando &&
                            <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Bem feito!</strong> Atualização Realizado com sucesso .
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
                                    <div className="alert alert-dismissible alert-danger">
                                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                    <strong>Erro!</strong> {msg}.
                                    </div>
                                )
                            })
    
                        
                    }


                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Nome: *</label>
                                <input type="text" 
                                name="nome" 
                                onChange = {this.onChange}
                                value={this.state.nome} 
                                className="form-control" />
                            </div>

                        </div>

                        <div className="col-md-6">
                        <div className="form-group">
                        <label>Descrição: </label>
                                <textarea className="form-control" 
                                name="descricao"
                                onChange = {this.onChange}
                                value={this.state.descricao} >

                                </textarea>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Preço: *</label>
                                <input type="text" 
                                value={this.state.preco} 
                                name="preco" 
                                onChange = {this.onChange}
                                className="form-control" />
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
     

                </div>
            </div>

        
        );
    }
}



export default  withRouter (CadastroProdutos);