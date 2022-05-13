import React, { useState } from 'react';

const AddProdutoForm = props => {

    const initialFormState = { nome: '', descricao: '', preco: '',  data_criacao: '', data_atualizacao: ''};
    const [produto, setProduto] = useState(initialFormState);

    const handleInputChange = event => {
        const {name, value} = event.target;

        setProduto({ ...produto, [name]: value });
    }

    const submitForm = event => {
        event.preventDefault();

        if (!produto.nome || !produto.descricao) return;
        
        props.addProduto(produto);
        setProduto(initialFormState);
    };

    return (
        <div className="row">

            <form className="col s12"
                onSubmit={submitForm}>
                <div className="row">
                    <div className="input-field col s12">

                        <input type="text" 
                            id="nome" 
                            name="nome" 
                            value={produto.nome}
                            onChange={handleInputChange} 
                            required />
                        <label htmlFor="nome">Name</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="descricao" 
                            value={produto.descricao}
                            onChange={handleInputChange} 
                            required />
                        <label htmlFor="descricao">descricao</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="preco" 
                            value={produto.preco}
                            onChange={handleInputChange} 
                            required />
                        <label htmlFor="preco">preco</label>
                    </div>
                </div>
                
                
                <div className="row">
                    <div className="input-field col s12">

                        <button className="waves-effect waves-light btn">Add</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProdutoForm;
