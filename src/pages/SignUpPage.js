import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const navigate = useNavigate();

  function signUp(e) {

    const body = { name, email, password }

    e.preventDefault();
    console.log("Cadastrando");

    const promise = axios.post("BASE_URL", body)

    //se sucesso to=/subscriptions
    if (password === confirmPassword) {
      promise.then((res) => {
        console.log(res.data)
        navigate("/subscriptions")
      })
    }else{
      alert("Senha e confirme senha devem ser iguais!")
    }

    //se falha to=/home e exibir alert
    promise.catch((err) =>
      alert(err.response.data.message)
    )
  }


  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input onChange={e => setName(e.target.value)} value={name} placeholder="Nome" type="text" required />
        <input onChange={e => setEmail(e.target.value)} value={email} placeholder="E-mail" type="email" required />
        <input onChange={e => setPassword(e.target.value)} value={password} placeholder="Senha" type="password" autocomplete="new-password" required />
        <input onChange={e => setconfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirme a senha" type="password" autocomplete="new-password" required />
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
