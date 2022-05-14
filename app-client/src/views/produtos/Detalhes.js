import React from "react";

import api from '../../services/api';
import {withRouter} from 'react-router-dom'
 


class DetalhesProdutos extends React.Component{

       
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
        retornar = () => {
            this.props.history.push(`/consulta-produtos`)
        }

    render(){
        return(
            

            <div className="Card">
                <div className="card-header">
                  Detalhes do Produto
                </div>
                <div className="card-body">


                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Nome: </label>
                                <input type="text"  disabled
                                name="nome" 
                                onChange = {this.onChange}
                                value={this.state.nome} 
                                className="form-control" />
                            </div>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Descrição: </label>
                                <input type="text" disabled className="form-control" 
                                    name="descricao"
                                    onChange = {this.onChange}
                                    value={this.state.descricao} >

                                </input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Preço: </label>
                                <input type="text"  disabled
                                value={this.state.preco} 
                                name="preco" 
                                onChange = {this.onChange}
                                className="form-control" />
                            </div>

                        </div>

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



export default  withRouter (DetalhesProdutos);