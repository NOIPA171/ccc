import React, {useEffect, useState} from 'react'
import DraftEditorEdit from './components/DraftEditorEdit'
import { Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import {EditorState, convertFromRaw} from 'draft-js';
import axios from 'axios'

function MemberStory(props){

    const [c, setC] = useState(null)
    const [t, setT] = useState('')
    const [tgs, setTgs] = useState([])

    useEffect(()=>{
        // console.log(props.location.search)
        if(!props.location) return;
        let url = `http://localhost:5500/stories/member/draft/${props.match.params.id}?usrId=${localStorage.getItem('userId')}`

        axios.get(url)
        .then(r=>{
            setT(r.data.drftTitle)
            setTgs(JSON.parse(r.data.drftTags))
            return convertFromRaw(JSON.parse(r.data.drftContent))
        })
        .then(content=>{
            setC(content);    
        })
    }, [])
    // console.log("props:", props)
    // console.log('localstorage', localStorage.getItem('userdata'));

    return(
        <Row>
                <Col lg={3}>
                    <div>
                        <ul>
                            <li>fake list</li>
                            <li>fake list</li>
                            <li>fake list</li>
                            <li>fake list</li>
                        </ul>
                    </div>
                </Col>
                <Col lg={9} className='bk-member-main-container'>
                    <h3>編輯草稿</h3>
                    <DraftEditorEdit
                        type='draft'
                        content = {c}
                        tags = {tgs}
                        title = {t}
                    />
                </Col>
            </Row>
    )
}

export default withRouter(MemberStory)