import * as React from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import "./style.css";
type SearchBarProps = {
    value?: string;
    onChange(query: string): void;
    disabled?: boolean;
}
export const SearchBar = ({ value, onChange, disabled }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        if (value)
            setInputValue(value);
    }, [value]);
    const handleInputChange = useCallback(event => {
        setInputValue(event.target.value);
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        onChange(inputValue);
    }
    const filedId = useMemo(() => crypto.randomUUID(), []);
    return (
        <form onSubmit={handleSubmit} className="search-bar__wrapper">
            <label htmlFor={filedId} className="search-bar__title">Search</label>
            <input id={filedId} className="search-bar__input" disabled={disabled} value={inputValue} onChange={handleInputChange}></input>
        </form>
    )
};