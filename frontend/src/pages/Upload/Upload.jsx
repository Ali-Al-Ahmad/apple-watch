import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Upload.css'

const Upload = () => {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!file) {
      toast.error('Please add a CSV file')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axiosInstance.post(
        '/metrics/uploadcsv',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response?.data?.success) {
        toast.success(response?.data?.message)
        navigate('/home')
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='upload-container'>
      <h2>Upload Health Metrics CSV File</h2>
      <form
        onSubmit={handleSubmit}
        className='upload-form'
      >
        <label className='file-label'>
          Choose File
          <input
            type='file'
            accept='.csv'
            onChange={handleFileChange}
            className='file-input'
          />
        </label>
        {file && <p className='file-name'>Selected: {file.name}</p>}
        <button
          type='submit'
          className='upload-button'
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default Upload
