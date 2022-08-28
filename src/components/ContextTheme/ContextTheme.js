import { createContext } from "react"
import Button from "../Button/Button"


export const lightTheme = {
    backgroundColor: 'white'
}

export const darkTheme = {
    backgroundColor: 'darkGray'
}

export const PageBackgorundColor = createContext(lightTheme)



