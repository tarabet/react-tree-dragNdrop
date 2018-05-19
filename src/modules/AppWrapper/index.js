import React from "react";

import {
    Row,
    Col,
    PageHeader,
} from "react-bootstrap";
import { Msg } from "../../utils/Msg";
import { getJson, genEmpStructure } from "../../utils/common";
import { empStructure } from "../../config/config";
import EmpCard from "../../components/empl-card";

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export class AppWrapper extends React.Component {

    constructor(props) {
        super(props);

        this._treeObj = null;

        this.state = {
            loading: false,
            structure: null,
            dragSource: null,
        };

        this.isLoading = this.isLoading.bind(this);
        this.fetchJson = this.fetchJson.bind(this);
        this.buildStructure = this.buildStructure.bind(this);
        this.saveEmpMovingCard = this.saveEmpMovingCard.bind(this);
        this.processDragChanges = this.processDragChanges.bind(this);
    }

    componentWillMount() {
        this.fetchJson()
            .then((structure) => {
                this.buildStructure(structure);
            });
    }

    buildStructure(structure) {
        this._treeObj = genEmpStructure(structure);

        this.setState({
            ...this.state,
            structure: this._treeObj.getTree(),
        });
    }

    fetchJson() {
        this.isLoading(true);

        return getJson(empStructure)
            .then((structure) => {
                this.isLoading(false);
                return structure;
            })
            .catch((err) => {
                this.isLoading(false);
                alert(err);
            })
    }

    isLoading(flag) {
        this.setState({
            ...this.state,
            loading: flag,
        })
    }

    saveEmpMovingCard(dragSource) {
        this.setState({
            ...this.state,
            dragSource,
        });
    };

    processDragChanges(dragTarget) {
        const newStr = this._treeObj.modifyTree(this.state.dragSource, dragTarget);

        this.setState({
            ...this.state,
            structure: newStr,
        });
    }

    render() {
        console.log("TheState:", this.state);

        return(
            <Row className="show-grid">
                <Col xs={12} md={8} mdPush={2}>
                    <PageHeader>
                        {Msg.app.pageHeaderTitle} <span>{this.state.loading ? "...Loading" : ""}</span>
                    </PageHeader>
                    <DragDropContextProvider backend={HTML5Backend}>
                        <div>
                            {this.state.structure && this.state.structure.map((item, i) => (
                                <div
                                    style={{marginLeft: item.level + "0em"}}
                                    key={i}
                                >
                                    <EmpCard
                                        name={item.name}
                                        position={item.position}
                                        level={item.level}
                                        parent={item.parent}
                                        saveEmpMovingCard={this.saveEmpMovingCard}
                                        processDragChanges={this.processDragChanges}
                                    />
                                </div>
                            ))}
                        </div>
                    </DragDropContextProvider>
                </Col>
            </Row>
        )
    }
}