import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Todo.module.css'
 
const Todo = ( {avatar_url, login}) => {
 
   const [fname, setStden] = useState([])
       // { id: 1, name: 'Do homework' },
       // { id: 2, name: 'Read book' }])
 
   const [name, setName] = useState('')
 
   const [idEdit, setIdEdit] = useState(0)
 
   useEffect( async () => {
       let ts = await getStden();
       
       console.log(ts)
       setStden(ts) 
   }, [] )
 
 
   const renderStden = () => {
       if (fname && fname.length)
           return fname.map((cat, index) => (
               <li key={index} className={styles.listItem}>
                   {cat.id})
                   {(idEdit !== cat.id) ?
                       cat.name :
                       (<input
                           className={styles.text}
                           type="text"
                           name="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                       />)
                   }
                   <div className={styles.buttonContainer}>
                       <button
                           className={`${styles.button} ${styles.btnEdit}`}
                           onClick={() => editCat(cat.id)}>
                           Edit
                       </button>
                       <button
                           className={`${styles.button} ${styles.btnDelete}`}
                           onClick={() => deleteCat(cat.id)}>
                           Delete
                       </button>
                   </div>
               </li>))
   }
   
 
   const editCat = (id) => {
       setIdEdit(id)
       let t = fname.find((cat) => +cat.id === +id)
       setName(t.name)
       if (+idEdit === +id) { //Press Edit again
           let newStden = fname.map((cat, index) => {
               if (+cat.id === +id)
                   fname[index].name = name
               return cat
           })
           setStden(newStden)
           setIdEdit(0)
       }
   }
 
   const deleteCat = (id) => {
       console.log('delete id: ', id)
       let newStden = fname.filter((cat) => cat.id !== +id)
       setStden(newStden)
   }
 
   const addCat = (name) => {
       setStden([...fname, { id: fname[fname.length - 1].id + 1, name }])
       console.log(fname)
   }
 
   return (
       <div className={styles.container}>
           <div className={styles.topRight}>
                <Link href="/"><a>Home</a></Link>
           </div>
           <h1 className={styles.title}>
 
               <img src={avatar_url} width="80" />
            Todo test <span>{login} </span>
              
           </h1>
 
           <div className="addContainer">
               <input
                   className={styles.text}
                   type="text"
                   name="addCat"
                   onChange={(e) => (setName(e.target.value))}
               />
               <button
                   className={`${styles.button} ${styles.btnAdd}`}
                   onClick={() => addCat(name)}>Add</button>
                   
                   
           </div>
           <div className="addContainer">
               <input
                   className={styles.text}
                   type="text"
                   name="addCat"
                   onChange={(e) => (setName(e.target.value))}
               />
               <button
                   className={`${styles.button} ${styles.btnAdd}`}
                   onClick={() => addCat(name)}>Add</button>
                   
                   
           </div>
           <ul className={styles.list}>
               {renderStden()}
           </ul>
       </div>
   )
}
 
const getStden = async () => {
   const res = await fetch('http://localhost:8000/')
   const json = await res.json()
   console.log(json)
   return json;
}
 
Todo.getInitialProps = async (ctx) => {
   const res = await fetch('https://api.github.com/users/wwarodom')
   const json = await res.json()
   return { login: json.login, avatar_url: json.avatar_url }
}
 
export default Todo