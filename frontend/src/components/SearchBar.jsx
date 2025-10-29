import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from '@heroui/react'

function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      setQuery('')
    }
  }

  return (
    <Form
      className="flex w-full max-w-xs flex-row gap-2"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-xs"
      />
      <Button type="submit" radius="full" color="primary" variant="light">
        Go
      </Button>
    </Form>
  )
}

export default SearchBar
