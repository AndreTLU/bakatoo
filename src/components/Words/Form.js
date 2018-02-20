import React from 'react'
import Api from '../../utils/api'

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.saveWord = this.saveWord.bind(this)
    }

    saveWord(event){
        event.preventDefault()
        const name = document.querySelector('input#name').value

        Api('POST', '/words', {
            data: { name }
        })
        .then(results =>{
            console.log(results)
            const { word } = results
            this.setState({
                msg:'Word saved successfully ' + word.name
            })
        })
        .catch(error =>{
            console.log(error)
            this.setState({
                error: error.data.errors.name.msg
            })
        })


    }

    render(){
        return(
            <form onSubmit={this.saveWord}>
                <input id='name' type='text' />
                <input type='submit' value='save' />
            </form>
        )
    }
}

export default Form