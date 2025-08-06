'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'
import { formatDate } from '@/utils/dateUtils'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    // Add a small delay for better UX
    setTimeout(() => {
      onDelete(todo.id)
    }, 150)
  }

  const handleToggle = () => {
    onToggle(todo.id)
  }

  return (
    <div 
      className={`
        todo-item animate-slide-in
        ${todo.completed ? 'todo-completed' : ''}
        ${isDeleting ? 'opacity-50 scale-95' : ''}
        transition-all duration-200
      `}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="checkbox"
            aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          />
        </div>
        
        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          <p 
            className={`
              text-sm font-medium transition-all duration-200
              ${todo.completed 
                ? 'text-gray-500 text-strikethrough' 
                : 'text-gray-900'
              }
            `}
          >
            {todo.text}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDate(todo.createdAt)}
          </p>
        </div>
        
        {/* Delete Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-danger text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Delete "${todo.text}"`}
          >
            {isDeleting ? (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
