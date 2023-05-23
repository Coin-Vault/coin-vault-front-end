import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: [],
        }
    }

    refreshList() {
        console.log("Getting the portfolio");

        fetch(variables.API_URL_COIN_VAULT + 'portfolios/22222', {
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Portfolio ID</th>
                            <th>Portfolio Name</th>
                            <th>Portfolio Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map(p =>
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.amount}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}