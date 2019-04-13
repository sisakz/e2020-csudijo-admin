import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import NumberFormat  from 'react-number-format'
import sqlTasks from './sqlTasks'
import ResultRow from './ResultRow'

class App extends Component {
  
  state = {
    lekerdezes: [],
    forgalom: "",
    etelNev: "",
    stat: []
  }
    
  componentDidMount() {
    const gets = sqlTasks.forEach(task => {
      if (task.adminPage) {
        axios.get(`http://localhost:8000/api/lekerdezes/`+task.id)
        .then(res => {
          console.log(task.id)
          const stat = [...this.state.stat, {id: task.id, description: task.description, data: res.data}]
          this.setState({stat})
        })
        .catch(err => {
          const stat = [...this.state.stat, {id: task.id, description: task.description, data: [{error: "Hiba: A lekérdezés nem hajtható végre!"}]}]
          this.setState({stat})
        })
      }
    })
  }
  
  render() {
    return (
      <div className="App">
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Csudijó Étterem - Adminisztrációs oldal</h1>
            </Col>
          </Row> 
          {
            this.state.stat.map((stat, key) => {
              return (
                <ResultRow  
                  title={stat.id + ". " + stat.description} 
                  field={Object.keys(stat.data[0])[0]}
                  value={stat.data[0][Object.keys(stat.data[0])[0]]}
                  data={stat.data}
                  key={key}
                />
               
              )
            })
          }  
        </Container>
      </div>
    );
  }
}

export default App
