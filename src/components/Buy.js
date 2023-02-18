import React from 'react'
import { ethers } from "ethers"
const Buy = ({ state }) => {

    const buyCoffee = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        console.log(name, message, contract);

        const amount = { value: ethers.utils.parseEther("0.0001") };

        const transaction = await contract.buyCoffee(name, message, amount);
        await transaction.wait();
        console.log("Transaction is done");
    };

    return (
        <>
            <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
                <form onSubmit={buyCoffee}>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input type="text"
                            className="form-control" id="name" placeholder="Enter your Name"></input>
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Message</label>
                        <input type="text"
                            className='form-control' id="message" placeholder="Enter your Message"></input>
                    </div>
                    <button type="submit"
                        className="btn btn-primary"
                        disabled={!state.contract}>Pay
                    </button>
                </form>
            </div>
        </>
    )
}

export default Buy;