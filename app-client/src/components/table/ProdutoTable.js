import React from 'react';

const ProdutoTable = props => (

  
    <table className="responsive-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>descricao</th>
                <th>preco</th>
                <th>data_criacao</th>
                <th>data_atualizacao</th>
                <th>Actions</th>
            </tr>
        </thead>
    <tbody>
        {
            props.produtos.length > 0 ? (
                props.produtos.map (produto => (

                    <tr key={produto.id}>
                        <td>{produto.nome}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.preco}</td>
                        <td>{produto.data_criacao}</td>
                        <td>{produto.data_atualizacao}</td>
                        <td className="center-align">
                            <button 
                                className="waves-effect waves-light btn-small"
                                onClick={() => props.editRow(produto)}>
                                edit
                            </button>

                            <button 
                                className="waves-effect waves-light btn-small red darken-4"
                                onClick={() => props.deleteProduto(produto.id)}>
                                delete
                            </button>
                        </td> 
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>{props.produtos[0]} No Produtos</td>
                    </tr>
                )
        }          
    </tbody>
  </table>
);
    
export default ProdutoTable;