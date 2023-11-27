import React from "react"
import { InterfaceReceita } from "../../data/types/InterfaceReceita";
import api from "../../data/services/api/api";
import { BoxForm } from "../../components/styled/BoxForm/styles";
import { FormInput } from "../../components/styled/FormInput/styles";
import { FormButton } from "../../components/styled/FormButton/styles";
import { Card } from "../../components/Card";
import { Nav, SearchInput } from "../../components/Nav/styles";
import Modal from "react-modal"
export const user: string = "Augusto"

const Home = () => {
  const [receitas, setReceitas] = React.useState<InterfaceReceita[]>([]);
  const [originalArray, setOriginalArray] = React.useState<InterfaceReceita[]>([]);
  const [nome, setNome] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [modoDePreparo, setModoDePreparo] = React.useState('');
  const [ingredientes, setIngredientes] = React.useState('');

  const modalStyles = {
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      width: '100%',
    },
  };
  React.useEffect(() => {
    //@ts-ignore
    api.get('/api/receitas').then((response) => {
      setReceitas(response.data);
      setOriginalArray(response.data);
    });
  }, []);
  
  async function criarReceita(e: React.FormEvent){
    e.preventDefault();
    try {
      await api.post('/api/receitas', {
        nome: nome,
        descricao: descricao,
        modoDePreparo: modoDePreparo,
        ingredientes: ingredientes,
        autor: user,
        //@ts-ignore
      }).then((response) => {setReceitas(response.data)})
    } catch (e) {
      console.log(e)
    }
  }
 
  async function filterReceitas(e: string) {
    let filteredReceitas = new Array<InterfaceReceita>();
    if(e.length > 0){
      receitas.map((receita) => {
        if(receita.nome.includes(e)){
          console.log(receita)
          filteredReceitas.push(receita);
          setReceitas(filteredReceitas);
        }
      })
    } else {
      setReceitas(originalArray);
    }
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const closeModal = () => {
    setIsOpen(false);
  }
  const openModal = () => {
    setIsOpen(true);
  }
  return (
    <div>
      <Nav>
        <SearchInput placeholder="pesquisar..." onChange={(e) => {filterReceitas(e.target.value)}}/>
        <FormButton onClick={openModal}>Criar</FormButton>
      </Nav>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
          <h1>Nova Receita</h1>
          <form onSubmit={criarReceita}>
            <BoxForm>
              <label htmlFor="nome">Nome da Receita:</label>
              <FormInput
                type="text"
                id="nome"
                name=""
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              >
              </FormInput>
            </BoxForm>
            <br />
            <BoxForm>
              <label htmlFor="descricao">Descricao:</label>
              <FormInput
                type="text"
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              >
              </FormInput>
            </BoxForm>
            <br />
            <BoxForm>
              <label htmlFor="modoDePreparo">Modo de preparo:</label>
              <FormInput
                type="text"
                id="modoDePreparo"
                name="modoDePreparo"
                value={modoDePreparo}
                onChange={(e) => setModoDePreparo(e.target.value)}
                required
              >
              </FormInput>
            </BoxForm>
            <br />
            <BoxForm>
              <label htmlFor="ingredientes">Ingredientes:</label>
              <FormInput
                type="text"
                id="ingredientes"
                name="ingredientes"
                value={ingredientes}
                onChange={(e) => setIngredientes(e.target.value)}
                required
              >
              </FormInput>
            </BoxForm>
            <br />
            <FormButton type="submit">Enviar</FormButton>
          </form>
      </Modal>

      <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4em"}}>
      {receitas.length > 0 && receitas.map((receita) => {
        return (
          <Card
            id={receita.id}
            nome={receita.nome}
            descricao={receita.descricao}
            modoDePreparo={receita.modoDePreparo}
            ingredientes={receita.ingredientes}
            autor={receita.autor}
            criadoEm={receita.criadoEm}
          />
        )
      })}
      </div>
    </div>
  )
}

export default Home