import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import SignInButton from "./SignInButton";

export default function LeftColumn() {
    return(
        <div className="left-column">
            <img src="src\img\logo.svg"></img> 
            <div className="left-column-container">
                <h1>вход</h1>
                <InputEmail />
                <InputPassword/>
                <SignInButton />
            </div>
        </div>
    )
}