import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'

const TodoForm = props => {
  return (
    <Form.Group>
      <Form.Control as="textarea"
                    name='todo'
                    value={props.value}
                    type='text'
                    onChange={props.inputChangeHandler}
                    placeholder='enter a task'
      />
      <ButtonToolbar>
        <Button variant="primary" size="sm" onClick={props.addTask}>
          Add a Task
        </Button>
      </ButtonToolbar>
    </Form.Group>
  )
}

export default TodoForm
