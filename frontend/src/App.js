//Importação de bibliotecas e componentes
import GlobalStyle from "./styles/global.js";
import Container from "./components/Container.js";
import Movimentacao from "./components/Movimentacao.js";
import Relatorio from "./components/Relatorio.js"
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Title = styled.h2``;


function App() {

  //useStates que irão inciiar com um array vazio
  const [users, setUsers] = useState([]);
  const [movimentacao, setMovimentacao] = useState([]);

//Função que irá pegar os dados do containers dentro da tabela de container do banco de dados
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      console.log(res);
    } catch (error) {
      toast.error(error);
    }
  };

  //useEffect que irá receber a função de getUsers e irá recarregar sempre que um novo usuário for inserido com o setUsers
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  //Função que irá pegar os dados de movimentação do container dentro da tabela de movimentação do banco de dados
  const getMovimentacao = async () => {
    try {
      const res = await axios.get("http://localhost:8800/movimentacoes");
      setMovimentacao(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      console.log(res);
    } catch (error) {
      toast.error(error);
    }
  };

  //useEffect que irá receber a função de getMovimentacao e irá recarregar sempre que um novo usuário for inserido com o setMovimentacao
  useEffect(() => {
    getMovimentacao();
  }, [setMovimentacao]);


  return (
    <div className="App">
      <Title>CRUD CONTAINER</Title>
   {/* Navegação da página */}
      <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/">Containers</Nav.Link>
        <Nav.Link as={Link} to="/movimentacoes">Movimentações</Nav.Link>
        <Nav.Link as={Link} to="/relatorios">Relatórios</Nav.Link>
      </Nav>

    {/* Rotas dos componentes */}
      <Routes>
        <Route path="/" index element={<Container users={users} setUsers={setUsers} getUsers={getUsers}/>}></Route>
        <Route path="/movimentacoes" element={<Movimentacao movimentacao={movimentacao} setMovimentacao={setMovimentacao} getUsers={getMovimentacao} />}></Route>
        <Route path="/relatorios" element={<Relatorio/>}></Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />{/* Improtando o componente de Toast Container */}
      <GlobalStyle /> {/* Importando o componente de estilização global */}
    </div>
  );

};


export default App;
