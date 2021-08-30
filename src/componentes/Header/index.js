import React, { useEffect } from 'react'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import './style.css'
import Badge from '@material-ui/core/Badge';
import { propNames } from '@chakra-ui/react';
import slogan from "../../assets/slogan_games.png"




export default function Header(props) {



    return (
        <div className='header'>

            <div className='logo'>
            <img src={slogan} alt = {slogan.nome}/>
            </div>
            <div className='cart'>              
                <Badge badgeContent={props.quantCart} color="primary">
                    <RiShoppingCart2Fill onClick={props.changePage} />
                </Badge>

            </div>


        </div>
    )
}

