import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Trades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: [],
            DepartmentName: "",
        }
    }

    refreshList() {
        console.log("Getting all trades");

        fetch(variables.API_URL_COIN_VAULT + 'trades', {
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
        fetch(variables.API_URL + 'department/adddepartment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentName: this.state.DepartmentName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            trades,
            modalTitle,
            DepartmentId,
            DepartmentName
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-middle mt-5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Add Trade
                </button>

                <table className="table table-striped">
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
                                <td>{t.id}</td>
                                <td>{t.name}</td>
                                <td>{t.amount}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
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
                                    <input type="number" className="form-control" onChange={this.changeDepartmentName} />
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