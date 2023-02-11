//Importação de bibliotecas e componentes
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

/*--------------------------- CSS feita com auxílio da biblioteca styled-components -------------------------------*/

const TdOpcoes = styled.div`
    display: flex;
    justify-content: space-around;
`;

const DivButton = styled.div`
    padding: 15px;
`;


const DivForm = styled.div`
padding: 10px
`;

const Label = styled.label``;

const Div = styled.div`
margin-top: 5px;
`; 

const FormContainer = styled.form``;

const LabelWarning = styled.label`
    font-size: 13px;
`;

const InputSearch = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    padding: 0 5px;
    border-radius: 50px;
    font-size: 15px;
    color: #424242;
    font-weight: 500;
    &:focus {
        outline: none;
    }
    
`;



const DivContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: btween-around;
    align-items: center;
`;

const DivSearch = styled.div`
    width: 300px;
    height: 40px;
    border: 3px solid #2988b9;
    padding: 0px 10px;
    border-radius: 50px;
    margin-left: 60%;
`;



const Container = ({ users, setUsers, getUsers }) => {
    

//Use State para abrir e fechar o modal de cadastro e de edição
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [showUpdate, setShowUpdate] = useState(false);

//Função que irá abrir um modal com todas as informações filtradas do cadastro inicial do item que o usuário deseja editar
    const handleShowUpdate = async (id) => {
        setShowUpdate(true);
        const res = await axios.get("http://localhost:8800");

        const filtered = res.data.filter(x => {
            return x.id === id;
          });

          setNewNome(filtered[0].nome);
          setNewCliente(filtered[0].cliente);
          setNewTipo(filtered[0].tipo);
          setNewStatus(filtered[0].status);
          setNewCategoria(filtered[0].categoria);
          setId(id);
    };

    const handleCloseUpdate = () => setShowUpdate(false);
    


    const handleDelete = async (id) => {
        await axios 
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

            console.log(id);
            
    };


//Utilização do useState
const [nome, setNome] = useState("");
const [cliente, setCliente] = useState("");
const [tipo, setTipo] = useState("");
const [status, setStatus] = useState("");
const [categoria, setCategoria] = useState("");

const [newNome, setNewNome] = useState("");
const [newCliente, setNewCliente] = useState("");
const [newTipo, setNewTipo] = useState("");
const [newStatus, setNewStatus] = useState("");
const [newCategoria, setNewCategoria] = useState("");
const [id, setId] = useState();

const[busca, setBusca] = useState("");

const form = { nome, cliente, tipo, status, categoria };


const handleSubmit = async (e) => {
    e.preventDefault();

//If que irá retornar um aviso caso os campos não sejam preenchidos
    if(
        !nome ||
        !cliente ||
        !tipo||
        !status ||
        !categoria
    ){
        return toast.warn("Preencha todos os campos!")
    }  else { 
    
    if(!validaFormatoContainer(nome)){  //If que irá retornar um aviso caso houver uma negação da função validaFormatoContainer
        return toast.warn("Preencha os campos corretamente!") 
    } 

    //Realizando um requisição com o método post para fazer um INSERT na tabela container criada do banco de dados
    await axios.post("http://localhost:8800", form)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
    
}

    getUsers();
};

//Função que irá mandar as atualizações de cadastro para o banco de dados
const handleSubmitUpdate = async (e) => {
    e.preventDefault(); //Para não recarregar a página desnecessariamente 

//If que irá retornar um aviso caso os campos não sejam preenchidos
    if(
        !newNome ||
        !newCliente ||
        !newTipo||
        !newStatus ||
        !newCategoria
    ){
        return toast.warn("Preencha todos os campos!")
    }  else {
        if(!validaFormatoContainer(newNome)){ //If que irá retornar um aviso caso houver uma negação da função validaFormatoContainer
            return toast.warn("Preencha os campos corretamente!")
        } 
    //Realizando um requisição com o método put para fazer um UPDATE na tabela container criada do banco de dados
    await axios.put("http://localhost:8800/" + id,  {
        nome: newNome,
        cliente: newCliente,
        tipo: newTipo,
        status: newStatus,
        categoria: newCategoria,

    })
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
    
}
    getUsers();
    handleCloseUpdate();

};


    

//Validação de caracteres
const regex = /[a-zA-Z]{4}[0-9]{7}/;

const validaFormatoContainer = (valor) => {

    if (!regex.test(valor)) {

        return false;
    }
    return true;

};

console.log(busca);

  
  return (
/*Button para adiocnar novo container e SearchBox que filtra pelo nome do container */

    <div>
    <DivContainer>
    <DivButton>
        <Button onClick={handleShow}>+ Adicionar container</Button>
    </DivButton>
    <DivSearch>
        <InputSearch 
        type="text" 
        placeholder="Pesquisar..." 
        onChange={(e) => setBusca(e.target.value)}/> 
 
    </DivSearch>
    </DivContainer>    
<FormContainer>
    {/* Tabela com os cabeçalhos de cada item */}
    <Table striped bordered hover >
        <thead>
            <tr>
                <th>Nome</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Categoria</th>
                <th>Opções</th>
            </tr>
        </thead>
        <tbody>
            {/* Tabela que irá rederizar e filtrar cada item */}

            {users.filter((item) => !busca || item.nome.toLowerCase().includes(busca.toLowerCase())).map((item, i)  => 
            (
                <tr key={i}>
                <td>{item.nome}</td>
                <td>{item.cliente}</td>
                <td>{item.tipo}</td>
                <td>{item.status}</td>
                <td>{item.categoria}</td>
                <td>

                    <TdOpcoes>
             {/* Icones de excluir que dispara uma função de excluir um item pelo seu id correspondente */}
                        <FaTrash onClick={() => handleDelete(item.id)} />
             {/* Icones de edição que dispara uma função que irá exibir um modal de edição */}
                        <FaEdit onClick={() => handleShowUpdate(item.id)} />
                    </TdOpcoes>
                </td>
            </tr>
            ))}
            
        </tbody>
    </Table>
</FormContainer>
{/*-------------------------------------- Modal de Cadastro-------------------------------------------------- */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
                <Modal.Title>
                        CADASTRO
                </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
        {/* Formulário de cadastro */}
              <Form onSubmit={(e) => handleSubmit(e)}>
            <DivForm>
            <Form.Group> 
                <Label>Nome</Label>
                <Form.Control
                    name="nome"
                    type="text"
                    placeholder="EX:ABCD1234567"
                    onChange={(e) => {
                        setNome(e.target.value.toUpperCase()) //OnChange irá pegar o valor digitado pelo usuário
                    }}
                 />
                <LabelWarning>O nome deve conter 4 letras e 7 numeros</LabelWarning>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Cliente</Label>
                <Form.Control
                    name="cliente"
                    type="text"
                    onChange={(e) => {
                        setCliente(e.target.value) //OnChange irá pegar o valor digitado pelo usuário
                    }}
                />
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Tipo</Label>
                <Div>
                <Form.Check name="tipo" label="20 pés" inline type="radio" value={20}
                onChange={(e) => {
                    setTipo(e.target.value) //OnChange irá pegar o valor digitado pelo usuário
                }}
                 />
                <Form.Check name="tipo" label="40 pés" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value) //OnChange irá pegar o valor digitado pelo usuário
                    }} /> 
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Status</Label>
                <Div>
                <Form.Check name="status" label="Vazio" inline type="radio" value={'vazio'}
                onChange={(e) => {
                    setStatus(e.target.value) //OnChange irá pegar o valor digitado pelo usuário
                }} />
                <Form.Check name="status" label="Cheio" inline type="radio" value={'cheio'}
                onChange={(e) => {
                    setStatus(e.target.value) //OnChange irá pegar o valor digitado pelo usuário 
                    }} />
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Categoria</Label>
                <Div>
                <Form.Check name="categoria" label="Importação" inline type="radio" value={'importação'}
                onChange={(e) => {
                    setCategoria(e.target.value) //OnChange irá pegar o valor digitado pelo usuário
                    }} />
                <Form.Check name="categoria" label="Exportação" inline type="radio" value={'exportação'} 
                onChange={(e) => {
                    setCategoria(e.target.value) //OnChange irá pegar o valor digitado pelo usuário
                    }}/>
                </Div>
            </Form.Group>
            
            </DivForm>

            <Button variant="success" type="submit" onClick={handleClose}>
                    Salvar
            </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Fechar
                </Button>
                
        </Modal.Footer>
    </Modal>

{/*-------------------------------------------MODAL DE EDIÇÃO---------------------------------------------------*/}

    <Modal show={showUpdate} onHide={handleCloseUpdate} >
        <Modal.Header>
                <Modal.Title>
                        EDIÇÃO
                </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
              <Form onSubmit={(e) => handleSubmitUpdate(e)}>
            <DivForm>
            <Form.Group> 
                <Label>Nome</Label>
                <Form.Control
                    name="newNome"
                    type="text"
                    value={newNome}
                    placeholder="EX:ABCD1234567"
                    onChange={(e) => setNewNome(e.target.value.toUpperCase())} 
                 />
                <LabelWarning>O nome deve conter 4 letras e 7 numeros</LabelWarning>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Cliente</Label>
                <Form.Control
                    name="cliente"
                    type="text"
                    value={newCliente}
                    onChange={(e) => setNewCliente(e.target.value)}
                />
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Tipo</Label>
                <Div>
                <Form.Check name="tipo" label="20 pés" inline type="radio" value={20} checked={newTipo === "20"}
                onChange={(e) => setNewTipo(e.target.value)}
                 />
                <Form.Check name="tipo" label="40 pés" inline type="radio" value={40} checked={newTipo === "40"} 
                onChange={(e) => setNewTipo(e.target.value)}/>
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Status</Label>
                <Div>
                <Form.Check name="status" label="Vazio" inline type="radio" value={'vazio'} checked={newStatus.toLowerCase() === "vazio"}
                onChange={(e) => setNewStatus(e.target.value)}/>
                <Form.Check name="status" label="Cheio" inline type="radio" value={'cheio'} checked={newStatus.toLowerCase() === "cheio"}
                onChange={(e) => setNewStatus(e.target.value)} />
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Categoria</Label>
                <Div>
                <Form.Check name="categoria" label="Importação" inline type="radio" value={'importação'} checked={newCategoria.toLowerCase() === "importação"}
                onChange={(e) => setNewCategoria(e.target.value)} />
                <Form.Check name="categoria" label="Exportação" inline type="radio" value={'exportação'} checked={newCategoria.toLowerCase() === "exportação"}
                onChange={(e) => setNewCategoria(e.target.value)}/>
                </Div>
            </Form.Group>
            
            </DivForm>
            <Button variant="success" type="submit">
                    Salvar
            </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="danger" onClick={handleCloseUpdate}>
                    Fechar
                </Button>
                
        </Modal.Footer>
    </Modal>



    

    </div>
  );
};

export default Container; 