import React from "react";
import List from "./sections/List";
import Update from "./sections/Update";
import Add from "./sections/Add";

const Repayment = () =>{
    
    return(<>
             
             <div className="p-2">
                  <h1 className="font-bold">Repayment</h1>

                  <div className="grid grid-cols-3">
                    
                      <div className="col-span-1 py-2 px-1"><List/></div>
                      
                      <div className="col-span-2 py-2 px-1">

                          <div className="grid grid-cols-2">
                            <div className="col-span-1"><Update/></div>
                            <div className="col-span-1 px-2"><Add/></div>
                          </div>

                      </div>

                  </div>
                
             </div>
           </>);   
};

export {Repayment};