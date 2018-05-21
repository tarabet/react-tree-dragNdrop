import React from 'react';
import ReactDOM from 'react-dom';

import {
    genEmpStructure,
} from "./common";

describe("Check common Tree building functionality", () => {
    let empJson = null;

    beforeEach(() => {
        empJson = {
            "Jonas":{
            "position":"CTO",
                "employees":[
                {
                    "Sophie":{
                        "position":"VP Engineering",
                        "employees":[
                            {
                                "Nick":{
                                    "position":"Frontend Team Lead",
                                    "employees":[
                                        {
                                            "Pete":{
                                                "position":"Frontend Engineer",
                                                "employees":[

                                                ]
                                            }
                                        },
                                        {
                                            "Barbara":{
                                                "position":"Fronted Engineer",
                                                "employees":[

                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }
    });

    it('Checks that genEmpTree returns Array', () => {
        const Tree = genEmpStructure(empJson);

        expect(Array.isArray(Tree.getTree())).toBe(true);
    });

    it('Checks that genEmpTree generates right amount of nodes', () => {
        const Tree = genEmpStructure(empJson);

        expect(Tree.getTree().length).toBe(5);
    });

    it('Checks that Tree generates alert if two top level bosses are present', () => {
        const localEmpJson = {
            "Jonas":{
                "position":"CTO",
                "employees":[]
            },
            "Alex":{
                "position":"FakeCTO",
                "employees":[]
            }
        };

        global.alert = jest.fn();

        const Tree = genEmpStructure(localEmpJson);

        expect(alert.mock.calls.length).toBe(1);
    });

    it('Checks that employee can be assigned to new boss', () => {
        const Tree = genEmpStructure(empJson);

        Tree.modifyTree("Barbara", "Jonas");

        expect(Tree.getTree()[1].parent).toBe("Jonas");
    });

    it('Checks that alert is triggered when employee being assigned to current boss', () => {
        const Tree = genEmpStructure(empJson);
        global.alert = jest.fn();

        Tree.modifyTree("Barbara", "Nick");

        expect(alert.mock.calls[0][0]).toBe("You cannot assign employee to already assigned boss!");
    });
});
