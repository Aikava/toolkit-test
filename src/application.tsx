import * as React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {MainPage, DetailsPage, AuthPage} from "./pages";
import {useToken} from "./store";

const WithAuth = (target: React.ReactElement) => {
    if (!window.localStorage.getItem("github_token")) {
        const backUrl = window.location.pathname === "/auth" ? "/" : window.location.pathname;

        return <Navigate to={`/auth?backUrl=${encodeURIComponent(backUrl)}`} />;
    } else {
        useToken(window.localStorage.getItem("github_token"));
        return target;
    }
}

export function Application() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" index element={WithAuth(<MainPage/>)}/>
            <Route path="/auth" element={<AuthPage />}/>
            <Route path="/:repoId" element={WithAuth(<DetailsPage/>)}/>
        </Routes>
    </BrowserRouter>);
}