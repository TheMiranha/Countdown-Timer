import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            name: '',
            date: '',
            error: '',
        }
        this.att();
    }

 getNiceTime = (fromDate, toDate, levels, prefix) => {
        var lang = {
                "date.past": "{0} atrás",
                "date.future": " Faltam {0}",
                "date.now": "agora",
                "date.year": "{0} ano",
                "date.years": "{0} anos",
                "date.years.prefixed": "{0} anos",
                "date.month": "{0} mes",
                "date.months": "{0} meses",
                "date.months.prefixed": "{0} meses",
                "date.day": "{0} dia",
                "date.days": "{0} dias",
                "date.days.prefixed": "{0} dias",
                "date.hour": "{0} hora",
                "date.hours": "{0} horas",
                "date.hours.prefixed": "{0} horas",
                "date.minute": "{0} minuto",
                "date.minutes": "{0} minutos",
                "date.minutes.prefixed": "{0} minutos",
                "date.second": "{0} segundo",
                "date.seconds": "{0} segundos",
                "date.seconds.prefixed": "{0} segundos",
            },
            langFn = function(id,params){
                var returnValue = lang[id] || "";
                if(params){
                    for(var i=0;i<params.length;i++){
                        returnValue = returnValue.replace("{"+i+"}",params[i]);
                    }
                }
                return returnValue;
            },
            toDate = toDate ? toDate : new Date(),
            diff = fromDate - toDate,
            past = diff < 0 ? true : false,
            diff = diff < 0 ? diff * -1 : diff,
            date = new Date(new Date(1970,0,1,0).getTime()+diff),
            returnString = '',
            count = 0,
            years = (date.getFullYear() - 1970);
        if(years > 0){
            var langSingle = "date.year" + (prefix ? "" : ""),
                langMultiple = "date.years" + (prefix ? ".prefixed" : "");
            returnString += (count > 0 ?  ', ' : '') + (years > 1 ? langFn(langMultiple,[years]) : langFn(langSingle,[years]));
            count ++;
        }
        var months = date.getMonth();
        if(count < levels && months > 0){
            var langSingle = "date.month" + (prefix ? "" : ""),
                langMultiple = "date.months" + (prefix ? ".prefixed" : "");
            returnString += (count > 0 ?  ', ' : '') + (months > 1 ? langFn(langMultiple,[months]) : langFn(langSingle,[months]));
            count ++;
        } else {
            if(count > 0)
                count = 99;
        }
        var days = date.getDate() - 1;
        if(count < levels && days > 0){
            var langSingle = "date.day" + (prefix ? "" : ""),
                langMultiple = "date.days" + (prefix ? ".prefixed" : "");
            returnString += (count > 0 ?  ', ' : '') + (days > 1 ? langFn(langMultiple,[days]) : langFn(langSingle,[days]));
            count ++;
        } else {
            if(count > 0)
                count = 99;
        }
        var hours = date.getHours();
        if(count < levels && hours > 0){
            var langSingle = "date.hour" + (prefix ? "" : ""),
                langMultiple = "date.hours" + (prefix ? ".prefixed" : "");
            returnString += (count > 0 ?  ', ' : '') + (hours > 1 ? langFn(langMultiple,[hours]) : langFn(langSingle,[hours]));
            count ++;
        } else {
            if(count > 0)
                count = 99;
        }
        var minutes = date.getMinutes();
        if(count < levels && minutes > 0){
            var langSingle = "date.minute" + (prefix ? "" : ""),
                langMultiple = "date.minutes" + (prefix ? ".prefixed" : "");
            returnString += (count > 0 ?  ', ' : '') + (minutes > 1 ? langFn(langMultiple,[minutes]) : langFn(langSingle,[minutes]));
            count ++;
        } else {
            if(count > 0)
                count = 99;
        }
        var seconds = date.getSeconds();
        if(count < levels && seconds > 0){
            var langSingle = "date.second" + (prefix ? "" : ""),
                langMultiple = "date.seconds" + (prefix ? ".prefixed" : "");
            returnString += (count > 0 ?  ', ' : '') + (seconds > 1 ? langFn(langMultiple,[seconds]) : langFn(langSingle,[seconds]));
            count ++;
        } else {
            if(count > 0)
                count = 99;
        }
        if(prefix){
            if(returnString == ""){
                returnString = langFn("date.now");
            } else if(past)
                returnString = langFn("date.past",[returnString]);
            else
                returnString = langFn("date.future",[returnString]);
        }
        return returnString;
    }

    getDiff = (d2)  => {
        var d1 = new Date();
        d2 = new Date(d2);
        return this.getNiceTime(d2, d1, 4, true);;
    }

    att = () => {
        setInterval(() => {
            var events = this.state.events;
            events.forEach((a) => a.updater = a.updater === 1 ? 0 : 1);
            this.setState({events});
        }, 1000)
    }

    addEvent = () => {
        var name = this.state.name;
        var date = this.state.date;
        if (name.trim().length > 0 && date.trim().length > 0)
        {
            date = date.split('-');
            date = date.map((a, b) => b === 1 ? parseInt(a) : a);
            this.setState({error: ''});
            date = new Date(date[0] + '-' + date[1] + '-' + date[2]);
            var events = this.state.events;
            events.push({name, date});
            this.setState({name: '', date: '', updater: 0});
        } else {
            this.setState({error: 'Preencha todos os campos!'})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="title">Contagem Regressiva</div>
                <div className="container_create">
                    <div className="title">Criação de Eventos</div>
                        Nome: <input value={this.state.name} onChange={a => this.setState({name: a.target.value})} placeholder="Digite o nome do evento" type="text"/>
                        Data: <input value={this.state.date} onChange={a => this.setState({date: a.target.value})} placeholder="Dia/Mês/Ano" type="date"/>
                        <div className="error">{this.state.error}</div>
                        <button onClick={this.addEvent}>Criar Evento</button>
                </div>
                {this.state.events.map((a, b) => <div key={b} className="event">
                        {a.name} ( {a.date.getDate() + '/' + (a.date.getMonth()+1) + '/' + a.date.getFullYear()} ): 
                        {this.getDiff(a.date)}
                    </div>)}
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));