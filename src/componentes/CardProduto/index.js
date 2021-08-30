import React, { useEffect, useState } from 'react'
import './style.css'
import { Button, ButtonGroup, Input, Text } from "@chakra-ui/react"
import { queryByTestId } from '@testing-library/react';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';


export default function CardProduto(props) {


    const [dataProduct, setDataProduct] = useState(props.data);
    const [qtd, setQtd] = useState(1);



    function validaQtd(e) {
        props.UpdateQtdListCart(e,props.data.id)
        if(e < 1){
            setQtd(1)
            return 0 
        }else{
            return qtd
        }
        //setQtd(e)

    }



    return (
        <div className="cardProduct">
            <ToastContainer autoClose={3000}/>



            <div className="image">
                {/* {props.data.id} */}
                <img width="180px" height="180px" src={dataProduct.image} />
            </div>
            <div className='propiedades'>
                <Text fontSize="md">{dataProduct.name }</Text>
                <Text fontSize="xl" >R$ {(dataProduct.price*qtd).toFixed(2)}</Text>
                <Text fontSize="md">Score {dataProduct.score}</Text>
            </div>

            {props.page ?

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    minWidth: '100%'
                    
                }}>

                    <Button colorScheme="blue" onClick={()=>{setQtd(qtd +1,toast.success('Item adicionado com sucesso!'))}}>+</Button>
                    

                    <Text fontSize="md">{validaQtd(qtd)}</Text>

                    <Button colorScheme="blue" onClick={()=>{setQtd(qtd -1,toast.success('Item removido com sucesso!'))}}>-</Button>
                    


                </div>
                :
                <Button onClick={() => { props.addCart(props.data) }} colorScheme="blue">Adicionar ao Carrinho</Button>
            }
        </div>
    )
}