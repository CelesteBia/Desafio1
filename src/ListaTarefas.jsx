import React, { useState } from 'react';

function ListaTarefas() {
  const [itemList, setItemList] = useState([]);
  const [newItem, setNewItem] = useState("");

  function handleInputChange(event) {
    setNewItem(event.target.value);
  }

  function adicionarTarefa() {
    if (newItem.trim() !== "") {
      const tarefa = { texto: newItem, completa: false }; // cada tarefa é um objeto com texto e status 'completa'
      setItemList(itemList => [...itemList, tarefa]);
      setNewItem("");
    }
  }

  function completarTarefa(index) {
    const updatedTasks = itemList.map((tarefa, i) => {
      if (i === index) {
        return { ...tarefa, completa: !tarefa.completa }; // alterna o status de 'completa'
      }
      return tarefa;
    });
    setItemList(updatedTasks);
  }

  function deletarTarefa(index) {
    const updatedTasks = itemList.filter((_, i) => i !== index); // remove a tarefa da lista
    setItemList(updatedTasks);
  }

  return (
    <div className='container'>
      <h1 className='lista'>Lista de Tarefas</h1>
      <input
        type="text"
        placeholder="Digite para adicionar uma tarefa"
        value={newItem}
        onChange={handleInputChange}
      />
      <button className='adicionar_botao' onClick={adicionarTarefa}>
        Adicionar tarefa
      </button>

      <ul>
        {itemList.map((item, i) => (
          <li className={`item ${item.completa ? 'completa' : ''}`} key={i}>
            <input
              type="checkbox"
              checked={item.completa}
              onChange={() => completarTarefa(i)}
            />
            {item.texto}
            {/* Renderiza o botão de deletar somente se a tarefa estiver completa */}
            {item.completa && (
              <button className='deletar_botao' onClick={() => deletarTarefa(i)}>
                Apagar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefas;
