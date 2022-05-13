import React, { useState, useEffect } from 'react';

const EditProdutoForm = props => {
    const [produto, setProduto] = useState(props.currentProduto);

    const handleInputChange = event => {
        const { name, value } = event.target

        setProduto({ ...produto, [name]: value })
    };

    const submitForm = event => {
        event.preventDefault();

        props.updateProduto(produto.id, produto);
    };
 
    useEffect(() => {
        setProduto(props.currentProduto);
    }, [props]);

    return (
        <div className="row">

            <form className="col s12"
                onSubmit={submitForm}>
                <div className="row">
                    <div className="input-field col s12">

                        <input type="text" 
                            id={produto.id} 
                            name="nome"
                            value={produto.nome}
                            onChange={handleInputChange} 
                            required />
                        <label htmlFor="nome"></label>
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
                        <label htmlFor="descrição"></label>
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
                        <label htmlFor="preço"></label>
                    </div>
                </div>
                
                <div className="row">
                    <div className="input-field col s12 m6">

                        <button className="waves-effect waves-light btn">Update</button>
                    </div>

                    <div className="input-field col s12 m6">

                        <button 
                            className="waves-effect waves-light btn"
                            onClick={() => props.setEditing(false)}
                            >Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProdutoForm;
