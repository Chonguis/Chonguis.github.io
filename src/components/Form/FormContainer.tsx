import React, { Component, ChangeEvent, FormEvent } from 'react';
import './FormContainer.css';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { allCountries, statesArray } from './countries';

const inputsData = [
  {id: 'country', label: 'Country'},
  {id: 'state', label: 'State'},
];

interface State {
  country: string;
  state: string;
  [key: string]: string;
}

interface Props {
  onSubmitForm: (e: FormEvent<HTMLFormElement>, filterState: {country: string; state: string;}) => void;
  submitted: boolean;
}

class Form extends Component<Props, State> {
  constructor(props: any){
    super(props);

    this.state = {
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

  onChangeSelect = (event: ChangeEvent<{}>, value:string |  null, id: string):void => {
    if (value) {
      if (id === "country") {
        this.setState({
          ...this.state,
          [id]: value,
          state: "",
        });
      } else {
        this.setState({
          ...this.state,
          [id]: value,
        });
      }
    }
  }

  getOptions = (id: string): string[] => {
    if (id === "country") {
      if (allCountries){
        return allCountries;
      } else {
        return [""];
      } 
    }
    else if (id === "state") {
      if (this.state.country === "United States of America"){
        if (statesArray){
          return statesArray;
        } else {
          return [""];
        }
      } else {
        return [""];
      }
    } else {
      return [""];
    }
  }

  render() {

    let inputsHTML: JSX.Element[] = [];
    
    inputsData.forEach(data => {
      if (data.id === "state" && this.state.country !== "United States of America") return;
      else {
        inputsHTML.push(
          <div className="autocomplete">
            <Autocomplete
              id="combo-box-demo"
              options={this.getOptions(data.id)}
              onChange={(event: ChangeEvent<{}>, value: string | null) => this.onChangeSelect(event, value, data.id)}
              // getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label={data.label} variant="outlined" />}
              value={this.state[data.id]}
              disabled={this.getOptions(data.id)[0] === ""}
            />
          </div>)
      }
    })

      return (
          <div className={`container ${!this.props.submitted && "defaultPosition"}`}>
              <form className={"form"} onSubmit={(e) => this.props.onSubmitForm(e, this.state)}>
                {inputsHTML}
                <button type="submit" className="submit">Submit</button>
              </form>
          </div>
      );
  }
}

export default Form;
