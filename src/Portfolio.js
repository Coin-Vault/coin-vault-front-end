import React, { Component } from 'react';
import jwt_decode from "jwt-decode";

export class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: [],
        }
    }

    refreshList() {
        console.log("Getting the portfolio");

        var jwtJson = jwt_decode(localStorage.getItem("jwt-coinvault"));

        fetch(process.env.REACT_APP_API_URL_COIN_VAULT_PORTFOLIO + jwtJson.sub, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("jwt-coinvault")
            }
          })
            .then(response => response.json())
            .then(data => { 
                console.log(data)
                this.setState({ portfolio: data });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            portfolio,
        } = this.state;

        return (
            <div>
                <table className="table table-striped" id='portfolio'>
                    <thead>
                        <tr>
                            <th>Portfolio ID</th>
                            <th>Trade ID</th>
                            <th>Portfolio Name</th>
                            <th>Portfolio Amount</th>
                            <th>Portfolio Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map(p =>
                            <tr key={p.id}>
                                <td>#{p.id}</td>
                                <td>{p.tradeId}</td>
                                <td>{p.name}</td>
                                <td>{p.amount}</td>
                                <td>€{p.price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}