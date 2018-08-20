import React from 'react'
import PropTypes from 'prop-types'


const TestView = ({ person }) => (
      <div>
        age: {person.age}
        <hr />
        retireage: {person.retireage}
      </div>
)

TestView.propTypes = {
  person: PropTypes.object.isRequired
}

export default TestView