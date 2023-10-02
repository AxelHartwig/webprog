import React, { useState } from 'react';
import {Outlet, useOutletContext, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import * as bootstrap from 'bootstrap';





export default function ViewOrder() {


    window.bootstrap = bootstrap;


    const props = useOutletContext();
    const [resp, setResp] = useState(null);
	  const navigate = useNavigate();

  
    return (
    <>
    <Outlet context={props} />
    {resp && 
			
			<h5 className='mb-3 pb-4'>
		
				<p>Du har beställt {JSON.stringify(resp.order)}</p>
				<p>Pris: {JSON.stringify(resp.price)}</p>
				ID: {JSON.stringify(resp.uuid)}
		
			</h5>
    }


      <div className="container col-12">
        <div className="row h-100 p-5 bg-light border rounded-3">
          <h2>Varukorg: </h2>
          {props.shoppingCart.map((salad) => (
            <div
              className="row text-primary mt-2 p-3 border border-primary rounded-3"
              key={salad.uuid}
            >
              <div className="col p-1">
              {Object.keys({ ...salad.ingredients }).reduce(
                (prev, curr) => prev + curr + ", ",
                ""  
              )}
              {"pris: " + salad.getPrice() + " kr"}
              </div>
            </div>
          ))}
  
          <div className="row text-white bg-primary border-primary mt-2 p-3 border rounded-3">
            Totalt:{" "}
            {props.shoppingCart.reduce((prev, curr) => prev + curr.getPrice(), 0)} kr
          </div>
        </div>
        <form onSubmit={handleOrderSubmit} action='http://localhost:8080/'>
				  <button type='submit' className='mt-4 btn btn-primary'>
					  Beställ
				  </button>
			  </form>
      </div>
    </>
    );


    function handleOrderSubmit(e) {
      e.preventDefault(); 
      const url = 'http://localhost:8080/orders/';
  
      console.log(props.shoppingCart);
  
      let order = props.shoppingCart.map((salad) =>
        Object.keys(salad.ingredients)
      );
      console.log(JSON.stringify(order.keys));
  
      return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(order),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error code: ' + response.status);
          }
          return response.json();})
            .then((json) => {
            navigate('/view-order/');
            setResp(json);
            props.shoppingCart = [];
        });
    }

  };