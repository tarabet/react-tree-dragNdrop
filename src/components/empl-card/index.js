import React from "react";

import {
    Panel,
} from "react-bootstrap";

import { DragSource, DropTarget } from 'react-dnd';

const cardSource = {
    beginDrag(props) {
        props.saveEmpMovingCard(props.name);

        return {
            name: props.name,
        }
    }
};

const cardTarget = {
    drop(props) {
        props.processDragChanges(props.name);
    },
};

const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};

const collectTarget = (connect) => {
    return {
        connectDropTarget: connect.dropTarget(),
    };
};

class EmpCard extends React.PureComponent {
    render() {
        const { isDragging, connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(
            connectDropTarget(
                <div style={{ opacity: isDragging ? 0.5 : 1 }}>
                    <Panel bsStyle="primary" className="EmpPanel">
                        <Panel.Heading className="EmpPanelHeading">
                            <Panel.Title>{this.props.name}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="EmpPanelBody">{this.props.position}</Panel.Body>
                    </Panel>
                </div>
            )
        )
    }
}

const SourceCard = DragSource("EmpCard", cardSource, collectSource)(EmpCard);
export default DropTarget("EmpCard", cardTarget, collectTarget)(SourceCard);