import React, { Component, ChangeEvent, FormEvent } from 'react';
import './FormContainer.css';
import { countriesByContinent, statesArray } from './countries';

const inputsData = [
  {id: 'continent', label: 'Continent'},
  {id: 'country', label: 'Country'},
  {id: 'state', label: 'State'},
];

interface State {
  continent: string;
  country: string;
  state: string;
  [key: string]: string;
}

interface Props {
  onSubmitForm: (e: FormEvent<HTMLFormElement>, filterState: {country: string; state: string; continent: string;}) => void;
}

const selects: string[] = ['continent', 'country', 'state'];

class Form extends Component<Props, State> {
  constructor(props: any){
    super(props);

    this.state = {
      continent: '',
      country: '',
      state: '',
    }
  }

  onChangeInput = (event: ChangeEvent<HTMLInputElement>, id: string):void => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  }

  onChangeSelect = (event: ChangeEvent<HTMLSelectElement>, id: string):void => {
    if (event.target.value) {
      if (id === "continent") {
        this.setState({
          ...this.state,
          [id]: event.target.value,
          country: "",
          state: "",
        });
      } else if (id === "country") {
        this.setState({
          ...this.state,
          [id]: event.target.value,
          state: "",
        });
      } else {
        this.setState({
          ...this.state,
          [id]: event.target.value,
        });
      }
    }
  }

  getOptions = (id: string): JSX.Element[] | undefined => {
    if (id === "continent"){
      let options: JSX.Element[] = [<option value="" disabled>Continent</option>];
      let continents: string[] = Object.keys(countriesByContinent);
      continents.map((continent, i) => options.push(<option key={i + 1} value={continent}>{continent}</option>));
      options.push(<option value="other">Other</option>);
      if (options) return options;
    }
    if (id === "country") {
      if (this.state.continent && this.state.continent !== "other") {
        let options: JSX.Element[] = [<option value="">Country</option>];
        let countries: string[] = countriesByContinent[this.state.continent];
        countries.map((country, i) => options.push(<option key={i + 1} value={country}>{country}</option>));
        options.push(<option value="other">Other</option>);
        if (options) return options;
      } else {
        let options: JSX.Element[] = [<option value="" disabled>Country</option>];
        if (options) return options;
      }
    }
    if (id === "state") {
      if (this.state.country === "United States of America" && this.state.continent && this.state.continent !== "other"){
        let options: JSX.Element[] = [<option value="">State</option>];
        let states: string[] = statesArray;
        states.map((state, i) => options.push(<option key={i + 1} value={state}>{state}</option>));
        options.push(<option value="other">Other</option>);
        if (options) return options;
      } else {
        let options: JSX.Element[] = [<option value="" disabled>State</option>];
        if (options) return options;
      }
    }
  }

  render() {

    let inputsHTML: JSX.Element[] = [];
    
    inputsData.forEach(data => {
        inputsHTML.push(
          <div>
            <label htmlFor={data.id}>{data.label}</label>
            <br />
            <select id={data.id} onChange={(e) => this.onChangeSelect(e, data.id)} value={this.state[data.id]}>
              {this.getOptions(data.id)}
            </select>
          </div>)
      })

      return (
          <div className="container">
              <form className={"form"} onSubmit={(e) => this.props.onSubmitForm(e, this.state)}>
                {inputsHTML}
                <button type="submit">Submit</button>
              </form>
          </div>
      );
  }
}

export default Form;
