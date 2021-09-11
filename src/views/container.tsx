import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Loading from 'components/loading';
import './container.scss';
import Sidebar from 'components/sidebar';
// Components
import DashBoard from './dashboard';
import { useAppDispatch } from 'store/hooks';
import { sysOptions } from 'store/shared.slice';

// const User = lazy(() => import('./user/user'));
// const Post = lazy(() => import('./post/post'));
// const Page = lazy(() => import('./page/page'));
// const Category = lazy(() => import('./category/category'));
// const Tag = lazy(() => import('./tag/tag'));
// const Push = lazy(() => import('./push/push'));
// const Appearance = lazy(() => import('./appearance/appearance'));
// const Options = lazy(() => import('./options/options'));

const routerOptions = {
    basename: '/admin',
    forceRefresh: false,
};
// TODO define types with history
const Container = (props: any) => {
    // getOptions() {
    //     get('/admin/api/options').then((res: any) => {
    //         if (res.errno === 0) {
    //             window.SysConfig.options = res.data;
    //         }
    //     });
    // }

    // componentWillMount() {
    //     this.getOptions();
    // }
    const dispatch = useAppDispatch();
    dispatch(sysOptions());
    return (
        <Router {...routerOptions}>
            <>
                <Sidebar {...props} />
                <div className="content">
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact={true} path="/dashboard" component={DashBoard}
                            />
                            {/* <Route path="/post" component={Post} />
                            <Route path="/page" component={Page} />
                            <Route path="/cate" component={Category} />
                            <Route path="/tag" component={Tag} />
                            <Route path={`/user`} component={User} />
                            <Route path={`/push`} component={Push} />
                            <Route path="/appearance" component={Appearance} />
                            <Route path="/options" component={Options} /> */}
                            <Redirect to="/dashboard" />
                        </Switch>
                    </Suspense>
                </div>
            </>
        </Router>
    );
}

export default Container;
