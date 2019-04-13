import React from 'react'
import { Row, Col } from 'reactstrap'

const ResultRow = props => {
  return (
    <Row className='m-1'>
      <Col xs='12' className='text-white bg-secondary p-2'>
        {props.title}
      </Col>
      <Col xs='12' className='bg-light p-2'>
        <ValueTable field={props.field} value={props.value} data={props.data} />
      </Col>
    </Row>
  )
}

const ValueTable = props => {
  const data = props.data
  const fields = Object.keys(data[0])
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          {fields.map((field, key) => (
            <th key={key}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {fields.map((field, key) => (
              <td key={key}>{data[index][field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ResultRow

// <NumberFormat value={props.value} displayType="text" thousandSeparator=" "></NumberFormat>{" Ft"}

/* field={Object.keys(stat.data[0])[0]}
value={stat.data[0][Object.keys(stat.data[0])[0]]}
data={stat.data}
key={key}
{data[0].map((value, key) =>
	<td>{value}</td>
)} */
