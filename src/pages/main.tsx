import {Input, List, Pagination} from "../components";
import * as React from "react";

const mockData = [];
export const MainPage = () => {
    return (<>
            <Input type={"text"}/>
            <List items={mockData}/>
            <Pagination current={0} amount={10} max={Math.ceil(mockData.length / 10)}/>
        </>
    )
        ;
};