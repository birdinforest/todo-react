import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'

/**
 * Todo entry.
 * @param {string} task
 * @param {number} id
 * @param {boolean} complete
 */
class Todo extends React.Component {
  render () {
    return (
      <Card style={{width: '18rem'}}
            onClick={(event) => this.props.toggleComplete(this.props.id)}>
        <Card.Body>
          <Card.Title>{this.props.content}</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

Todo.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool,
}
Todo.defaultProps = {
  completed: false
}

export default Todo
