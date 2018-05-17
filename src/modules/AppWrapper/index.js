import React from "react";

import {
    Row,
    Col,
    PageHeader,
} from "react-bootstrap";
import { Msg } from "../../utils/Msg";
import { getJson, genEmpStructure } from "../../utils/common";
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
        this.setState({
            ...this.state,
            structure: genEmpStructure(structure),
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
        console.log("State:", this.state);

        return(
            <Row className="show-grid">
                <Col xs={12} md={8} mdPush={2}>
                    <PageHeader>
                        {Msg.app.pageHeaderTitle} <span>{this.state.loading ? "...Loading" : ""}</span>
                    </PageHeader>
                    <EmpCard
                        name={"Some name"}
                        position={"Some position"}
                    />
                </Col>
            </Row>
        )
    }
}