import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'
// components;  material-ui
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

    class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        title: '',
        content: '',
        results: [],
        }
    }

    componentDidMount () {
        this.getPosts()
    }

    // load all posts
    async getPosts () {
        const _results = await api.getAllPosts()
        console.log(_results)
        this.setState({results: _results.data})

    }

    // handling input fields
    handlingChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    } 

    // submit to post
    // asynchronous 
    handlingSubmit = async (event) => {
        event.preventDefault()
        let result = await api.createPost( {title: this.state.title, content:this.state.content})
        console.log("게시물이 등록되었습니다.", result.data)
        this.setState({title:'', content:''})
        this.getPosts()
    }

    // delete post
    // asynchronous
    handlingDelete = async (id) => {
        await api.deletePost(id)
        this.getPosts()
    }

    render () {
    return (
    <div className="App">
        <Container maxWidth='md'>
        <div className="PostingSection">
        <br/>
        <h1>대나무숲</h1>

        
        <form onSubmit={this.handlingSubmit} noValidate autoComplete="off">
            
            <TextField id="standard-basic-full-width" label="제목"
            name='title'
            value={this.state.title}
            onChange={this.handlingChange}
            />
            <br/>
            <br/>
            <TextField
                id="filled-textarea-full-width"
                label="내용"
                placeholder="훌훌 털어보세요."
                multiline
                rows='1'
                name='content'
                value={this.state.content}
                onChange={this.handlingChange}
            />
            <br/>
            <br/>
            <Button variant="contained" color="primary" type='submit'>등록하기</Button>

        </form>

        </div>
        <br/>
        </Container>
       
        <div className="ViewingSection">
            
            {
                this.state.results.map((post) =>
                <div>
                <Paper className="contents" variant="outlined">
                    <PostView key={post.id} id={post.id} title = {post.title} content = {post.content} />
                    <Button variant="contained" color="secondary" onClick={(event)=>this.handlingDelete(post.id)}>삭제하기</Button>
                </Paper>
                </div>
                )
                }
            
        </div>

    </div>
    );
    }
    }
    export default App;
