import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NotFoundPage, MainPage, DetailsPage } from "./pages";

export function Application() {
    return (<BrowserRouter>
        <Routes>
            <Route path={"/"} index element={<MainPage/>}/>
            <Route path={"/:repoId"} element={<DetailsPage/>} errorElement={<NotFoundPage />}/>
        </Routes>
    </BrowserRouter>);
}