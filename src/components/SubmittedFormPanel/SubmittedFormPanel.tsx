import React from 'react'
import { render } from '@testing-library/react';

interface Props {
    formState: {
        continent: string;
        country: string;
        state: string;
    }
}

interface State {
    state_name: string | undefined;
    cases_number: number | undefined;
    cases_record_date: string | undefined;
    death_cases: number | undefined;
    death_record_date: string | undefined;

    total_cases: number | undefined;
    new_cases: number | undefined;
    active_cases: number | undefined;
    total_death: number | undefined;
    new_deaths: number | undefined;
    total_recovered: number | undefined;
    total_cases_per1m: number | undefined;
    record_date: string | undefined;
}

class SubmittedFormPanel extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
        // latest_stat_by_country[0].total_cases new_cases active_cases total_death new_deaths total_recovered total_cases_per1m record_date 
        this.state = {
            state_name: undefined,
            cases_number: undefined,
            cases_record_date: undefined,
            death_cases: undefined,
            death_record_date: undefined,

            total_cases: undefined,
            new_cases: undefined,
            active_cases: undefined,
            total_death: undefined,
            new_deaths: undefined,
            total_recovered: undefined,
            total_cases_per1m: undefined,
            record_date: undefined,
        };
    }

    render(){
        const { state, country } = this.props.formState;
        if (state) {
            fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/johns_hopkins_latest_usa_statistic_by_state.php?state=${state}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "4781cadd8fmsh5bf0d6baa331ad3p1ab429jsnb80237845be3"
                    }
                })
                .then(res => {
                    res.json().then(data => {
                        console.log(data);
                        this.setState({
                            state_name: data.usa_cases_by_state[0].state_name,
                            cases_number: data.usa_cases_by_state[0].cases_number,
                            cases_record_date: data.usa_cases_by_state[0].record_date,
                            death_cases: data.usa_deaths[0].death_cases,
                            death_record_date: data.usa_deaths[0].record,
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (country) {
            fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${country}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "4781cadd8fmsh5bf0d6baa331ad3p1ab429jsnb80237845be3"
                    }
                })
                .then(res => {
                    res.json().then(data => {
                        console.log(data);
                        // latest_stat_by_country[0].total_cases new_cases active_cases total_death new_deaths total_recovered total_cases_per1m record_date 
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
        return (
            <div>
                {JSON.stringify(this.props.formState)}
                <table>
                    <tbody>
                        <tr>
                            <td>State Name</td>
                            <td>{this.state.state_name}</td>
                        </tr>
                        <tr>
                            <td>Cases Number</td>
                            <td>{this.state.cases_number}</td>
                        </tr>
                        <tr>
                            <td>Cases Record Date</td>
                            <td>{this.state.cases_record_date}</td>
                        </tr>
                        <tr>
                            <td>Death Cases</td>
                            <td>{this.state.death_cases}</td>
                        </tr>
                        <tr>
                            <td>Death Record Date</td>
                            <td>{this.state.death_record_date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default SubmittedFormPanel;