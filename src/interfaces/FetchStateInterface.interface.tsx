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
};

export default State;