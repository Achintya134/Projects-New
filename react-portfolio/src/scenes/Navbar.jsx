import {useState } from 'react'
import AnchorLink from "react-anchor-link-smooth-scroll"
import useMediaQuery from '../hooks/useMediaQuery'

const Navbar =({selectedPage, setSelectedPage}) =>{
    const [ismenuToggled, setIsMenuToggled] = useSate(false)
    const isAboveSmallScreen=useMediaQuery("(min-width:768 px)")

    return(
        <nav className=''
    )


}