import { FC } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { getCurrent } from 'store/shared.slice';
import { auth } from 'utils/auth';
import Container from 'views/container';
import Login from 'views/login';
import './app.scss';


const App: FC = () => {
    const dispacth = useAppDispatch()
    dispacth(getCurrent())

    return <Router basename="/admin">
        <Switch>
            <Route
                path="/"
                render={props => auth.checkLogin() ? (
                    <Container />
                ) : props.history.location.pathname === '/login' ? (
                    <Login {...props} />
                ) : (
                    <Redirect to="/login" />
                )} />
            <Route
                path="/login"
                render={props => auth.checkLogin() ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <Login {...props} />
                )} />
        </Switch>
    </Router>;
}

export default App;
