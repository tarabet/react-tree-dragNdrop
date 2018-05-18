import React from "react";

import {
    Row,
    Col,
    PageHeader,
} from "react-bootstrap";
import { Msg } from "../../utils/Msg";
import { getJson, genEmpStructure, sortByParent } from "../../utils/common";
import { empStructure } from "../../config/config";
import { EmpCard } from "../../components/empl-card";

export class AppWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            structure: null,
        };

        this.isLoading = this.isLoading.bind(this);
        this.fetchJson = this.fetchJson.bind(this);
        this.buildStructure = this.buildStructure.bind(this);
    }

    componentWillMount() {
        this.fetchJson()
            .then((structure) => {
                this.buildStructure(structure);
            });
    }

    buildStructure(structure) {
        const treeObj = genEmpStructure(structure);

        this.setState({
            ...this.state,
            structure: treeObj.tree,
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

    render() {
        console.log("Tree:", this.state.structure);

        return(
            <Row className="show-grid">
                <Col xs={12} md={8} mdPush={2}>
                    <PageHeader>
                        {Msg.app.pageHeaderTitle} <span>{this.state.loading ? "...Loading" : ""}</span>
                    </PageHeader>
                    {this.state.structure && this.state.structure.map((item, i) => (
                        <div
                            style={{marginLeft: item.level + "em"}}
                            key={i}
                        >
                            <EmpCard
                                name={item.name}
                                position={item.position}
                            />
                        </div>
                    ))}
                </Col>
            </Row>
        )
    }
}