import React from 'react'
import { Col, Card, Row, Collapse } from 'antd'
import { Link } from 'react-router-dom'



class HomeSubjects extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        const { subjects } = this.props
        let items= []
        
        subjects.forEach((element,i)=> {
            items.push(
                <Col key={i} sm={12} md={8}>
                    <Link to={'/subject/' + element.organization.login}>
                        <Card key={element.organization.id} bordered>
                            <h2>
                                {element.organization.description}
                            </h2>
                            <p>
                                {element.organization.login}
                            </p>
                        </Card>
                    </Link>
                </Col>
            )
            i++
        })
        console.log(items)
        return (
            <div>
                <Row gutter={24}>
                    {items}
                    <Col sm={12} md={8}>
                        <a href='https://github.com/settings/connections/applications/e70bbdc96e673e18d51c'>
                            <Card bordered>
                                <h2>
                                    Lisa uus aine
                                </h2>
                                <p>
                                    Anna rakendusele Githubi Organisatsiooni ligipääs
                                </p>
                            </Card>
                        </a>
                    </Col>
                </Row>
            </div>
        )
    }
    
}

export default HomeSubjects