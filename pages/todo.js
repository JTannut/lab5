import { useState } from 'react'
import styles from '../styles/Todo.module.css'
 
const Todo = () => {
 
   const [tasks, setTasks] = useState([
       { id: 1, name: 'Do homework' },
       { id: 2, name: 'Read book' }])
 
   const [name, setName] = useState('')
 
   const [idEdit, setIdEdit] = useState(0)
 
   const renderTasks = () => {
       if (tasks !== null)
           return tasks.map((task, index) => (
               <li key={index} className={styles.listItem}>
                   {index+1})
                   {(idEdit !== task.id) ?
                       task.name :
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
                           onClick={() => editTask(task.id)}>
                           Edit
                       </button>
                       <button
                           className={`${styles.button} ${styles.btnDelete}`}
                           onClick={() => deleteTask(task.id)}>
                           Delete
                       </button>
                   </div>
               </li>))
   }
 
 
   const editTask = (id) => {
       setIdEdit(id)
       let t = tasks.find((task) => +task.id === +id)
       setName(t.name)
       if (+idEdit === +id) { //Press Edit again
           let newTasks = tasks.map((task, index) => {
               if (+task.id === +id)
                   tasks[index].name = name
               return task
           })
           setTasks(newTasks)
           setIdEdit(0)
       }
   }
 
   const deleteTask = (id) => {
       console.log('delete id: ', id)
       let newTasks = tasks.filter((task) => task.id !== +id)
       setTasks(newTasks)
   }
 
   const addTask = (name) => {
      if(name.length !== '' && name.length !== 0){
       if(tasks.length === 10){
           setIdEdit(0)
       }
       else{
            setTasks([...tasks, { id: tasks[tasks.length - 1].id + 1, name }])
       }
       console.log(tasks)
   }
}
 
   return (
       <div className={styles.container}>
           <h1 className={styles.title}>Todo</h1>
 
           <div className="addContainer">
               <input
                   className={styles.text}
                   type="text"
                   name="addTask"
                   onChange={(e) => (setName(e.target.value))}
               />
             
               <button
                   className={`${styles.button} ${styles.btnAdd}`}
                   onClick={() => addTask(name)}>Add</button>
           </div>
           <ul className={styles.list}>
               {renderTasks()}
           </ul>
       </div>
   )
}
 
export default Todo