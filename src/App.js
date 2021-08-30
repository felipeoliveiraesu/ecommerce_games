import { useEffect, useState } from 'react';
import { products } from './products'
import CardProdut from './componentes/CardProduto'
import './App.css'
import Header from './componentes/Header';
import { list, useToast } from "@chakra-ui/react"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';




function App() {



  const [ArrProducts, setArrProdutcts] = useState(products)
  const [ListCart, setListCart] = useState([])
  const [page, setPage] = useState(false)

  const [frete, setFrete] = useState(0)
  const [valor, setTotal] = useState(0)


  function UpdateQtdListCart(qtd, id) {
    var update = []
    console.log('dentrod o app.js', qtd, id)

    ListCart.map((item) => {
      if (item.id === id) {

        console.log('item quantidade', item.quantidade)
        item.quantidade = qtd
        item.valortotal = (qtd * item.price).toFixed(2)
        console.log('item quantidade next', item.quantidade)
        // var update = ListCart.slice()

        update = ListCart.slice()
      }
    })

    console.log(ListCart)
    console.log(update)
    setListCart(ListCart)
    var valortotalgeral = 0
    var quantidadetotal = 0
    ListCart.map((item) => {

      console.log(item.id, item.quantidade)

      quantidadetotal = quantidadetotal + parseInt(item.quantidade)

      valortotalgeral = parseFloat(valortotalgeral) + parseFloat(item.valortotal) 


    })
    console.log(quantidadetotal)
    Frete(quantidadetotal, valortotalgeral)

  }


  function ChangePage() {

    setPage(!page)

  }


  function Frete(quantidade ,valortotalgeral) {

    var frete = quantidade * 10

    console.log('FRETE', frete)

    if (valortotalgeral >= 250) {
      setFrete(0)
      setTotal(valortotalgeral.toFixed(2))
    } else {
      setFrete(frete)
      setTotal(valortotalgeral.toFixed(2))
    }



  }


  function AddProductCart(e) {



    var error = false

    if (ListCart.length > 0) {
      ListCart.map((item) => {
        console.log('map id', item.id, 'e id', e.id)
        if (item.id === e.id) {
          toast.error("Esse item já esta no carrinho!")
          error = true
        }


      })


    }

    if (!error) {
      ListCart.push(e)
      const arr = ListCart.slice()
      setListCart(arr)
      toast.success('Item adicionado no carrinho!', ListCart)
    }


  }


  return (


    <div className="root">
      <Header quantCart={ListCart.length} changePage={ChangePage} />
      <ToastContainer autoClose={3000}/>

      {page ?
        <>

          <div className="freteValor">
            <div className="frete">
              Frete  R$ {frete.toFixed(2)}
            </div>
            <div className="valor">
              Valor  R$ {valor}
            </div>
          </div>

          <div className="CardProdutos">

            {ListCart ? ListCart.map((item) => {
              return (
                <CardProdut data={item} key={item.id} addCart={AddProductCart} page={page} UpdateQtdListCart={UpdateQtdListCart}></CardProdut>
              )
            }) : ''}

          </div>
        </>

        :



        <div className="CardProdutos">
          {ArrProducts ? ArrProducts.map((item) => {
            return (
              <CardProdut data={item} key={item.id} addCart={AddProductCart} page={page}></CardProdut>
            )
          }) : ''}
        </div>

      }


    </div>

  );
}

export default App;
