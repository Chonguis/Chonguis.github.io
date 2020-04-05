import React from 'react'
import FetchStateInterface from '../../interfaces/FetchStateInterface.interface';

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
              {props.fetchState.activeSearch === "country" && <table>
                  <tbody>
                      <tr>
                          <td>Country Name</td>
                          <td>{props.fetchState.country_name}</td>
                      </tr>
                      <tr>
                          <td>Total Cases</td>
                          <td>{props.fetchState.total_cases}</td>
                      </tr>
                      <tr>
                          <td>New Cases</td>
                          <td>{props.fetchState.new_cases}</td>
                      </tr>
                      <tr>
                          <td>Active Cases</td>
                          <td>{props.fetchState.active_cases}</td>
                      </tr>
                      <tr>
                          <td>Total Death</td>
                          <td>{props.fetchState.total_deaths}</td>
                      </tr>
                      <tr>
                          <td>New Deaths</td>
                          <td>{props.fetchState.new_deaths}</td>
                      </tr>
                      <tr>
                          <td>Total Recovered</td>
                          <td>{props.fetchState.total_recovered}</td>
                      </tr>
                      <tr>
                          <td>Total Cases Per 1m</td>
                          <td>{props.fetchState.total_cases_per1m}</td>
                      </tr>
                      <tr>
                          <td>Record Date</td>
                          <td>{props.fetchState.record_date}</td>
                      </tr>
                  </tbody>
              </table>}
            
        </div>
    )
}

export default DisplayResults;