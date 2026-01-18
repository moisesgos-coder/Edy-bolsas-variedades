import { useState } from "react";

export default function App() {
  const [view, setView] = useState("home");
  const [vendedores, setVendedores] = useState([]);
  const [novoVendedor, setNovoVendedor] = useState("");
  const [senhaAdmin, setSenhaAdmin] = useState("");
  const [logadoAdmin, setLogadoAdmin] = useState(false);

  const produtos = [
    { id: 1, nome: "Mochila Princesas Rosa", preco: 180 },
    { id: 2, nome: "Mochila Dinossauro Verde", preco: 180 },
    { id: 3, nome: "Mochila Dinossauro Laranja", preco: 180 },
    { id: 4, nome: "Mochila Jurassic Azul", preco: 180 },
    { id: 5, nome: "Mochila Carros de Corrida", preco: 180 },
  ];

  function cadastrarVendedor() {
    if (!novoVendedor) return;
    setVendedores([...vendedores, { id: Date.now(), nome: novoVendedor, aprovado: false, vendas: 0, comissao: 0 }]);
    setNovoVendedor("");
    setView("home");
  }

  function aprovarVendedor(id) {
    setVendedores(vendedores.map(v => v.id === id ? { ...v, aprovado: true } : v));
  }

  function simularVenda(vendedorId, produto) {
    const comissao = produto.preco * 0.2;
    setVendedores(vendedores.map(v => v.id === vendedorId ? { ...v, vendas: v.vendas + 1, comissao: v.comissao + comissao } : v));
    alert(`Venda realizada! Comissão: R$ ${comissao.toFixed(2)}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Edy Bolsas & Variedades</h1>

      {view === "home" && (
        <>
          <button onClick={() => setView("cliente")}>Entrar como Cliente</button>
          <button onClick={() => setView("cadastroVendedor")}>Quero ser Vendedor</button>
          <button onClick={() => setView("admin")}>Admin</button>
        </>
      )}

      {view === "cadastroVendedor" && (
        <>
          <h2>Cadastro de Vendedor</h2>
          <input placeholder="Seu nome" value={novoVendedor} onChange={e => setNovoVendedor(e.target.value)} />
          <button onClick={cadastrarVendedor}>Enviar</button>
        </>
      )}

      {view === "cliente" && (
        <>
          <h2>Produtos</h2>
          {produtos.map(p => (
            <div key={p.id}>
              {p.nome} - R$ {p.preco}
              {vendedores.filter(v => v.aprovado).map(v => (
                <button key={v.id} onClick={() => simularVenda(v.id, p)}>Comprar com {v.nome}</button>
              ))}
            </div>
          ))}
        </>
      )}

      {view === "admin" && (
        <>
          <h2>Painel Admin</h2>
          {vendedores.map(v => (
            <div key={v.id}>
              {v.nome} - {v.aprovado ? "Aprovado" : "Pendente"} | Vendas: {v.vendas} | Comissão: R$ {v.comissao.toFixed(2)}
              {!v.aprovado && <button onClick={() => aprovarVendedor(v.id)}>Aprovar</button>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
