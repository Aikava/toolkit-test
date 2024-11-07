import * as React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage, DetailsPage, AuthPage} from "./pages";
import {useToken} from "./store";

const WithAuth = ({ page: Page }) => {
    if (!window.localStorage.getItem("github_token")) {
        return <Navigate to={`/auth`} replace={true} />;
    } else {
        useToken(window.localStorage.getItem("github_token"));
        return <Page />;
    }
}

export function Application() {
    return (
        <Routes>
            <Route path="/" index element={<WithAuth page={MainPage}/>}/>
            <Route path="/auth" element={<AuthPage />}/>
            <Route path="/:repoId" element={<WithAuth page={DetailsPage}/>}/>
        </Routes>);
}