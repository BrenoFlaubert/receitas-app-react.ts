import { InterfaceReceita } from '../../data/types/InterfaceReceita'
import { Link } from 'react-router-dom'
import { CardContainer, CardContent, CardDescription, CardImage } from './styles'
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import api from '../../data/services/api/api';
import Modal from "react-modal"
import React from 'react';
import { BoxForm } from '../styled/BoxForm/styles';
import { FormInput } from '../styled/FormInput/styles';
import { FormButton } from '../styled/FormButton/styles';
import { user } from '../../pages/Home';

export const Card = (receita: InterfaceReceita) => {
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
  const [nome, setNome] = React.useState(receita.nome);
  const [descricao, setDescricao] = React.useState(receita.descricao);
  const [modoDePreparo, setModoDePreparo] = React.useState(receita.modoDePreparo);
  const [ingredientes, setIngredientes] = React.useState(receita.ingredientes);
  async function deleteReceita(){
    try {
      await api.delete('/api/receitas', {
        data: {
          id: receita.id
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {location.reload()})
    } catch (e) {
      console.log(e)
    }
  }
  async function updateReceita(e: React.FormEvent){
    e.preventDefault();
    try {
      await api.put('/api/receitas', {
        id: receita.id,
        nome: nome,
        descricao: descricao,
        modoDePreparo: modoDePreparo,
        ingredientes: ingredientes,
        criadoEm: receita.criadoEm,
        autor: user,
      }).then(() => {location.reload()})
    } catch (e) {
      console.log(e)
    }
  }
  const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);
  const openUpdate = () => {
    setUpdateModalIsOpen(true);
  }
  const closeUpdate = () => {
    setUpdateModalIsOpen(false);
  }
  return (
    <CardContainer>
      <Modal isOpen={updateModalIsOpen} onRequestClose={closeUpdate} style={modalStyles}>
          <h1>Atualizar Receita</h1>
          <form onSubmit={updateReceita}>
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
            <FormButton type="submit">ATUALIZAR</FormButton>
          </form>
      </Modal>
      <Link to={`receita/${receita.id}`} style={{textDecoration: "none"}}> 
        <CardContent>
          <CardImage 
            src={"/public/images/generic-food.svg"}
            alt="imagem-da-receita"
          />
          <CardDescription>
            <div>
              <p className="h3">Nome da receita: {receita.nome}</p>
              <p className="h3">Descriçao: {receita.descricao}</p>
            </div>
            <p className="p">Autor: {receita.autor}</p>
            <p className="p">Postado em: {receita.criadoEm}</p>
          </CardDescription>
        </CardContent>
      </Link>
      <div style={{display: 'flex', gap: '2em'}}>
        <FaPen size={24} onClick={openUpdate} color={'#333333'}/>
        <FaTrash size={24} onClick={deleteReceita} color={'#333333'}/>
      </div>
    </CardContainer>
  )
}
