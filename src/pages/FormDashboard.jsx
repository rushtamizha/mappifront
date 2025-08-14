import React, { useEffect, useState } from 'react';
import { getMyForms, createForm, deleteForm } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const FormDashboard = () => {
  const [forms, setForms] = useState([]);
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([{ label: '', type: 'text' }]);
  const navigate = useNavigate();
    const [loader,setLoader] = useState(false)

  const fetchForms = async () => {
    try {
      setLoader(true)
      const res = await getMyForms();
      setForms(res.data || []);
    } catch (error) {
      toast.error('Error fetching forms');
    }finally{
      setLoader(false)
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { label: '', type: 'text' }]);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleCreateForm = async () => {
    if (!title.trim() || fields.some((f) => !f.label)) return;
    try {
      await createForm({ title, fields });
      toast.success('Form Created Successfully')
      setTitle('');
      setFields([{ label: '', type: 'text' }]);
      fetchForms();
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteForm = async (id) => {
    try {
      await deleteForm(id);
      fetchForms();
      toast.success('Form Deleted Successfully')
    } catch (error) {
      toast.error('Delete failed');
      console.log(error)
    }
  };

  return (
    loader ? (
    <div className="loader h-full w-full"> 
      <div className='flex justify-center items-center h-full fixed w-full '>
        <div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-100 animate-spin  fill-emerald-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    </div>
      </div>
    </div> ) : ( <>
    <div className="max-w-2xl mx-auto  font-stretch-105% p-4 bg-white">
      <div className="big-text font-medium mb-2 flex item-center gap-2 text-[#0e5b37]"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0e5b37"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z"/></svg>
        Create New Form</div>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 px-4 py-3 rounded w-full mb-2 border-gray-100  text-gray-700 focus:outline-emerald-700 "
      />

      <div className="space-y-2 mb-1">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Field label"
              value={field.label}
              onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
              className="border-2 px-4 py-2 rounded w-full border-gray-100 text-gray-700 focus:outline-emerald-700"
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
              className="border-2 flex justify-center items-center px-3 text-center py-2.5 rounded w-1/2 border-gray-100 text-emerald-600 focus:outline-emerald-700 "
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="file">File</option>
              <option value="textarea">Textarea</option>
            </select>
            <button
              onClick={() => removeField(index)}
              className=" border-gray-200 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C41A1A"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
          </div>
        ))}
      </div>
      <div className='flex gap-3 py-2'>
        <button
        onClick={addField}
        className="bg-blue-500 text-white flex  rounded-sm hover:bg-blue-700 w-full items-center justify-center gap-2 py-3 px-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#fff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        Add field
      </button>
        <button disabled={!title}
        onClick={handleCreateForm}
        className="bg-emerald-700 py-3 px-2 w-full text-white flex rounded-sm hover:bg-emerald-800 items-center justify-center gap-2 disabled:opacity-50 "
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffff"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        Create Form
      </button>
      </div>

      <h2 className="medium-text font-medium my-4 flex gap-2 text-[#29559d]">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#29559d"><path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280v-160h160v-280H360Zm220 220Z"/></svg>
         My Forms</h2>
      {forms.length === 0 ? (
        <p className="text-gray-600">No forms created yet.</p>
      ) : (
        <ul className="space-y-2">
          {forms.map((form) => (
            <li
              key={form._id}
              className=" border-gray-100 border-dotted border-b-2 pb-3 flex justify-between items-center "
            >
              <div>
                <p className="font-medium medium-text text-gray-700">{form.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(`/responses/${form._id}`)}
                  className=" text-[#DEA20B] rounded flex items-center justify-center gap-1 "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#DEA20B"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
                  Responses
                </button>
                <button
                  onClick={() => handleDeleteForm(form._id)}
                  className=" text-red-700 rounded flex items-center justify-center gap-1 "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#BD0000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div> </>)
  );
};

export default FormDashboard;

