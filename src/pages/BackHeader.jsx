
import { useNavigate } from 'react-router-dom'
const BackHeader = () => {
    const navigate = useNavigate()
    const Backbtn = () =>{
        navigate(-1)
    }
  return (
    <div className='flex' >
        <div className='border p-2 rounded-4xl border-gray-400 ' onClick={Backbtn}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray-300"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </div>
    </div>
  )
}

export default BackHeader