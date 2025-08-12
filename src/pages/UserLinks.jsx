
import { useEffect, useState } from 'react';
import { getUserLinks, updateLinkOrder, visibility, deleteLink, createLink, updateLink, getMyProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  DndContext,
  closestCenter,
  useSensor,
  TouchSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SocialLinks from './SocialLinks';
import toast from 'react-hot-toast';
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
import avatar from '../assets/icons/avatar.avif'
import verified from "../assets/icons/verify.png"
// ✅ Extract YouTube video ID
const getYouTubeVideoId = (url) => {
  try {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  } catch {
    toast.error("Can't find Youtube video" )
    return null;
  }
};

const SortableItem = ({ link, onEdit,onDelete, onToggleVisibility }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link._id });
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const videoId = getYouTubeVideoId(link.url);

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="mb-2  bg-white p-3 rounded-xl  flex justify-between items-center border-2 border-gray-100 relative touch-none"
    >
      <span {...listeners} {...attributes} className="cursor-grab pr-2 text text-gray-500" style={{ touchAction: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="18px" fill="#808080"><path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"/></svg>
      </span>

      <div className="w-full ">
        {videoId ? (
          <div>
            <a href={link.url}>
              <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} className="w-full  max-w-sm rounded px-4" />
              </a>
            <span className="inline-block  text-red-600 medium-text  rounded ml-3 p-2 mt-2 capitalize font-stretch-105% ">{link.title} <p className=" text-gray-400 inline-block  font-stretch-105% ">Total Clicks: {link.clicks || 0}</p>
            <span className='text-green-600 bg-green-50 ml-2 px-3 rounded-full text-center align-middle font-stretch-105% text-lg'>{link.order}</span>
            </span>
            
          </div>
        ) : (
          <div className='flex gap-4 items-center'>
            {link.logo && (
             <a href={link.url}> <img src={link.logo} alt="logo" className="w-full h-12 object-contain rounded shrink" /> </a>
            )}
            <div>
              {link.title && (
             <div className='flex gap-2 items-center'>
               <p className=" text-gray-700 font-display capitalize medium-text font-stretch-105% medium-text">{link.title}</p>
               <span className='text-green-600 bg-green-50 px-3 rounded-full text-center align-middle font-stretch-105% '>{link.order}</span>
             </div>
              
            )}
              {link.description && (
              <p className=" text-gray-400 ">Total Clicks: {link.clicks || 0}</p>
            )}
            </div>
          </div>
        )}
        
      </div>

      <label className="inline-flex items-center me-6 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={link.visible}
          onChange={() =>{ onToggleVisibility(link._id, !link.visible)}}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
      </label>

      <div className={`flex gap-2 absolute right-2 ${isOpen ? 'bg-white border-2 border-gray-100 rounded-lg px-5 py-2 shadow-xl ':''}` }>
      <button onClick={() => setIsOpen(!isOpen)} ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAAC25
"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg></button>
      { isOpen && <div className='flex flex-col gap-2  py-1 '> <button onClick={() => onEdit(link)} className="text-sm   rounded  text-blue-600 flex items-center gap-2 font-stretch-105% ">
        <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#155dfc"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        <span>Edit</span>
      </button>
      <div className='h-0.25 bg-gray-100'></div>
        <button onClick={() => onDelete(link._id)} className="text-sm text-red-600 flex items-center gap-2 font-stretch-105%">
          <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#CF0000
"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          <span>Delete</span>
          </button> </div> }
      </div>
    </li>
  );
};

const UserLinks = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [profile, setProfile] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '', logo: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const [addloading,setAddloading] = useState(false)
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const fetchLinks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    const decoded = jwtDecode(token);
    setUsername(decoded.username);
    const data = await getUserLinks(decoded.userId || decoded.id);
    const profiledata = await getMyProfile()
    setProfile(profiledata.data)
    console.log(profile)
    setLinks(data.data.links);
    setFilteredLinks(data.data.links);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const filtered = links.filter((link) => {
      const order = link.order;
      return (
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.toString() === searchTerm
      );
    });
    setFilteredLinks(filtered);
  }, [searchTerm, links]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link._id === active.id);
      const newIndex = links.findIndex((link) => link._id === over.id);
      const reordered = arrayMove(links, oldIndex, newIndex);
      setLinks(reordered);
      const order = reordered.map((link, i) => ({ _id: link._id, order: i+1 }));
      await updateLinkOrder(order);
      toast.success('Link order updated')
      fetchLinks()
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return alert('Please fill title and URL');
    try {
      setAddloading(true)
      await createLink(newLink);
    setNewLink({ title: '', url: '', description: '', logo: '' });
    toast.success('Link added successfully')
    } catch (error) {
      console.log(error)
      toast.success('Link  successfully')
    }finally{
      setShowForm(false);
      fetchLinks();
      setAddloading(false)
    }
  };

  const handleEdit = (link) => {
    setEditing(link);
    setNewLink({
      title: link.title,
      url: link.url,
      description: link.description || '',
      logo: link.logo || ''
    });
    setShowForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editing) return;
      //addloading(true)
    setAddloading(true)
    await updateLink(editing._id, newLink);
    setEditing(null);
    setNewLink({ title: '', url: '', description: '', logo: '' });
    toast.success('Link Edited Successfully')
    setShowForm(false);
    setAddloading(false)
    fetchLinks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
      await deleteLink(id);
      toast.success('Link Deleted Successfully')
      } catch (error) {
        console.log(error)
      }finally{
        fetchLinks();
      }
    }
  };

  const handleToggleVisibility = async (id, status) => {
    await visibility(id, { visible: status }).then((res)=>{toast.success(res.data.message)})
    setLinks((prev) =>
      prev.map((link) => (link._id === id ? { ...link, visible: status } : link))
    );
  };

const handleLogoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // 🔁 Replace with yours

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      setNewLink((prev) => ({ ...prev, logo: data.secure_url }));
    } else {
      alert('Upload failed. Try again.');
    }
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    alert('Logo upload failed');
  }
};


  const videoId = getYouTubeVideoId(newLink.url);

  return (
    <>
    <div className='p-2 flex gap-2 max-w-2xl mx-auto  '>
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </div>
        <input type="text" class="font-stretch-105%  border-2 border-gray-100 text-gray-500  rounded-lg  focus:outline-emerald-700 block w-full ps-10 p-4 medium-text " placeholder="Search Link -or- Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
    <button class="p-4 w-16 flex items-center justify-center  text-sm font-medium   border-2 border-emerald-600  rounded-lg   focus:outline-none ">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#047857"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg>
    </button>
    </div>

    {/*logo design */}
    <div className='flex p-2 gap-3 items-center max-w-2xl mx-auto'>
      <div className="relative w-18 h-18 rounded-full p-[2px] animate-borderColorChange">
  <img
    src={profile.profilePic || avatar}
    alt=""
    className="w-full h-full shadow-sm rounded-full object-cover"
  />

  <style>{`
    @keyframes borderColorChange {
      0% { border-color: #ff6b6b; }
      25% { border-color: #f59e0b; }
      50% { border-color: #60a5fa; }
      75% { border-color: #7c3aed; }
      100% { border-color: #06b6d4; }
    }
    .animate-borderColorChange {
      border: 2px solid #ff6b6b;
      animation: borderColorChange 6s linear infinite;
    }
  `}</style>
</div>

      <div>
        <div className='big-text font-semibold text-gray-700 font-display capitalize font-stretch-105%'>{profile.username} <img className='h-3 inline' src={profile.plan=='pro' || profile.plan=='premium'?verified:''} alt="" /></div>
        <div className=' text-gray-500 capitalize font-stretch-105%'>{profile.bio}</div>
      </div>
    </div>
    <SocialLinks/>
    {/*social links*/ }
    <div className="max-w-2xl mx-auto px-2 transition-all ease-in">
      <div className="flex justify-between items-center mb-4">
        <div className='flex  gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M120-280v-80h560v80H120Zm80-160v-80h560v80H200Zm80-160v-80h560v80H280Z"/></svg>
        <h2 className="text medium-text text-gray-700 font-stretch-105%">{editing ? 'Edit Link' : 'All Links'}</h2>
        </div>
        {!editing && (
          <button onClick={() =>{setAddloading(true); setTimeout(() => { setShowForm((prev) => !prev); setAddloading(false) }, 200) }} className="bg-emerald-700 text-white px-4 py-2 rounded-full  flex items-center justify-center disabled:opacity-50 font-stretch-105%" disabled={addloading}>
            {addloading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {addloading ? 'Processing...' : 'Add Link'}
          </button>
        )}
      </div>

      {showForm && (
        <div className='h-screen w-screen px-4  fixed top-0 left-0 backdrop-blur-2xl z-5'>
        <form onSubmit={editing ? handleEditSubmit : handleAddLink} className="mb-6 flex w-85 sm:w-xl  flex-col gap-4 bg-white p-4 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm" >
        {!videoId && (
            <>
            <div className='flex w-full justify-end  ' onClick={() =>{ setEditing(null);setNewLink({ title: '', url: '', description: '', logo: '' });  setShowForm((prev) => !prev);}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff" className='bg-red-600 rounded'><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg></div>
            <label htmlFor="link-logo" className='flex justify-center '>
              {newLink.logo ? <div className='flex w-full border-2 border-gray-100 py-4 gap-2 px-4 rounded-xl items-center justify-between'><div className='flex gap-2 items-center'> <img src={newLink.logo} className='h-12' /> <div className='flex flex-col'>
                <span className='text-xl font-stretch-105% text-gray-700 '>{newLink.title}</span>
                <span className='text-x text-gray-300 font-stretch-105%'>{newLink.description}</span>
                </div> </div> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="14px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></div> :
              <div className='flex flex-col bg-gray-50 border-dashed border-2 w-full border-gray-200 rounded-xl items-center px-6 py-6'>
                <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#e3e3e3"><path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z"/></svg>
                <span className='text-gray-500 font-stretch-105%'> Click to upload logo</span>
                </div> }
            </label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className='hidden' id='link-logo'/>
            </>
          )}
          <div className='h-0.25 bg-gray-200 rounded-full '></div>
            <input
            type="text"
            placeholder="Title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="border-2 border-gray-200 focus:outline-emerald-700 p-2 rounded-sm text-gray-500 font-stretch-105%"
            required
          />
          <input
            type="url"
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="border-2 border-gray-200 focus:outline-emerald-700 p-2 rounded text-gray-500 font-stretch-105%"
            required
          />
          {!videoId && <input
                type="text"
                placeholder="Description (optional)"
                value={newLink.description}
                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                className="border-2 border-gray-200 focus:outline-emerald-700 p-2 rounded text-gray-500 font-stretch-105%"
              />}
           
          <div className="flex gap-2">
            <button type="submit" className="bg-emerald-700 text-white px-4 py-4 rounded w-full flex justify-center items-center font-stretch-105%">
              {addloading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
     { editing ? (addloading ? 'Processing...' : 'Update Link') :  (addloading ? 'Processing...' : 'Add Link')}
            </button>
            {editing && (
              <button type="button" onClick={() => {
                setEditing(null);
                setNewLink({ title: '', url: '', description: '', logo: '' }); 
                setShowForm(false);
                setIsOpen((prev) => !prev);
              }} className="bg-red-700 text-white px-4 py-4 rounded w-full font-stretch-105%">
                Cancel Editing
              </button>
            )}
          </div>
        </form>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} 
      modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={filteredLinks.map((link) => link._id)} strategy={verticalListSortingStrategy}>
          <ul className='mb-30 '>
            {filteredLinks.map((link) => (
              <SortableItem
                key={link._id}
                link={link}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
    </>
  );
};

export default UserLinks;

