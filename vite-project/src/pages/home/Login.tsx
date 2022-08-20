import './Login.css'
import Screen from './components/Screen'
// @ts-ignore
import Form from './components/Form'

export default function Home(){
    return (<div className="underBody">
        <Screen>
            <div className="form">
        <div className="formLogin">
            <h1>Autenticação JWT</h1>
            <label className="labelLogin"htmlFor="login">Login</label>
            <input className="loginInput" type="text" placeholder='Login ..'/>
            <label className="labelPassword"htmlFor="password">Password</label>
            <input className="passInput" type="password" placeholder='Password ..' />
            <button className='btnLogin' type="submit">Login</button>
        </div>
            </div>
        </Screen>
        
    </div>)
}