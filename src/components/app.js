import React, { Component } from 'react';
import axios from 'axios'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            recentCampers: [],
            allTimeCampers: [],
            currentView: 'recentCampers'
        }
    }

    componentDidMount() {
        // make concurrent requests and set state to response
        axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
            .then(axios.spread(function(recentCampers, allTimeCampers) {
               this.setState({ recentCampers, allTimeCampers }) 
        }))
    }

    fetchRecentCampers() {
        return axios.get('https://swapi.dev/api/starships/')
    }

    fetchAllTimeCampers() {
        return axios.get('https://swapi.dev/api/species/')
    }

    handleView(currentView) {
        this.setState({ currentView })
    }

  render() {
    return (
        <div>
            <h2>{`Viewing Top ${this.state.currentView}`}</h2>
            <button 
                className="btn btn-primary"
                onClick={() => this.handleView('recentCampers')}>
                Recent
            </button>
            <button 
                className="btn btn-primary"
                onClick={() => this.handleView('allTimeCampers')}>
                All Time
            </button>
        </div>
    );
  }
}
