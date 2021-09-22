import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';

function About(props) {

    // Assignement 4 - Task 1
    function RenderLeaders({items, errMess, isLoading}){
        if(isLoading){
            return (
                <Loading />
            )
        }else if(errMess){
            return(
                <h4>{errMess}</h4>
            );
        }else if(typeof items === "object"){
            const leaders = items.map((leader) => {
                return (
                    // task 3
                    <Fade in>
                        <RenderLeader leader={leader} key={leader.id} />
                    </Fade>
                );
            });
            return (
                <Media list>
                    {/* task 3 */}
                    <Stagger in>
                        {leaders}
                    </Stagger>
                </Media>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
    

    function RenderLeader({leader}){
        return (
            <Media tag="li" className="m-3 row">
                <Media left top href="#" className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <Media object src={leader.image} alt={leader.name} />
                </Media>
                <Media body className=" col-12 col-sm-12 col-md-9 col-lg-9">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p className="justify-content">{leader.description}</p>
                </Media>
            </Media>
        );
    }

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p className="justify-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <RenderLeaders isLoading={props.leaderLoading}
                                    errMess={props.leaderErrMess}
                                    items={props.leaders} />
                </div>
            </div>
        </div>
    );
}

export default About;    