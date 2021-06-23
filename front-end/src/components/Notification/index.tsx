import React from 'react';
import Notification from 'rc-notification';
import './index.css';
import Icon from '../Icons';

function addIcon(msg:string, type:string, destroy: React.MouseEventHandler<HTMLElement>) {
    let content;
    if (type === 'success') {
        content = (
            <div className="all-icon">
                <button type="button" style={{marginTop: '-8px'}} className="close" onClick={destroy} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <Icon color='green' name='x-circle' size='1em'/>
                {' '}
                {msg}
            </div>
        );
    } else if (type === 'warn') {
        content = (
            <div className="all-icon" style={{color:'red'}}>
                <button type="button" style={{marginTop: '-8px'}} className="close" onClick={destroy} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <Icon color='red' name='x-circle' size='1em'/>{' '}
                {msg}
            </div>
        );
    } else if (type === 'error') {
        content = (
            <div className="all-icon">
                  <button type="button" style={{marginTop: '-8px'}} className="close" onClick={destroy} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <Icon color='red' name='x-circle' size='1em'/>{' '}
            </div>
        )
    }
    return content;
}
export default function notification(msg:string, type:string, duration:number = 200) {
    function destroy() {
        removeNotification();
    }
    let removeNotification:Function;
    const content = addIcon(msg, type, destroy);
    Notification.newInstance({}, notification => {
        notification.notice({
            content,
            duration
        });
        removeNotification = notification.destroy;
        setTimeout(() => {
            removeNotification();
        }, 3000);
    });
}