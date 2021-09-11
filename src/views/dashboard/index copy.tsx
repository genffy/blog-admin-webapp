import React, { useState } from 'react';
import './style.scss';
import { DashBoardProps } from './types';
import BreadCrumb from 'components/breadcrumb';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
    selectLastAsync,
    systemInfoAsync,
    selectPosts,
    updateSystemAsync,
    UPDATE_STEPS,
    selectStep,
    downCount,
    selectVersions,
    selectCount,
} from './store.slice';
import { useSelector } from 'react-redux';
import { PostInfo } from 'types/post';

const confirm = Modal.confirm;

const DashBoard = (props: DashBoardProps) => {
    const dispatch = useAppDispatch();
    dispatch(selectLastAsync());
    dispatch(systemInfoAsync());
    debugger

    const [showUpdate, setShowUpdate] = useState(false);
    const step = useAppSelector(selectStep);
    const versions = useAppSelector(selectVersions);
    const count = useAppSelector(selectCount);
    const posts = useSelector(selectPosts);
    
    const updateSystem = () => {
        updateSystemAsync(step);
    }

    const renderUpdate = () => {
        return (
            <div className="modal fade in" style={{ display: showUpdate ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button"
                                onClick={() => setShowUpdate(false)}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" >在线更新</h4>
                        </div>
                        <div className="modal-body" >
                            <div className="dialog-panel anim-modal" >
                                <a href="###" className="close-btn">&nbsp;</a>
                                <div className="dialog-content" >
                                    <ul className="update-step">
                                        {UPDATE_STEPS.map(item =>
                                            // TODO step >= item[0] 
                                            // step > item[0]
                                            <li key={item[0]} className={true ? 'show' : ''}>
                                                <i className={true ? 'success' : ''}>{item[0]}</i>
                                                <div className="pipe">
                                                    <div className="half" />
                                                </div>
                                                <span className="loading">{item[1]}</span>
                                                <span className="ok">{(item[2] as string).replace('%d', downCount.toString())}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderUpdateConfirm = () => {
        confirm({
            title: '在线更新警告!',
            content: '在线更新会覆盖文件，请确认你已经备份好对程序的修改，如果没有修改请忽略该警告。',
            onOk: () => {
                setShowUpdate(true);
                updateSystem();
            }
        });
    }
    const links = [
        { url: '/post/create', title: '撰写新文章', type: 2 },
        { url: '/page/create', title: '创建页面', type: 1 },
        { url: '/appearance/theme', title: '更改外观', type: 1 },
        { url: '/options/general', title: '系统设置', type: 1 }
    ].filter(link => link.type >= window.SysConfig.userInfo.type);

    return (
        <div className="fk-content-wrap">
            <BreadCrumb className="breadcrumb" {...props} />
            <div className="manage-container">
                {versions.needUpdate ?
                    <p className="bg-info update-message">
                        Firekylin <a
                            href={`https://github.com/firekylin/firekylin/blob/master/CHANGELOG.md#${(versions.needUpdate as string).replace(/\./g, '')}`}
                        >{versions.needUpdate}</a> 已经发布，请立即 <a href="http://firekylin.org/release/latest.tar.gz"
                        >下载更新</a> 或者使用 <a href="javascript:;" onClick={() => renderUpdateConfirm()}
                        >在线更新</a>！
                    </p>
                    : null}
                <h3 style={{ marginBottom: '30px' }}>网站概要</h3>
                <p>目前有 {count.posts} 篇文章,
                    并有 {count.comments} 条关于你的评论在 {count.cates} 个分类中. </p>
                <p>点击下面的链接快速开始:</p>
                <div className="quick-link">
                    {links.map(link => <NavLink key={link.url} to={link.url}>{link.title}</NavLink>)}
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-5">
                        <h4>最近发布的文章</h4>
                        <ul>
                            {posts.map((post: PostInfo) =>
                                <li key={post.id}>
                                    <label>{moment(new Date(post.create_time)).format('MM.DD')}：</label>
                                    <a href={`/post/${post.pathname}`} target="_blank" rel="noreferrer">{post.title}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>系统概况</h4>
                        <ul>
                            <li><label>服务器系统：</label>{versions.platform}</li>
                            <li><label>Node.js版本：</label>{versions.nodeVersion}</li>
                            <li><label>V8引擎版本：</label>{versions.v8Version}</li>
                            <li><label>MySQL版本：</label>{versions.mysqlVersion}</li>
                            <li><label>ThinkJS版本：</label>{versions.thinkjsVersion}</li>
                            <li><label>FireKylin版本：</label>{versions.firekylinVersion}</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4>关于我们</h4>
                        <ul>
                            <li>
                                <label>项目主页：</label>
                                <a href="https://firekylin.org/" target="_blank" rel="noreferrer">http://firekylin.org/</a>
                            </li>
                            <li>
                                <label>项目源码：</label>
                                <a href="https://github.com/firekylin/firekylin">https://github.com/firekylin/firekylin</a>
                            </li>
                            <li>
                                <label>帮助文档：</label>
                                <a href="https://github.com/firekylin/firekylin/wiki" target="_blank" rel="noreferrer">https://github.com/firekylin/firekylin/wiki</a>
                            </li>
                            <li>
                                <label>问题反馈：</label>
                                <a href="https://github.com/firekylin/firekylin/issues">https://github.com/firekylin/firekylin/issues</a>
                            </li>
                            <li>
                                <label>团队博客：</label>
                                <a href="https://75.team">https://75.team</a>
                            </li>
                            <li>
                                <label>开发成员：</label>
                                <a href="https://github.com/welefen">welefen</a>、
                                <a href="https://github.com/lizheming">lizheming</a>、
                                <a href="https://github.com/colordove">colordove</a>、
                                <a href="https://github.com/wei">wei</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {renderUpdate()}
        </div>
    )
}

export default DashBoard;
