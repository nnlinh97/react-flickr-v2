import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import '../styles/menu.css';

const menus = [
    {
        name: 'Explore',
        to: '/',
        exact: true
    },
    {
        name: 'Trending',
        to: '/photos/tags',
        exact: false
    },
];

const MenuLink = ({ lable, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                let active = match ? 'active' : '';
                return (
                    <li className={active}>
                        {lable === 'Trending' ? <a>{lable}</a> : <Link to={to}>{lable}</Link>}
                    </li>
                );
            }}
        />
    )
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: ''
        }
    }

    showMenus = (menus) => {
        let result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        lable={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { history } = this.props;
        let tag = this.state.tag;
        if (tag !== '') {
            this.setState({
                tag: ''
            })
            history.push(`/photos/tags/${tag.replace(/ /g, "")}`);
        }
    }

    render() {
        let { tag } = this.state;
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        {this.showMenus(menus)}
                    </ul>
                    <form onSubmit={this.onSubmit} className="navbar-form navbar-left" >
                        <div className="input-group">
                            <input onChange={this.onChange} name="tag" value={tag} type="text" className="form-control" placeholder="Photos, people, or groups" />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(Menu);