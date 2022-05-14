import React from "react";
import { Link } from "react-router-dom";




function Home() {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem-Vindo!</h1>
            <p className="lead">Utilize a barra de navegação para acessar as páginas</p>
            <hr className="my-4"/>
        </div>
    );
}

export default Home;