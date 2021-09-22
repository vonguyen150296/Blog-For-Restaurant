import React, { Component } from "react";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

// CSS Transition
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapDispatchToProps = dispatch => ({
    postFeedback: (item) => dispatch(postFeedback(item)),
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}


class Main extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leaderErrMess={this.props.leaders.errMess}
                    leaderLoading={this.props.leaders.isLoading}
                />
            );
        }
      
        const DishWithId = ({match}) => {
            console.log(this.props.comments)
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders.leaders}
                    leaderErrMess={this.props.leaders.errMess}
                    leaderLoading={this.props.leaders.isLoading} />
            );
        }

        // Task 2
        const ContactPage = () => {
            return (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                        postFeedback={this.props.postFeedback}
                />
            )
        }

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path='/menu/:dishId' component={DishWithId} />
                            <Route exact path="/aboutus" component={AboutPage} />
                            <Route exact path='/contactus' component={ContactPage} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                
                <Footer />
            </div>
        )
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
