'use client'

import { useState } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import Header from '@/components/Header'
import { Todo } from '@/types/todo'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [nextId, setNextId] = useState(1)

  const addTodo = (text: string) => {
    if (text.trim() === '') return
    
    const newTodo: Todo = {
      id: nextId,
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    }
    
    setTodos(prev => [...prev, newTodo])
    setNextId(prev => prev + 1)
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header 
          totalCount={totalCount} 
          completedCount={completedCount} 
        />
        
        <div className="space-y-6">
          <TodoForm onAddTodo={addTodo} />
          <TodoList 
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>
        
        {todos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📝</div>
            <p className="text-gray-500 text-lg">No todos yet</p>
            <p className="text-gray-400 text-sm">Add your first todo above to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
