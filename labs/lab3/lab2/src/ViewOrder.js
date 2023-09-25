import { useOutletContext, Outlet } from 'react-router-dom';
import React from 'react';


export default function ViewOrder() {

    const props = useOutletContext();


    return (
    <>
    <Outlet context={props} />

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
      </div>
    </>
    );
  };