import React from 'react'

const Loading = () => {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-50">
  <div class="relative w-12 h-12">
    <div class="absolute inset-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <div class="absolute inset-1 w-10 h-10 border-4 border-blue-300 border-b-transparent rounded-full animate-spin reverse"></div>
  </div>
</div>

  )
}

export default Loading