import React from 'react'
import Api from '../../utils/api'

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.saveProject = this.saveProject.bind(this)
    }

    saveProject(event){
        event.preventDefault()
        const name = document.querySelector('input#name').value

        Api('POST', '/projects', {
            data: { name }
        })
        .then(results => {
            console.log(results)
            const { project } = results
            this.setState({
                msg: 'Project saved successfully'
            })
        })
        .catch(error =>{
            console.log(error)
            this.setState({
                error: error.data.errors[0].msg
            })
        })
    }

    render(){
        const {msg, error} = this.state
        return(
            <div>
                <p>{msg || error}</p>
                <form onSubmit={this.saveProject}>
                    <input id='name' type='text' placeholder='Project name'/>
                    <input type='submit' value='save' />
                </form>
            </div>
        )
    }
}
export default Form