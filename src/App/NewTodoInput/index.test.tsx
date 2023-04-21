import { fireEvent } from '@testing-library/react'
import React from 'react'

import { TestRenderer } from '../../testUtil'

import NewTodoTextInput from './index'

test('should be render <TodoTextInput/>', () => {
  const screen = TestRenderer(<NewTodoTextInput />)
  const input = screen.getByTestId('new-todo-input-text') as HTMLInputElement

  // Header big text
  expect(screen.getByText('todos')).toBeInTheDocument()

  // Placeholder
  expect(
    screen.getByPlaceholderText('What needs to be done?')
  ).toBeInTheDocument()

  // type 'tidying my room'
  fireEvent.change(input, {
    target: { value: 'tidying my room' },
  })

  // assert input tag
  expect(input.value).toBe('tidying my room')

  // submit
  fireEvent.keyPress(input, {
    charCode: 13,
    code: 13,
    key: 'Enter', // I had issue that doesn't trigger keyPress event relevant charCode. https://github.com/testing-library/react-testing-library/issues/269
  })

  // text cleard
  expect(input.value).toBe('')
})
