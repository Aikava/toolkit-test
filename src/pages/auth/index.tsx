import * as React from "react";
import  {useCallback, useState} from "react";
import {Page, PageContent} from "../../components";
import {useToken} from "../../store";
import {useNavigate} from "react-router-dom";
import "./style.css";

export const AuthPage = () => {
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();
    const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    }, []);
    const handleUseToken = () => {
        window.localStorage.setItem("github_token", token);
        useToken(token);

        navigate("/");
    };

    return (<Page title="Auth">
        <PageContent>
            <div className="auth-page__container">
                <input className="auth-page__input"
                       type="text"
                       value={token}
                       onChange={handleInput} />
                <button disabled={!token} className="auth-page__button"
                        onClick={handleUseToken}>Use token</button>
            </div>
        </PageContent>
    </Page>);
};