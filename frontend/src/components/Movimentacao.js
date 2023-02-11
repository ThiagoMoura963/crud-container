import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
//import AddForm from "./AddForm";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";



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



const Movimentacao = ({ movimentacao, setMovimentacao, getMovimentacao }) => {
    


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);


    const handleShow2 = async (id) => {
        setShow2(true);
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
        //setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    };

    const handleClose2 = () => setShow2(false);
    
    const ref = useRef();


   /* const handleEdit = (item) => {
        setOnEdit(item);
    }; */

/*    useEffect((e) => {
        if (onEdit) {
            
        }
      }, [onEdit]); */

    const handleDelete = async (id) => {
        await axios 
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = movimentacao.filter((user) => user.id !== id);

                setMovimentacao(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

            console.log(id);
           // setOnEdit(null);
            
    };



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

const [error, setError] = useState("");

const[busca, setBusca] = useState("");

const form = { nome, cliente, tipo, status, categoria };

const formUpdate = { id, newNome, newCliente, newTipo, newStatus, newCategoria };


const handleSubmit = async (e) => {
    e.preventDefault();


    if(
        !nome ||
        !cliente ||
        !tipo||
        !status ||
        !categoria
    ){
        return toast.warn("Preencha todos os campos!")
    }  else { 
    
    if(!validaFormatoContainer(nome)){
        return toast.warn("Preencha os campos corretamente!")
    } 

    await axios.post("http://localhost:8800", form)
    .then(({ data }) => toast.success(data))
    .catch(({ data }) => toast.error(data));
    
    console.log(nome.id);
}

    setMovimentacao();
};

const handleEdit = async (id) => {
    await axios.put("http://localhost:8800", 
    {
        id: id,
        nome: newNome,
        cliente: newCliente,
        tipo: newTipo,
        status: newStatus,
        categoria: newCategoria,
    })
    console.log(id);
}

const handleSubmitUpdate = async (e) => {
    e.preventDefault();


    if(
        !newNome ||
        !newCliente ||
        !newTipo||
        !newStatus ||
        !newCategoria
    ){
        return toast.warn("Preencha todos os campos!")
    }  else {
        if(!validaFormatoContainer(newNome)){
            return toast.warn("Preencha os campos corretamente!")
        } 

    console.log(id);
    console.log(stringify(formUpdate));
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
    getMovimentacao();
    handleClose2();

};

function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // reset the cache
    return str;
  }

  
const regex = /[a-zA-Z]{4}[0-9]{7}/;

const validaFormatoContainer = (valor) => {

    if (!regex.test(valor)) {

        return false;// toast.warn("O nome deve conter 4 letras e 7 numeros");
    }
    return true;

};

console.log(busca);

  
  return (
    <div>
    <DivContainer>
    <DivButton>
        <Button onClick={handleShow}>+ Adicionar movimentação</Button>
    </DivButton>
    <DivSearch>
        <InputSearch 
        type="text" 
        placeholder="Pesquisar..." 
        onChange={(e) => setBusca(e.target.value)}/> 
 
    </DivSearch>
    </DivContainer>    
<FormContainer>
    <Table striped bordered hover >
        <thead>
            <tr>
                <th>Tipo de movimentação</th>
                <th>Data inicial</th>
                <th>Data final</th>
                <th>Opções</th>
            </tr>
        </thead>
        <tbody>
            {movimentacao.filter((item) => !busca || item.tipo.toLowerCase().includes(busca.toLowerCase())).map((item, i)  => 
            (
                <tr key={i}>
                <td>{item.tipo}</td>
                <td>{item.inicio}</td>
                <td>{item.fim}</td>
                <td>
                    <TdOpcoes>
                        <FaTrash onClick={() => handleDelete(item.id)} />
                        <FaEdit onClick={() => handleShow2(item.id)} />
                    </TdOpcoes>
                </td>
            </tr>
            ))}
            
        </tbody>
    </Table>
</FormContainer>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
                <Modal.Title>
                        CADASTRO
                </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
              {/*  <AddForm ref={ref}/> */}
              <Form onSubmit={(e) => handleSubmit(e)} ref={ref}>
           
            <DivForm>
            <Form.Group>
                <Label>Tipo</Label>
                <Div>
                <Form.Check name="tipo" label="Embarque" inline type="radio" value={20}
                onChange={(e) => {
                    setTipo(e.target.value)
                }}
                 />
                <Form.Check name="tipo" label="Descarga" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value)}}/>
                <Form.Check name="tipo" label="Gate-in" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value)}}/>
                <Form.Check name="tipo" label="Gate-out" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value)}}/>
                <Form.Check name="tipo" label="Reposicionamento" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value)}}/>
                    <Form.Check name="tipo" label="Pesagem" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value)}}/>
                <Form.Check name="tipo" label="Scanner" inline type="radio" value={40} 
                onChange={(e) => {
                    setTipo(e.target.value)}}/>    
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group> 
                <Label>Data Incial</Label>
                <Form.Control
                    name="nome"
                    type="text"
                    onChange={(e) => {
                        setNome(e.target.value.toUpperCase())
                    }}
                 />
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group> 
                <Label>Data Final</Label>
                <Form.Control
                    name="nome"
                    type="date"
                    mask='99/99/9999 99:99'
                    onChange={(e) => {
                        setNome(e.target.value.toUpperCase())
                    }}
                 />
            </Form.Group>
            </DivForm>
            <Button variant="success" type="submit" >
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

    <Modal show={show2} onHide={handleClose2} >
        <Modal.Header>
                <Modal.Title>
                        EDIÇÃO
                </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
              {/*  <AddForm ref={ref}/> */}
              <Form onSubmit={(e) => handleSubmitUpdate(e)} ref={ref}>
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
                    onChange={(e) => [setNewCliente(e.target.value)]}
                />
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Tipo</Label>
                <Div>
                <Form.Check name="tipo" label="20 pés" inline type="radio" value={20} checked={newTipo === "20"}
                onChange={(e) => [setNewTipo(e.target.value)]}
                 />
                <Form.Check name="tipo" label="40 pés" inline type="radio" value={40} checked={newTipo === "40"} 
                onChange={(e) => [setNewTipo(e.target.value), setError("")]}/>
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Status</Label>
                <Div>
                <Form.Check name="status" label="Vazio" inline type="radio" value={'vazio'} checked={newStatus.toLowerCase() === "vazio"}
                onChange={(e) => [setNewStatus(e.target.value), setError("")]}/>
                <Form.Check name="status" label="Cheio" inline type="radio" value={'cheio'} checked={newStatus.toLowerCase() === "cheio"}
                onChange={(e) => [setNewStatus(e.target.value), setError("")]} />
                </Div>
            </Form.Group>
            </DivForm>
            <DivForm>
            <Form.Group>
                <Label>Categoria</Label>
                <Div>
                <Form.Check name="categoria" label="Importação" inline type="radio" value={'importação'} checked={newCategoria.toLowerCase() === "importação"}
                onChange={(e) => [setNewCategoria(e.target.value), setError("")]} />
                <Form.Check name="categoria" label="Exportação" inline type="radio" value={'exportação'} checked={newCategoria.toLowerCase() === "exportação"}
                onChange={(e) => [setNewCategoria(e.target.value), setError("")]}/>
                </Div>
            </Form.Group>
            
            </DivForm>
            <div>{error}</div>      
            <Button variant="success" type="submit">
                    Salvar
            </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="danger" onClick={handleClose2}>
                    Fechar
                </Button>
                
        </Modal.Footer>
    </Modal>



    

    </div>
  );
};

export default Movimentacao; 