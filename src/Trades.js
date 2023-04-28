import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Trades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: [],
        }
    }

    refreshList() {
        console.log("Getting all trades");

        fetch(variables.API_URL_TRADE + 'trades')
            .then(response => response.json())
            .then(data => { 
                console.log(data)
                this.setState({ trades: data });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            trades,
        } = this.state;

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Trade ID</th>
                            <th>Trade Name</th>
                            <th>Trade Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map(trade =>
                            <tr key={trade.id}>
                                <td>{trade.id}</td>
                                <td>{trade.name}</td>
                                <td>{trade.amount}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}