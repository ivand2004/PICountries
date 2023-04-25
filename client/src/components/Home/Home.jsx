import { Countries } from "../Countries/Countries";
import SearchBar from "../SearchBar/SearchBar";

export function Home(){
    return(
        <>
        <SearchBar></SearchBar>
        <Countries></Countries>
        </>
    )
}