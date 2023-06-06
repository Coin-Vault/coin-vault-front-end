import React, { Component } from 'react';
import jwt_decode from "jwt-decode";

export class Trades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: [],
            AmountTrade: 0
        }
    }

    refreshList() {
        console.log("Getting all trades");

        var jwtJson = jwt_decode(localStorage.getItem("jwt-coinvault"));

        fetch(process.env.REACT_APP_API_URL_COIN_VAULT_TRADE + jwtJson.sub, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("jwt-coinvault")
            }
          })
            .then(response => response.json())
            .then(data => { 
                console.log(data)
                this.setState({ trades: data });
            })
            .catch(err => console.error(err));
    }

    createTrade() {
        var jwtJson = jwt_decode(localStorage.getItem("jwt-coinvault"));

        fetch(process.env.REACT_APP_API_URL_COIN_VAULT_TRADE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: "BITCOIN",
                UserId: jwtJson.sub,
                Amount: this.state.AmountTrade,
            })
        })
          
        this.refreshList();
    }

    setAmountTrade = (e) => {
        this.setState({ AmountTrade: e.target.value });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            trades
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-middle mt-5"
                    data-bs-toggle="modal"
                    data-bs-target="#createModal">
                    Add Trade
                </button>

                <table className="table table-striped" id='trades'>
                    <thead>
                        <tr>
                            <th>Trade ID</th>
                            <th>Trade Name</th>
                            <th>Trade Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map(t =>
                            <tr key={t.id}>
                                <td>#{t.id}</td>
                                <td>{t.name}</td>
                                <td>{t.amount}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="createModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Trade</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" style={{width: "85px"}}>Crypto</span>
                                    <input type="text" className="form-control" value={"Bitcoin (BTC)"} readOnly/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" style={{width: "85px"}}>Amount</span>
                                    <input type="number" className="form-control" onChange={this.setAmountTrade} />
                                </div>
                                <button type="button" className="btn btn-primary float-start" onClick={() => this.createTrade()}>Create</button>                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}