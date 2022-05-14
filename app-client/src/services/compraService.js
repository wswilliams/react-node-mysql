const COMPRAS = '_COMPRAS'

export function ErroValidacao (errors){
    this.errors = errors;
}

export default class CompraService {

    obterCompras = () => {
        const compras = localStorage.getItem(COMPRAS)
        if(!compras){
            return[];
        }
        return JSON.parse(compras)
    }

    obterIndex = (id) => {
        let index = null
        this.obterCompras ().forEach((compra,i) =>{
            if(compra.id === id){
                index = i;
            }
        })

        return index;

        
    }

    deletar = (id) =>{
        const index = this.obterIndex(id)
        if(index !== null){
            const compras = this.obterCompras()
            compras.splice(index,1)
            localStorage.setItem(COMPRAS,JSON.stringify(compras))
            return compras
        }
    }
    deletarAll = () =>{
        localStorage.clear();
    }

    salvar = (compra) => {

      let compras = localStorage.getItem(COMPRAS)
      if (!compras){
        compras = []
      }else {
        compras = JSON.parse(compras)
      }

     const index =   this.obterIndex(compra.id)
     if (index === null){
        compras.push(compra);
     }else{
        compras[index] = compra;
     }

    

     localStorage.setItem(COMPRAS,JSON.stringify(compras))
    }
}