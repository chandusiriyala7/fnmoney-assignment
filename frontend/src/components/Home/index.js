import {Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'




class Home extends Component {

    render(){
        return (
            <div>
                <Header />
                <div className='home'>
                    <h1 className='bg-light'><strong> Submit Your Assignment!!!</strong></h1>
                    <Link to ="/submission" className = "btn btn-success"><strong>Get Started</strong></Link>
                </div>
            </div>
        )
    }
}


export default Home