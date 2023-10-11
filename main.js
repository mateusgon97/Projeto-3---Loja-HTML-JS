class Produto{
    constructor() {
        this.id = 1;
        this.ArrayProduto = []
        this.idAdd=null;
    }

    salvar() {       
        let produto = this.lerCampos();
        if(this.camposValidos(produto)) {
            if(this.idAdd == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.idAdd, produto);
            }
                        
        }      
        console.log(this.ArrayProduto);
        this.insertCamp();
        this.cancelar();
    }


    lerCampos() {
        let objProd = {}
        objProd.id = this.id;
        objProd.nome = document.getElementById("nomeProd").value;
        objProd.valor = document.getElementById("valorProd").value;
        return objProd;
    }

    adicionar(produtoRecebido) {
        this.ArrayProduto.push(produtoRecebido);
        this.id++;
    }

    cancelar() {
        document.getElementById("nomeProd").value="";
        document.getElementById("valorProd").value="";
        this.idAdd=null;
        document.getElementById("btn").innerText = "SALVAR";
    }
    
    camposValidos(objProd) {
        let msn = "";
        if(objProd.nome == "") {
            msn += "-Digite o nome do produto\n"
        }
        if(objProd.valor == "") {
            msn += "-Digite o valor do produto\n"
        }
        if(msn!="") {
            alert(msn);
            return false;
        }
        return true;
    }

    deletar(id) {
        if(confirm("Deseja Apagar?")) {
            let tbody = document.getElementById("tbody");
            for (let i=0; i<this.ArrayProduto.length; i++) {
                if(this.ArrayProduto[i].id == id) {
                    this.ArrayProduto.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    insertCamp() {
        let tbody = document.getElementById("tbody");
        tbody.innerText = "";

        for(let i = 0; i < this.ArrayProduto.length; i++) {            
            let tr = tbody.insertRow(); // cria a linha

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText=this.ArrayProduto[i].id;
            td_nome.innerText=this.ArrayProduto[i].nome;
            td_valor.innerText=this.ArrayProduto[i].valor;

            let imgEdit = document.createElement("img");
            imgEdit.src="img/edit.png";
            imgEdit.setAttribute(
                "onclick",
                "produto.editar(" + JSON.stringify(this.ArrayProduto[i]) + ")"
            );
            td_acoes.appendChild(imgEdit);
        //    imgEdit.setAttribute("onclick"), "produto.edit()";   

            let imgDelete = document.createElement("img");
            imgDelete.src="img/excluir.png";
            td_acoes.appendChild(imgDelete);
            imgDelete.setAttribute("onclick", "produto.deletar("+this.ArrayProduto[i].id+")");
        }
    }

    editar(dados) {
        this.idAdd=dados.id;
        document.getElementById("nomeProd").value = dados.nome;
        document.getElementById("valorProd").value = dados.valor;
        document.getElementById("btn").innerText = "ATUALIZAR";
    }
    atualizar(id, produto) {
        for(let i=0; i < this.ArrayProduto.length; i++) {
            if(this.ArrayProduto[i].id == id) {
                this.ArrayProduto[i].nome = produto.nome;
                this.ArrayProduto[i].valor = produto.valor;
            }
        }
    }
}

let produto = new Produto();

