import * as React from "react";
import  {useCallback, useState} from "react";
import {Page, PageContent} from "../components";
import {useToken} from "../store";
import {useNavigate, useSearchParams} from "react-router-dom";

export const AuthPage = () => {
    const [token, setToken] = useState<string>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    }, []);
    const handleUseToken = () => {
        window.localStorage.setItem("github_token", token);
        useToken(token);
        navigate(searchParams.get("backUrl"));
    };

    return (<Page title="Auth">
        <PageContent>
            <input type="text" value={token} onChange={handleInput}></input>
            <button onClick={handleUseToken}>Use token</button>
        </PageContent>
    </Page>);
};