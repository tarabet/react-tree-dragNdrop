import React from "react";

import {
    Panel,
} from "react-bootstrap";

export class EmpCard extends React.PureComponent {
    render() {
        return (
            <Panel bsStyle="primary" className="EmpPanel">
                <Panel.Heading className="EmpPanelHeading">
                    <Panel.Title>{this.props.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body className="EmpPanelBody">{this.props.position}</Panel.Body>
            </Panel>
        )
    }
}