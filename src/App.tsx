import { useState } from "react";
import "./App.css";
import { EmptyCart } from "./components/EmptyCart";
import { Header } from "./components/Header";
import { ItemsCounter } from "./components/ItemsCounter";

function App() {
  const [cart, setCart] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Header title="🔥Lista de compras🔥" subtitle="Seja bem vindo" />
      <ul>
        {cart.map((item) => (
          <li style={{ fontSize: 30 }}>{item}</li>
        ))}
      </ul>
      {cart.length > 0 ? <ItemsCounter total={cart.length} /> : <EmptyCart />}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>item a ser adicionado: {inputValue}</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            setCart([...cart,inputValue]);
            setInputValue("");
          }}
        >
          Adicionar ao carrinho
        </button>
        <a
          href={`https://api.whatsapp.com/send/?phone=15551234567&text=ola+a+sua+compra+e+${cart.join(
            "+"
          )}`}
        >
          <button>🦤Enviar por whatsapp</button>
        </a>
      </div>
    </div>
  );
}

export default App;
