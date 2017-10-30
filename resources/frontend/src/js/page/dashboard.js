import React from 'react';
import Layout from 'layout/pagelayout';
import LineChart from 'components/linechart';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    
    componentWillMount() {
        this.source = new EventSource("/events");
        this.source.addEventListener("open", (e) => {
            console.log("Connected!!")
        }, false);
        this.source.addEventListener("message", (e) => {
            this.setState(prevState => {
                if (e.data === "noop") return prevState;
                let newData = prevState.events.concat(e.data)
                return {
                    events: newData
                }
            });
        }, false);
    }

    renderEvents(events) {
        if (!events.length) {
            return (<li className="list-group-item">No message found.</li>)
        } else {
            return events.map((item, index) => {
                return (
                    <li className="list-group-item">{index+1}. {item}</li>
                )
            })
        }
    }

    render() {
        const events = this.state.events;
        return (
            <Layout>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col">
                                <h3>
                                    Server Sent Events (EventSource)
                                    <div className="float-right">
                                        <span className="badge badge-pill badge-danger">&nbsp;</span>
                                    </div>
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <LineChart data={events} width={800} height={300}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="sse-message-list">
                                <ul className="list-group">
                                    {this.renderEvents(events)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>                
        );
    }
}

export default Dashboard;