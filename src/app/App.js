    import React, {Component} from 'react'

    class App extends Component{
        /** necesitamos el estado de la web para otener datos */
        constructor(){
            super()
            this.state={
                title:'',
                description:'',
                tasks:[],
                _id:''
            }
            this.handleChange= this.handleChange.bind(this)
            this.addTask = this.addTask.bind(this)
        }
        addTask(e){
           if(this.state._id){
               fetch(`/app/task/${this.state._id}`,{
                   method:'PUT',
                   body: JSON.stringify(this.state),
                   headers:{
                       'Accept':'application/json',
                       'Content-Type':'application/json'
                   }
               })
               .then(res => res.json())
               .then(data=> {
                   M.toast({html:'Task updated'})
                   this.setState({title:'',description:'',_id:''})
                   this.fetchTasks()
               })
           }
           else{
            fetch('app/task', {
                method: 'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data =>{
                console.log(data)
                M.toast({html:'Task saved'})
                this.setState({title:'',description:''})
                this.fetchTasks()/*carga de nuevo para que aparezca mas */
            })
            .catch(err => console.error(err))
            console.log(this.state)
           }
            e.preventDefault();{/*evita que se refresque la pagina al clickear el boton */}
        }
        componentDidMount(){
            this.fetchTasks()
        }
        fetchTasks(){
            fetch('app/task')
            .then(res=>res.json())
            .then(data => {
                this.setState({tasks: data})
                console.log(this.state.tasks)
                   
            })
        }

        deleteTask(id){
           fetch(`/app/task/${id}`,{
               method:'DELETE',
               headers:{
                   'Accept':'application/json',
                   'Content-Type':'application/json'
               }
           })
           .then(res => res.json())
           .then(data => {
               console.log(data)
               M.toast({html:'Task Deleted'})
               this.fetchTasks()
           })}

           editTask(id){
               fetch(`/app/task/${id}`)
               .then(res=> res.json())
               .then(data => {
                   console.log(data)
                   this.setState({
                       title:data.title,
                       description:data.description,
                       _id:data._id
                   })
               })
           }
        handleChange(e){
          const { name, value }=e.target
          this.setState({
              [name]:value
          })
        }

        render(){
            return(
                <div>
                    {/*NAVIGATION*/}
                    <nav className= "light-blue darken-4">
                       <div className="container">
                          <a className="brand-logo" href="/">
                              MERN STACK
                          </a>
                       </div>
                    </nav>

                    <div className="container"> 
                    <div className="row">
                        <div className="col s5">
                             <div className="card">
                                 <div className="card-content">
                                     <form onSubmit={this.addTask}>
                                         <div className="row">
                                             <div className="input-field" cols12>
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                             </div>
                                         </div>
                                         <div className="row">
                                             <div className="input-field" cols12>
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea" value={this.state.description}></textarea>
                                             </div>
                                         </div>
                                         <button className="btn light-blue darken-4">Enviar</button>
                                     </form>
                                 </div>
                             </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                  
                                  <tr>
                                      <th>Title</th>
                                      <th>Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    this.state.tasks.map(task =>{
                                        return(
                                            <tr key={task.id} >
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" >
                                                        <i className="material-icons" onClick={()=>this.deleteTask(task._id)}>delete</i>
                                                    </button>
                                                    <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={()=> this.editTask(task._id)}>
                                                    <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
    }
    export default App