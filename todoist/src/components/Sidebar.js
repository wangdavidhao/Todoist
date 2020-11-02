import React from 'react';
import {FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar} from 'react-icons/fa';

export const Sidebar = () => {
    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <li><span><FaInbox/><span>Inbox</span></span></li>
                <li><span><FaRegCalendar/><span>Today</span></span></li>
                <li><span><FaRegCalendarAlt/><span>Next 7 days</span></span></li>
            </ul>
            <div className="sidebar__middle">
                <span><FaChevronDown/></span>
                <h2>Projects</h2>
            </div>

            <ul className="sidebar__projects">Projects will be here !</ul>
            Add Projects Component here !
        </div>
    )
};



