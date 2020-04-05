import React from 'react'
import './SubmittedFormPanel.css';

interface Props {
    formState: {
        country: string;
        state: string;
    } | null;
}

interface State {
    activeSearch: string;

    state_name: string | undefined;
    cases_number: number | undefined;
    cases_record_date: string | undefined;
    death_cases: number | undefined;
    death_record_date: string | undefined;

    country_name: string | undefined;
    total_cases: number | undefined;
    new_cases: number | undefined;
    active_cases: number | undefined;
    total_deaths: number | undefined;
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
      activeSearch: "",

      state_name: undefined,
      cases_number: undefined,
      cases_record_date: undefined,
      death_cases: undefined,
      death_record_date: undefined,

      country_name: undefined,
      total_cases: undefined,
      new_cases: undefined,
      active_cases: undefined,
      total_deaths: undefined,
      new_deaths: undefined,
      total_recovered: undefined,
      total_cases_per1m: undefined,
      record_date: undefined,
    };
  }

  componentWillReceiveProps(nextProps: Props){
    if(nextProps.formState){
      if (JSON.stringify(this.props) !== JSON.stringify(nextProps.formState)) {
        const { state, country } = nextProps.formState;
        if (nextProps.formState.state) {
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
                              activeSearch: "state",

                              state_name: data.usa_cases_by_state[0].state_name,
                              cases_number: data.usa_cases_by_state[0].cases_number,
                              cases_record_date: data.usa_cases_by_state[0].record_date,
                              death_cases: data.usa_deaths[0].death_cases,
                              death_record_date: data.usa_deaths[0].record_date,
                          })
                      })
                  })
                  .catch(err => {
                      console.log(err);
                  });
        } else {
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
                        let latest_stats = data.latest_stat_by_country[0];
                        this.setState({
                            activeSearch: "country",

                            total_cases: latest_stats.total_cases,
                            new_cases: latest_stats.new_cases,
                            active_cases: latest_stats.active_cases,
                            total_deaths: latest_stats.total_deaths,
                            new_deaths: latest_stats.new_deaths,
                            record_date: latest_stats.record_date,
                            total_cases_per1m: latest_stats.total_cases_per1m,
                            total_recovered: latest_stats.total_recovered,
                            country_name: latest_stats.country_name,
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
      }
    }
  }

  render(){

      return (
          <div className="tableContainer">
              {this.state.activeSearch === "state" && <table>
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
              </table>}
              {this.state.activeSearch === "country" && <table>
                  <tbody>
                      <tr>
                          <td>Country Name</td>
                          <td>{this.state.country_name}</td>
                      </tr>
                      <tr>
                          <td>Total Cases</td>
                          <td>{this.state.total_cases}</td>
                      </tr>
                      <tr>
                          <td>New Cases</td>
                          <td>{this.state.new_cases}</td>
                      </tr>
                      <tr>
                          <td>Active Cases</td>
                          <td>{this.state.active_cases}</td>
                      </tr>
                      <tr>
                          <td>Total Death</td>
                          <td>{this.state.total_deaths}</td>
                      </tr>
                      <tr>
                          <td>New Deaths</td>
                          <td>{this.state.new_deaths}</td>
                      </tr>
                      <tr>
                          <td>Total Recovered</td>
                          <td>{this.state.total_recovered}</td>
                      </tr>
                      <tr>
                          <td>Total Cases Per 1m</td>
                          <td>{this.state.total_cases_per1m}</td>
                      </tr>
                      <tr>
                          <td>Record Date</td>
                          <td>{this.state.record_date}</td>
                      </tr>
                  </tbody>
              </table>}
          </div>
      )
  }
}


export default SubmittedFormPanel;