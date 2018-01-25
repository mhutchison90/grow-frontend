import React, { Component } from 'react';
import './Results.css';
import axios from 'axios';

import SearchInfo from './SearchInfo'

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repOrSen: '',
            lastRole: '',
            lastState: '',
            blankInitialState: '',
            state: '',
            value: '',
            name: '',
            office: '',
            phone: '',
            link: '',
            allData: [],
            searched: false
        }
        this.search = this.search.bind(this)
        this.reset = this.reset.bind(this)
        this.changeHandlerRepOrSen = this.changeHandlerRepOrSen.bind(this)
        this.handleValueRepOrSen = this.handleValueRepOrSen.bind(this)
        this.changeHandlerState = this.changeHandlerState.bind(this)
        this.handleValueState = this.handleValueState.bind(this)
    }
    search() {
        const { repOrSen } = this.state
        axios.get(`/${repOrSen === 'Representative' ? 'representatives' : 'senators'}/${this.state.state}`)
            .then(res => {
                this.setState({
                    allData: res.data.results,
                    lastRole: this.state.repOrSen,
                    lastState: this.state.state,
                    searched: true
                })
            })
    }
    reset() {
        if (this.state.searched === true) {
            if (this.state.lastRole !== this.state.repOrSen) {
                this.setState({
                    name: '',
                    phone: '',
                    office: '',
                    district: '',
                    link: '',
                    allData: [],
                    searched: false
                })
            } else if (this.state.lastState !== this.state.state) {
                this.setState({
                    name: '',
                    phone: '',
                    office: '',
                    district: '',
                    link: '',
                    allData: [],
                    searched: false
                })
            }
        }

    }
    selectPerson(i) {
        this.setState({
            name: this.state.allData[i].name,
            phone: this.state.allData[i].phone,
            office: this.state.allData[i].office,
            district: this.state.allData[i].district,
            link: this.state.allData[i].link
        })
    }
    changeHandlerRepOrSen(e) {
        this.setState({
            repOrSen: e
        })
    }
    handleValueRepOrSen(repOrSen) {
        this.setState({
            repOrSen: repOrSen
        })
    }
    changeHandlerState(e) {
        this.setState({
            state: e
        })
    }
    handleValueState(state) {
        this.setState({
            state: state
        })
    }
    render() {
        this.reset()
        return (
            <div className="Results">
                <div className='header'>
                    <h1>Who's My Representative?</h1>
                    <SearchInfo
                        changeHandlerRepOrSen={this.changeHandlerRepOrSen}
                        handleValueRepOrSen={this.handleValueRepOrSen}
                        repOrSen={this.state.repOrSen}

                        changeHandlerState={this.changeHandlerState}
                        handleValueState={this.handleValueState}
                        state={this.state.state}
                    />
                    <button id='search-button' onClick={this.search} className={this.state.state ? (this.state.repOrSen ? null : 'HIDDEN') : 'HIDDEN'} > Search! </button>
                    {/* <button id='search-button' > conditional </button> */}
                    {/* className='HIDDEN' */}
                </div>
                <div className="results">
                    <div className='list'>
                        <h1>List / {this.state.repOrSen}</h1>
                        <div id='list-header-container' >
                            <div id='list-header'> Name </div>
                            <div id='list-header'> Party </div>
                        </div>
                        <div className='list-results-container'>
                            {this.state.state ? (this.state.repOrSen ?
                                (this.state.allData !== undefined ? this.state.allData.map((person, i) => {
                                    return (
                                        <div className='people-list-map' key={i} onClick={_ => { this.selectPerson(i) }} >
                                            <div className='person'>
                                                <div id='one'>{person.name}</div>
                                                <div>{person.party === 'Republican' ? 'R' : person.party === 'Democrat' ? 'D' : 'I'}</div>
                                            </div>
                                        </div>
                                    )
                                }) : `${this.state.state} doesn't have any ${this.state.repOrSen}s`)
                                : null) : null}
                        </div>
                    </div>
                    <div className='info'>
                        <h1>Info</h1>
                        <div className='info-boxes'> {!this.state.name ? 'Name' : this.state.name}  </div>
                        <div className='info-boxes'> {!this.state.district ? 'District' : this.state.district} </div>
                        <div className='info-boxes'> {!this.state.phone ? 'Phone' : this.state.phone} </div>
                        <div className={this.state.state ? (this.state.repOrSen ? 'info-boxes address' : 'info-boxes ') : 'info-boxes '} > {!this.state.office ? 'Office' : this.state.office} </div>
                        <div>{!this.state.link ? null : <a href={this.state.link} target="_blank" > View this {this.state.repOrSen}'s website </a>}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Results;
