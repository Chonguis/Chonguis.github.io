import React from 'react'

interface Props {
    formState: {};
}

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/johns_hopkins_latest_usa_statistic_by_state.php?state=puerto%20rico", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "4781cadd8fmsh5bf0d6baa331ad3p1ab429jsnb80237845be3"
    }
})
.then(res => {
    res.json().then(data => {
        console.log(data);
    })
})
.catch(err => {
    console.log(err);
});

const SubmittedFormPanel: React.FC<Props> = ({ formState }) => {
    return (
        <div>
            {JSON.stringify(formState)}
        </div>
    )
}

export default SubmittedFormPanel;