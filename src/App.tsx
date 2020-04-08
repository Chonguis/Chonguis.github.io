import React, { FormEvent } from 'react';
import './App.css';
import Form from './components/Form/FormContainer';
import SubmittedFormPanel from './components/SubmittedFormPanel/SubmittedFormPanel';

interface FormState {
  country: string;
  state: string;
}

interface State {
  submitted: boolean;
  formState: FormState;
}

class App extends React.Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
      submitted: false,
      formState: {
        country: '',
        state: '',      
      },
    }
  }

  onSubmitForm = (e: FormEvent<HTMLFormElement>, formState: {country: string; state: string;}) => {
    e.preventDefault();
    console.log('formstate', formState)
    this.setState({
      submitted: true,
      formState: formState,
    });
    console.log(formState, 'formState');
  } 
  render(){
    let other = false;
    if(this.state.formState.state === "other" || this.state.formState.country === "other"){
      other = true;
    }
    return (
      <div className="App">
        <header className="App-header">
            Coronavirus World Tracker
        </header>
        <div className="App-body">
          {Object.keys(this.state.formState) && <SubmittedFormPanel formState={!other ? this.state.formState : null} />}
          <Form onSubmitForm={this.onSubmitForm} submitted={this.state.submitted} />
        </div>
      </div>
    );
  }
}

export default App;
