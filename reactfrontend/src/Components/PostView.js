import React, { Component } from 'react'

// a dummy prop when posts empty.
/*
const dummy_prop = {
    title: 'test title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
}
*/
     
// rendering each post item to show
export default class PostView extends Component {
    render() {
        const {id, title, content} =this.props
        return (
            <div>
                <br/>
                {id}
                <h3>제목: {title}</h3>
                <p>내용물: {content}</p>
                <br/>
            </div>
            
        )
    }
}