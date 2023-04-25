import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      navigate("/home");
    }
  }, []);

  function login(e) {

    const body = { email, password }
    
    e.preventDefault();
    console.log("Logando");

    const promise = axios.post(`${apiUrl}/cadastro`, body)

    //se sucesso to=/subscriptions
    promise.then((res) => {
        console.log(res.data)
        // const {} = 
        navigate("/home")
    })
    //se falha to=/home e exibir alert
    promise.catch((err) =>
        alert(err.response.data.message)
    )
}



  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input onChange={e=> setEmail(e.target.value)} value={email} name="email" placeholder="E-mail" type="email" required/>
        <input onChange={e=> setPassword(e.target.value)} value={password} name="password" placeholder="Senha" type="password" autoComplete="new-password" required />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
