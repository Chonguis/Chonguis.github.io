import React from 'react'
import './DisplayResults.css';
import FetchStateInterface from '../../interfaces/FetchStateInterface.interface';
import Result from './Result';

interface Props {
    fetchState: FetchStateInterface;
}

const DisplayResults:React.FC<Props> = (props) => {
    return (
        <div>
          {props.fetchState.activeSearch === "state" && <table>
              <tbody>
                  <tr>
                      <td>State Name</td>
                      <td>{props.fetchState.state_name}</td>
                  </tr>
                  <tr>
                      <td>Cases Number</td>
                      <td>{props.fetchState.cases_number}</td>
                  </tr>
                  <tr>
                      <td>Cases Record Date</td>
                      <td>{props.fetchState.cases_record_date}</td>
                  </tr>
                  <tr>
                      <td>Death Cases</td>
                      <td>{props.fetchState.death_cases}</td>
                  </tr>
                  <tr>
                      <td>Death Record Date</td>
                      <td>{props.fetchState.death_record_date}</td>
                  </tr>
              </tbody>
          </table>}

          {props.fetchState.activeSearch === "country" && 
            <div className="displayResultsContainer">
              <h1>{props.fetchState.country_name}</h1>
              <small>{props.fetchState.record_date}</small>
              <div className="resultsContainer">
                <div className="groupResults">
                  <Result data={props.fetchState.total_cases} label="Total Cases" />
                  <Result data={props.fetchState.active_cases} label="Active Cases" />
                </div>
                <div className="groupResults">
                  <Result data={props.fetchState.total_deaths} label="Total Deaths" />
                  <Result data={props.fetchState.total_recovered} label="Total Recovered" />
                </div>
              </div>
            </div>
          }

        </div>
    )
}

export default DisplayResults;