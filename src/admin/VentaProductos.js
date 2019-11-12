import React, {useState} from 'react';
import {NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown} from "reactstrap";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import Dropdown from "reactstrap/es/Dropdown";
import Header from "../common/Header";

export default class VentaProductos extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            setActiveTab: 1,
            activeTab: 1,
            dropDownValue: 'Select action',
            dropdownOpen: false
        }
    }

    componentDidMount() {

        let self = this;
        var elements = document.querySelectorAll('[data-toggle="sticky-onscroll"]');
        // Find all data-toggle="sticky-onscroll" elements


        [].forEach.call(elements, function(element) {

            let div = document.createElement('div');
            div.classList.add('sticky-wrapper');

            var sticky = element;
            var stickyWrapper = div;
            sticky.before(stickyWrapper);
            sticky.classList.add('sticky');

            // Scroll & resize events
            window.addEventListener('scroll', function () {
                self.stickyToggle(sticky, stickyWrapper, window);
            });

            // On page load
            self.stickyToggle(sticky, stickyWrapper, window);
        });

    }

    changeValue(e)
    {
        this.setState({dropDownValue: e.currentTarget.textContent})
    }

    render() {


        return (
            <div className="mt-3">
                <Header/>
                <div className="dashboard-content fadeInLoad">
                    <TabContent activeTab={this.state.activeTab} className="text-center">
                        <TabPane tabId="1">
                            <p>1</p>
                        </TabPane>
                        <TabPane tabId="2">
                            <p>2</p>
                        </TabPane>
                        <TabPane tabId="3">
                            <p>3</p>
                        </TabPane>
                        <TabPane tabId="4">
                            <p>4</p>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );

    }

    stickyToggle(sticky, stickyWrapper, scrollElement) {

        var stickyHeight = sticky.offsetHeight;
        var stickyTop = stickyWrapper.offsetTop;

        if (scrollElement.pageYOffset >= stickyTop) {
            sticky.classList.add("is-sticky");

            stickyWrapper.style.height = stickyHeight + 'px';
        } else {
            sticky.classList.remove("is-sticky");
            stickyWrapper.style.height = 'auto';
        }
    };

    clearInput(e)
    {
        e.target.classList.remove('bounce');
    }

};
