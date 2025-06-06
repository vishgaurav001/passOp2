import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarrey, setpasswordarrey] = useState([]);

 const showpassword = () => {
  if (passref.current.type === "password") {
    ref.current.src = "eye-hover-blink.png";
    passref.current.type = "text";  // Use = to assign
  } else {
    ref.current.src = "glasses.png";
    passref.current.type = "password";
  }
};

  const getpass = async () => {
    let res = await fetch('http://localhost:3000/')
    let passwords = await res.json();
    setpasswordarrey(passwords);
    console.log(passwordarrey);
  }

  useEffect(() => {
    getpass();
  }, []);

  const savepassword = async () => {
  if (form.username.length > 2 && form.password.length > 2 && form.site.length > 2) {
    const newEntry = { ...form, id: uuidv4() }; 
    const newPasswords = [...passwordarrey, newEntry];
    setpasswordarrey(newPasswords);
     toast('saved successfully!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    try {
      let res = await fetch('http://localhost:3000/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
      });

      if (res.ok) {
        setform({ site: "", username: "", password: "" }); 
      } else {
        console.error("Failed to save password on server.");
      }
    } catch (err) {
      console.error("Network/server error:", err);
    }
  } else {
    toast.error("All fields must be at least 3 characters long.");
  }
};


  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlecopy = (text) => {
    toast('Copied to clipboard!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const handleedit = async (id) => {
    let updateedit = passwordarrey.find(item => item.id === id);
    setform(updateedit);
    setpasswordarrey(passwordarrey.filter(item => item.id !== id) );
     toast('You can edit now !', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
     
    await fetch('http://localhost:3000/', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify( {id} ) })


  };

  const handledelete = async (id) => {
    let conferm = window.confirm("delete");
    let updatepassword = passwordarrey.filter(item => item.id !== id);
    setpasswordarrey(updatepassword);
    // localStorage.setItem('password', JSON.stringify(updatepassword));
    let res = await fetch('http://localhost:3000/', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify( {id:id} ) })
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className='container mx-auto px-4 max-w-5xl'>
        <div className='text-center my-4'>
          <h1 className='text-2xl font-bold text-green-900'>
            <span className='text-green-400'>&lt;/</span>Pass<span className='text-green-800'>OP</span><span className='text-green-400'>&gt;</span>
          </h1>
          <p className='text-gray-500 text-sm'>Your own password manager</p>
        </div>

        {/* Form */}
        <div className='flex flex-col gap-3'>
          <input
            value={form.site}
            onChange={handlechange}
            name='site'
            placeholder='Enter the website URL'
            className='h-10 px-3 border bg-white border-green-300 rounded-md focus:outline-green-500'
            type="text"
          />

          <div className='flex flex-col sm:flex-row gap-3'>
            <input
              value={form.username}
              onChange={handlechange}
              name='username'
              placeholder='Enter username'
              className='flex-1 h-10 px-3 border bg-white border-green-300 rounded-md focus:outline-green-500'
              type="text"
            />

            <div className="relative flex-1">
              <input
                value={form.password}
                onChange={handlechange}
                ref={passref}
                name='password'
                placeholder='Password'
                className='h-10 w-full pr-12 px-3 border bg-white border-green-300 rounded-md focus:outline-green-500'
                type="text"
              />
              <span className='absolute top-2 right-3'>
                <img src="eye-hover-blink.png" ref={ref} onClick={showpassword} className='cursor-pointer w-6' alt="" />
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            className="flex items-center gap-2 w-fit px-4 py-2 bg-green-300 hover:bg-green-400 rounded-full font-bold text-green-900 mx-auto"
          >
            <lord-icon
              src="https://cdn.lordicon.com/tsrgicte.json"
              trigger="click"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            save
          </button>
        </div>

        {/* Table */}
        <div className='mt-8'>
          <h2 className='text-2xl font-bold text-center mb-4'>Your Passwords</h2>

          {passwordarrey.length === 0 ? (
            <div className='text-center text-gray-600'>No passwords found.</div>
          ) : (
            <div className="overflow-x-auto max-h-[70vh] rounded-lg shadow-lg">
              <table className="min-w-full border-collapse border border-green-700">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="p-2 text-sm">Site</th>
                    <th className="p-2 text-sm">Username</th>
                    <th className="p-2 text-sm">Password</th>
                    <th className="p-2 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordarrey.map((item) => (
                    <tr key={item.id} className="bg-green-100 border-t border-green-600 text-center text-sm">
                      <td className="p-2 max-w-[30vw] break-all">
                        <div className="flex justify-center items-center gap-2">
                          <a href={item.site} target="_blank" rel="noopener noreferrer" className=''>{item.site}</a>
                          <img src="copy-image.jpeg" className="w-5 h-5 cursor-pointer" onClick={() => handlecopy(item.site)} alt="copy" />
                        </div>
                      </td>
                      <td className="p-2 break-all">
                        <div className="flex justify-center items-center gap-2">
                          <span>{item.username}</span>
                          <img src="copy-image.jpeg" className="w-5 h-5 cursor-pointer" onClick={() => handlecopy(item.username)} alt="copy" />
                        </div>
                      </td>
                      <td className="p-2 break-all">
                        <div className="flex justify-center items-center gap-2">
                          <span>{item.password}</span>
                          <img src="copy-image.jpeg" className="w-5 h-5 cursor-pointer" onClick={() => handlecopy(item.password)} alt="copy" />
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center gap-3">
                          <img src="edit2.png" className='w-6 p-1 cursor-pointer' onClick={() => handleedit(item.id)} alt="edit" />
                          <img src="delete.png" className='w-5 cursor-pointer' onClick={() => handledelete(item.id)} alt="delete" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Manager;
